package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/handler"
	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/notification"
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
)

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	securityServiceURL := os.Getenv("SECURITY_SERVICE_URL")
	if securityServiceURL == "" {
		securityServiceURL = "http://localhost:8080"
	}

	deviceServiceURL := os.Getenv("DEVICE_SERVICE_URL")
	if deviceServiceURL == "" {
		deviceServiceURL = "http://localhost:8082"
	}

	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		log.Fatalf("failed to create database pool: %v", err)
	}
	defer pool.Close()

	subjectRepo, err := repository.NewDBSubjectRepository(pool)
	if err != nil {
		log.Fatalf("failed to create subject repository: %v", err)
	}

	credentialRepo, err := repository.NewDBCredentialRepository(pool)
	if err != nil {
		log.Fatalf("failed to create credential repository: %v", err)
	}

	sessionRepo, err := repository.NewDBSessionRepository(pool)
	if err != nil {
		log.Fatalf("failed to create session repository: %v", err)
	}

	// New repositories for landlord/property/unit/tenant/payment
	landlordProfileRepo := repository.NewLandlordProfileRepository(pool)
	propertyRepo := repository.NewPropertyRepository(pool)
	unitRepo := repository.NewUnitRepository(pool)
	tenancyRepo := repository.NewTenancyRepository(pool)
	paymentAccountRepo := repository.NewPaymentAccountRepository(pool)
	paymentResponsibilityRepo := repository.NewPaymentResponsibilityRepository(pool)
	landlordApplicationRepo := repository.NewLandlordApplicationRepository(pool)
	lockAssignmentRepo := repository.NewLockAssignmentRepository(pool)
	auditRepo := repository.NewAuditRepository(pool)
	lockCommandRepo := repository.NewLockCommandRepository(pool)
	lockRepo := repository.NewLockRepository(pool)

	subjectService, err := service.NewSubjectService(subjectRepo)
	if err != nil {
		log.Fatalf("failed to create subject service: %v", err)
	}

	sessionService, err := service.NewSessionService(sessionRepo, credentialRepo)
	if err != nil {
		log.Fatalf("failed to create session service: %v", err)
	}

	// New services for landlord/property/unit/tenant/payment
	landlordService := service.NewLandlordService(landlordProfileRepo, propertyRepo)
	propertyService := service.NewPropertyService(propertyRepo, landlordProfileRepo, landlordService)
	unitService := service.NewUnitService(unitRepo, propertyRepo, landlordProfileRepo, landlordService)

	// Notification service (no-op provider by default)
	notificationSvc := notification.NewNotificationService()

	tenantService := service.NewTenantService(tenancyRepo, unitRepo, propertyRepo, landlordProfileRepo, landlordService, subjectRepo, auditRepo, notificationSvc, pool)
	paymentService := service.NewPaymentService(paymentAccountRepo, paymentResponsibilityRepo, landlordProfileRepo, landlordService)
	landlordApplicationService := service.NewLandlordApplicationService(landlordApplicationRepo, subjectRepo)
	assignmentService := service.NewAssignmentService(lockAssignmentRepo, propertyRepo, unitRepo, landlordProfileRepo, landlordService, pool)
	lockAuthorizer := service.NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

	subjectHandler, err := handler.NewSubjectHandler(subjectService, sessionService)
	if err != nil {
		log.Fatalf("failed to create subject handler: %v", err)
	}

	sessionHandler, err := handler.NewSessionHandler(sessionService)
	if err != nil {
		log.Fatalf("failed to create session handler: %v", err)
	}

	// New handlers for landlord/property/unit/tenant/payment
	landlordHandler, err := handler.NewLandlordHandler(landlordService)
	if err != nil {
		log.Fatalf("failed to create landlord handler: %v", err)
	}

	propertyHandler, err := handler.NewPropertyHandler(propertyService)
	if err != nil {
		log.Fatalf("failed to create property handler: %v", err)
	}

	unitHandler, err := handler.NewUnitHandler(unitService)
	if err != nil {
		log.Fatalf("failed to create unit handler: %v", err)
	}

	tenantHandler, err := handler.NewTenantHandler(tenantService)
	if err != nil {
		log.Fatalf("failed to create tenant handler: %v", err)
	}

	paymentHandler, err := handler.NewPaymentHandler(paymentService)
	if err != nil {
		log.Fatalf("failed to create payment handler: %v", err)
	}

	landlordApplicationHandler, err := handler.NewLandlordApplicationHandler(landlordApplicationService)
	if err != nil {
		log.Fatalf("failed to create landlord application handler: %v", err)
	}

	assignmentHandler, err := handler.NewAssignmentHandler(assignmentService)
	if err != nil {
		log.Fatalf("failed to create assignment handler: %v", err)
	}

	_ = client.NewAuthClient(securityServiceURL) // Available for future security-service integration
	deviceClient := client.NewDeviceClient(deviceServiceURL)

	// Use local session auth middleware for domain routes (session_id from /authenticate)
	// This allows authenticated domain calls without requiring security-service token auth
	authMiddleware := middleware.NewLocalSessionAuthMiddleware(sessionRepo, subjectRepo)

	lockCommandHandler, err := handler.NewLockCommandHandler(lockAuthorizer, auditRepo, lockCommandRepo, lockRepo, lockAssignmentRepo, unitRepo, propertyRepo, landlordProfileRepo, deviceClient)
	if err != nil {
		log.Fatalf("failed to create lock command handler: %v", err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("POST /subjects", subjectHandler.CreateSubject)
	mux.HandleFunc("POST /authenticate", subjectHandler.Authenticate)

	// Public landlord registration (no auth required)
	mux.HandleFunc("POST /landlords/register", landlordApplicationHandler.PublicLandlordRegistration)

	// Public tenant activation (no auth required)
	mux.HandleFunc("POST /tenancies/invitation/preview", tenantHandler.PreviewInvitation)
	mux.HandleFunc("POST /tenancies/activate", tenantHandler.ActivateTenant)

	// Session revoke without auth (for logout - session_id is the auth)
	mux.HandleFunc("POST /sessions/revoke", sessionHandler.RevokeSession)

	mux.Handle("POST /sessions", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.CreateSession)))
	mux.Handle("POST /sessions/validate", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.ValidateSession)))
	mux.Handle("POST /sessions/revoke-all", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.RevokeAllSubjectSessions)))

	mux.Handle("POST /subjects/admin", authMiddleware.Authenticate(http.HandlerFunc(subjectHandler.SetAdmin)))
	mux.Handle("POST /subjects/super-admin", authMiddleware.Authenticate(http.HandlerFunc(subjectHandler.SetSuperAdmin)))

	// New routes for landlord/property/unit/tenant/payment
	mux.Handle("POST /landlords/profile", authMiddleware.Authenticate(http.HandlerFunc(landlordHandler.CreateProfile)))
	mux.Handle("POST /landlords/submit-verification", authMiddleware.Authenticate(http.HandlerFunc(landlordHandler.SubmitVerification)))
	mux.Handle("POST /landlords/approve-verification", authMiddleware.Authenticate(http.HandlerFunc(landlordHandler.ApproveVerification)))
	mux.Handle("POST /landlords/reject-verification", authMiddleware.Authenticate(http.HandlerFunc(landlordHandler.RejectVerification)))
	mux.Handle("GET /landlords/profile", authMiddleware.Authenticate(http.HandlerFunc(landlordHandler.GetProfile)))

	mux.Handle("POST /properties", authMiddleware.Authenticate(http.HandlerFunc(propertyHandler.CreateProperty)))
	mux.Handle("GET /properties", authMiddleware.Authenticate(http.HandlerFunc(propertyHandler.GetLandlordProperties)))
	mux.Handle("GET /properties/property", authMiddleware.Authenticate(http.HandlerFunc(propertyHandler.GetProperty)))
	mux.Handle("PUT /properties/property", authMiddleware.Authenticate(http.HandlerFunc(propertyHandler.UpdateProperty)))
	mux.Handle("POST /properties/activate", authMiddleware.Authenticate(http.HandlerFunc(propertyHandler.ActivateProperty)))

	mux.Handle("POST /units", authMiddleware.Authenticate(http.HandlerFunc(unitHandler.CreateUnit)))
	mux.Handle("GET /units/unit", authMiddleware.Authenticate(http.HandlerFunc(unitHandler.GetUnit)))
	mux.Handle("GET /units/property", authMiddleware.Authenticate(http.HandlerFunc(unitHandler.GetPropertyUnits)))
	mux.Handle("GET /units/available", authMiddleware.Authenticate(http.HandlerFunc(unitHandler.GetAvailableUnits)))
	mux.Handle("PUT /units/unit", authMiddleware.Authenticate(http.HandlerFunc(unitHandler.UpdateUnit)))
	mux.Handle("POST /units/lifecycle", authMiddleware.Authenticate(http.HandlerFunc(unitHandler.UpdateUnitLifecycle)))

	// Lock assignment routes
	mux.Handle("POST /assignments/assign", authMiddleware.Authenticate(http.HandlerFunc(assignmentHandler.AssignLock)))
	mux.Handle("POST /assignments/unassign", authMiddleware.Authenticate(http.HandlerFunc(assignmentHandler.UnassignLock)))
	mux.Handle("POST /assignments/reassign", authMiddleware.Authenticate(http.HandlerFunc(assignmentHandler.ReassignLock)))
	mux.Handle("GET /assignments/lock", authMiddleware.Authenticate(http.HandlerFunc(assignmentHandler.GetLockAssignments)))
	mux.Handle("GET /assignments/unit", authMiddleware.Authenticate(http.HandlerFunc(assignmentHandler.GetUnitAssignments)))

	// Lock command route (authoritative tenant lock authorization)
	mux.Handle("POST /locks/command", authMiddleware.Authenticate(http.HandlerFunc(lockCommandHandler.HandleLockCommand)))

	// Landlord lock command route (property ownership enforced)
	mux.Handle("POST /locks/landlord/command", authMiddleware.Authenticate(http.HandlerFunc(lockCommandHandler.HandleLandlordLockCommand)))

	mux.Handle("POST /tenancies/invite", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.CreateTenantInvitation)))
	mux.Handle("POST /tenancies/accept", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.AcceptInvitation)))
	mux.Handle("GET /tenancies/tenant", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.GetTenantTenancy)))
	mux.Handle("GET /tenancies/landlord", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.GetLandlordTenancies)))
	mux.Handle("POST /tenancies/terminate", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.TerminateTenancy)))
	mux.Handle("POST /tenancies/revoke", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.RevokeInvitation)))
	mux.Handle("POST /tenancies/resend", authMiddleware.Authenticate(http.HandlerFunc(tenantHandler.ResendInvitation)))

	mux.Handle("POST /payments/accounts", authMiddleware.Authenticate(http.HandlerFunc(paymentHandler.CreatePaymentAccount)))
	mux.Handle("GET /payments/accounts", authMiddleware.Authenticate(http.HandlerFunc(paymentHandler.GetLandlordPaymentAccounts)))
	mux.Handle("GET /payments/account", authMiddleware.Authenticate(http.HandlerFunc(paymentHandler.GetPaymentAccount)))
	mux.Handle("POST /payments/accounts/activate", authMiddleware.Authenticate(http.HandlerFunc(paymentHandler.ActivatePaymentAccount)))
	mux.Handle("POST /payments/responsibilities", authMiddleware.Authenticate(http.HandlerFunc(paymentHandler.CreatePaymentResponsibility)))
	mux.Handle("GET /payments/responsibility", authMiddleware.Authenticate(http.HandlerFunc(paymentHandler.GetTenantPaymentResponsibility)))

	// Landlord application routes
	mux.Handle("GET /landlords/application/status", authMiddleware.Authenticate(http.HandlerFunc(landlordApplicationHandler.GetApplicationStatus)))
	mux.Handle("POST /landlords/application/submit", authMiddleware.Authenticate(http.HandlerFunc(landlordApplicationHandler.SubmitVerification)))
	mux.Handle("GET /landlords/applications", authMiddleware.Authenticate(http.HandlerFunc(landlordApplicationHandler.AdminListApplications)))
	mux.Handle("GET /landlords/application", authMiddleware.Authenticate(http.HandlerFunc(landlordApplicationHandler.AdminGetApplication)))
	mux.Handle("POST /landlords/application/review", authMiddleware.Authenticate(http.HandlerFunc(landlordApplicationHandler.AdminReview)))

	server := &http.Server{
		Addr:         ":8081",
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("identity-service starting on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	<-ctx.Done()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	log.Printf("identity-service shutting down...")
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("shutdown error: %v", err)
	}

	log.Printf("identity-service shutdown complete")
}
