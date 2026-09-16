import { useState } from "react"
import { useNavigate } from "react-router"
import { apiFetch } from "../../api/client"
import { FieldLabel } from "../../components/forms/FieldLabel"
import { SecondaryButton } from "../../components/ui/operator/SecondaryButton"

type Step = "credentials" | "entity" | "contact" | "authority" | "payment" | "review" | "confirmation"

interface FormData {
	// Step 1: Credentials
	email: string
	password: string
	confirmPassword: string
	termsAccepted: boolean
	
	// Step 2: Entity
	legalEntityType: "INDIVIDUAL" | "REGISTERED_BUSINESS" | "PROPERTY_MANAGEMENT_ORG"
	legalName: string
	businessName: string
	taxId: string
	
	// Step 3: Contact
	phone: string
	country: string
	addressLine1: string
	addressLine2: string
	city: string
	state: string
	postalCode: string
	
	// Step 4: Authority
	propertyAuthorityProof: string
	ownershipDocuments: string
	
	// Step 5: Payment
	paymentProvider: string
	accountDetails: string
	
	// Step 6: Review
	declarations: string
	consent: boolean
}

const initialFormData: FormData = {
	email: "",
	password: "",
	confirmPassword: "",
	termsAccepted: false,
	legalEntityType: "INDIVIDUAL",
	legalName: "",
	businessName: "",
	taxId: "",
	phone: "",
	country: "",
	addressLine1: "",
	addressLine2: "",
	city: "",
	state: "",
	postalCode: "",
	propertyAuthorityProof: "",
	ownershipDocuments: "",
	paymentProvider: "",
	accountDetails: "",
	declarations: "",
	consent: false,
}

const countries = [
	{ code: "UG", name: "Uganda" },
	{ code: "KE", name: "Kenya" },
	{ code: "TZ", name: "Tanzania" },
	{ code: "RW", name: "Rwanda" },
	{ code: "US", name: "United States" },
	{ code: "GB", name: "United Kingdom" },
	{ code: "CA", name: "Canada" },
	{ code: "AU", name: "Australia" },
]

export function LandlordRegistrationPage() {
	const navigate = useNavigate()
	const [currentStep, setCurrentStep] = useState<Step>("credentials")
	const [formData, setFormData] = useState<FormData>(initialFormData)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [applicationReference, setApplicationReference] = useState<string | null>(null)

	const steps: Step[] = ["credentials", "entity", "contact", "authority", "payment", "review", "confirmation"]
	const currentStepIndex = steps.indexOf(currentStep)

	const validateStep = (step: Step): boolean => {
		switch (step) {
			case "credentials":
				return Boolean(formData.email && 
					formData.password && 
					formData.confirmPassword &&
					formData.password === formData.confirmPassword &&
					formData.password.length >= 8 &&
					formData.termsAccepted)
			case "entity":
				return Boolean(formData.legalName && 
					(formData.legalEntityType === "INDIVIDUAL" || 
					 (formData.businessName && formData.taxId)))
			case "contact":
				return Boolean(formData.phone && 
					formData.country && 
					formData.addressLine1 && 
					formData.city &&
					formData.postalCode)
			case "authority":
				return Boolean(formData.propertyAuthorityProof)
			case "payment":
				return Boolean(formData.paymentProvider && formData.accountDetails)
			case "review":
				return Boolean(formData.declarations && formData.consent)
			default:
				return true
		}
	}

	const handleNext = () => {
		if (!validateStep(currentStep)) {
			setError("Please fill in all required fields")
			return
		}
		setError(null)
		const nextIndex = currentStepIndex + 1
		if (nextIndex < steps.length) {
			setCurrentStep(steps[nextIndex])
		}
	}

	const handleBack = () => {
		const prevIndex = currentStepIndex - 1
		if (prevIndex >= 0) {
			setCurrentStep(steps[prevIndex])
		}
		setError(null)
	}

	const handleSubmit = async () => {
		setIsLoading(true)
		setError(null)

		try {
			const appData = await apiFetch<{ application_reference: string }>("/landlords/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
					terms_version: "1.0",
				}),
			}, { useIdentityService: true })

			setApplicationReference(appData.application_reference)
			setCurrentStep("confirmation")
		} catch (err) {
			setError(err instanceof Error ? err.message : "Registration failed")
		} finally {
			setIsLoading(false)
		}
	}

	const renderStep = () => {
		switch (currentStep) {
			case "credentials":
				return (
					<div className="space-y-6">
						<FieldLabel label="Email address" htmlFor="email">
							<input
								id="email"
								type="email"
								autoComplete="email"
								required
								aria-required="true"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="you@example.com"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="Password" htmlFor="password">
							<input
								id="password"
								type="password"
								autoComplete="new-password"
								required
								aria-required="true"
								minLength={8}
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="•••••••••"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="Confirm password" htmlFor="confirmPassword">
							<input
								id="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								aria-required="true"
								minLength={8}
								value={formData.confirmPassword}
								onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="•••••••••"
								disabled={isLoading}
							/>
						</FieldLabel>

						<div className="flex items-start gap-3">
							<input
								id="terms"
								type="checkbox"
								required
								aria-required="true"
								checked={formData.termsAccepted}
								onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
								className="mt-1 h-4 w-4 rounded border-white/8 bg-white/[0.025] text-kiri-blue-500 focus:ring-kiri-blue-500/50"
								disabled={isLoading}
							/>
							<label htmlFor="terms" className="text-sm text-kiri-text-soft">
								I agree to the KiriLock Terms and Conditions
							</label>
						</div>
					</div>
				)

			case "entity":
				return (
					<div className="space-y-6">
						<FieldLabel label="Legal entity type" htmlFor="legalEntityType">
							<select
								id="legalEntityType"
								required
								aria-required="true"
								value={formData.legalEntityType}
								onChange={(e) => setFormData({ ...formData, legalEntityType: e.target.value as any })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								disabled={isLoading}
							>
								<option value="INDIVIDUAL">Individual</option>
								<option value="REGISTERED_BUSINESS">Registered Business</option>
								<option value="PROPERTY_MANAGEMENT_ORG">Property Management Organization</option>
							</select>
						</FieldLabel>

						<FieldLabel label="Legal name" htmlFor="legalName">
							<input
								id="legalName"
								type="text"
								required
								aria-required="true"
								value={formData.legalName}
								onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Full legal name"
								disabled={isLoading}
							/>
						</FieldLabel>

						{formData.legalEntityType !== "INDIVIDUAL" && (
							<>
								<FieldLabel label="Business name" htmlFor="businessName">
									<input
										id="businessName"
										type="text"
										required
										aria-required="true"
										value={formData.businessName}
										onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
										className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
										placeholder="Registered business name"
										disabled={isLoading}
									/>
								</FieldLabel>

								<FieldLabel label="Tax ID" htmlFor="taxId">
									<input
										id="taxId"
										type="text"
										required
										aria-required="true"
										value={formData.taxId}
										onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
										className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
										placeholder="Tax identification number"
										disabled={isLoading}
									/>
								</FieldLabel>
							</>
						)}
					</div>
				)

			case "contact":
				return (
					<div className="space-y-6">
						<FieldLabel label="Country" htmlFor="country">
							<select
								id="country"
								required
								aria-required="true"
								value={formData.country}
								onChange={(e) => setFormData({ ...formData, country: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								disabled={isLoading}
							>
								<option value="">Select country</option>
								{countries.map((country) => (
									<option key={country.code} value={country.code}>
										{country.name}
									</option>
								))}
							</select>
						</FieldLabel>

						<FieldLabel label="Phone number" htmlFor="phone">
							<input
								id="phone"
								type="tel"
								required
								aria-required="true"
								value={formData.phone}
								onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="+256 700 000 000"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="Address line 1" htmlFor="addressLine1">
							<input
								id="addressLine1"
								type="text"
								required
								aria-required="true"
								value={formData.addressLine1}
								onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Street address"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="Address line 2 (optional)" htmlFor="addressLine2">
							<input
								id="addressLine2"
								type="text"
								value={formData.addressLine2}
								onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Apartment, suite, etc."
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="City" htmlFor="city">
							<input
								id="city"
								type="text"
								required
								aria-required="true"
								value={formData.city}
								onChange={(e) => setFormData({ ...formData, city: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="City"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="State/Province" htmlFor="state">
							<input
								id="state"
								type="text"
								value={formData.state}
								onChange={(e) => setFormData({ ...formData, state: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="State or province"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="Postal code" htmlFor="postalCode">
							<input
								id="postalCode"
								type="text"
								required
								aria-required="true"
								value={formData.postalCode}
								onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Postal code"
								disabled={isLoading}
							/>
						</FieldLabel>
					</div>
				)

			case "authority":
				return (
					<div className="space-y-6">
						<div className="rounded-lg border border-white/8 bg-white/[0.025] p-4">
							<p className="text-sm text-kiri-text-soft mb-4">
								You will need to provide proof of property authority after registration. This can include:
							</p>
							<ul className="text-sm text-kiri-text-muted list-disc list-inside space-y-2">
								<li>Property ownership documents</li>
								<li>Management agreements</li>
								<li>Power of attorney</li>
								<li>Business registration certificates</li>
							</ul>
						</div>

						<FieldLabel label="Property authority proof reference" htmlFor="propertyAuthorityProof">
							<input
								id="propertyAuthorityProof"
								type="text"
								required
								aria-required="true"
								value={formData.propertyAuthorityProof}
								onChange={(e) => setFormData({ ...formData, propertyAuthorityProof: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Document reference or ID"
								disabled={isLoading}
							/>
						</FieldLabel>

						<FieldLabel label="Ownership documents reference" htmlFor="ownershipDocuments">
							<input
								id="ownershipDocuments"
								type="text"
								value={formData.ownershipDocuments}
								onChange={(e) => setFormData({ ...formData, ownershipDocuments: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Document reference or ID (optional)"
								disabled={isLoading}
							/>
						</FieldLabel>
					</div>
				)

			case "payment":
				return (
					<div className="space-y-6">
						<div className="rounded-lg border border-white/8 bg-white/[0.025] p-4">
							<p className="text-sm text-kiri-text-soft mb-4">
								Payment settlement information will be collected after registration. KiriLock supports multiple payment providers for international operations.
							</p>
							<p className="text-sm text-kiri-text-muted">
								NOTE: Never enter PINs, card security codes, or complete payment details in this section.
							</p>
						</div>

						<FieldLabel label="Preferred payment provider" htmlFor="paymentProvider">
							<select
								id="paymentProvider"
								required
								aria-required="true"
								value={formData.paymentProvider}
								onChange={(e) => setFormData({ ...formData, paymentProvider: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								disabled={isLoading}
							>
								<option value="">Select provider</option>
								<option value="flutterwave">Flutterwave</option>
								<option value="stripe">Stripe</option>
								<option value="paypal">PayPal</option>
								<option value="other">Other</option>
							</select>
						</FieldLabel>

						<FieldLabel label="Account reference" htmlFor="accountDetails">
							<input
								id="accountDetails"
								type="text"
								required
								aria-required="true"
								value={formData.accountDetails}
								onChange={(e) => setFormData({ ...formData, accountDetails: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
								placeholder="Account reference or business ID"
								disabled={isLoading}
							/>
						</FieldLabel>
					</div>
				)

			case "review":
				return (
					<div className="space-y-6">
						<div className="rounded-lg border border-white/8 bg-white/[0.025] p-6">
							<h3 className="text-lg font-semibold text-kiri-text mb-4">Review your information</h3>
							
							<div className="space-y-4 text-sm">
								<div>
									<span className="text-kiri-text-muted">Email:</span>
									<span className="ml-2 text-kiri-text">{formData.email}</span>
								</div>
								<div>
									<span className="text-kiri-text-muted">Legal entity type:</span>
									<span className="ml-2 text-kiri-text">{formData.legalEntityType}</span>
								</div>
								<div>
									<span className="text-kiri-text-muted">Legal name:</span>
									<span className="ml-2 text-kiri-text">{formData.legalName}</span>
								</div>
								{formData.businessName && (
									<div>
										<span className="text-kiri-text-muted">Business name:</span>
										<span className="ml-2 text-kiri-text">{formData.businessName}</span>
									</div>
								)}
								<div>
									<span className="text-kiri-text-muted">Country:</span>
									<span className="ml-2 text-kiri-text">{formData.country}</span>
								</div>
								<div>
									<span className="text-kiri-text-muted">Phone:</span>
									<span className="ml-2 text-kiri-text">{formData.phone}</span>
								</div>
								<div>
									<span className="text-kiri-text-muted">Address:</span>
									<span className="ml-2 text-kiri-text">{formData.addressLine1}, {formData.city} {formData.postalCode}</span>
								</div>
							</div>
						</div>

						<FieldLabel label="Declarations" htmlFor="declarations">
							<textarea
								id="declarations"
								required
								aria-required="true"
								value={formData.declarations}
								onChange={(e) => setFormData({ ...formData, declarations: e.target.value })}
								className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition min-h-[100px]"
								placeholder="I declare that the information provided is accurate and I have the authority to register as a landlord."
								disabled={isLoading}
							/>
						</FieldLabel>

						<div className="flex items-start gap-3">
							<input
								id="consent"
								type="checkbox"
								required
								aria-required="true"
								checked={formData.consent}
								onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
								className="mt-1 h-4 w-4 rounded border-white/8 bg-white/[0.025] text-kiri-blue-500 focus:ring-kiri-blue-500/50"
								disabled={isLoading}
							/>
							<label htmlFor="consent" className="text-sm text-kiri-text-soft">
								I consent to the processing of my personal data for landlord registration and verification.
							</label>
						</div>
					</div>
				)

			case "confirmation":
				return (
					<div className="space-y-6 text-center">
						<div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-green-600 text-2xl font-black shadow-[0_0_40px_rgba(34,197,94,0.35)]" aria-hidden="true">
							✓
						</div>
						<h2 className="text-2xl font-bold text-kiri-text">Registration Submitted</h2>
						<p className="text-kiri-text-soft">
							Your application has been submitted successfully.
						</p>
						<div className="rounded-lg border border-white/8 bg-white/[0.025] p-4 text-left">
							<p className="text-sm text-kiri-text-muted mb-2">Application Reference:</p>
							<p className="text-lg font-mono text-kiri-text">{applicationReference}</p>
						</div>
						<div className="rounded-lg border border-yellow-500/20 bg-yellow-500/[0.05] p-4 text-left">
							<p className="text-sm text-yellow-400 mb-2">Important:</p>
							<p className="text-sm text-kiri-text-soft">
								Approval is not automatic. Your application will be reviewed by our team. You will receive an email notification once your application is processed.
							</p>
						</div>
						<SecondaryButton
							type="button"
							onClick={() => navigate("/")}
							className="w-full"
						>
							Return to Home
						</SecondaryButton>
					</div>
				)

			default:
				return null
		}
	}

	return (
		<div className="min-h-screen bg-kiri-950 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-kiri-blue-600 text-2xl font-black shadow-[0_0_40px_rgba(47,107,255,0.35)]" aria-hidden="true">
						K
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-kiri-text">
						KIRILOCK
					</h1>
					<p className="mt-2 text-sm text-kiri-text-muted">
						Landlord Registration
					</p>
				</div>

				{currentStep !== "confirmation" && (
					<div className="mb-6">
						<nav aria-label="Registration steps" className="flex items-center justify-between">
							{steps.map((step, index) => (
								<div key={step} className="flex items-center">
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
											index <= currentStepIndex
												? "bg-kiri-blue-600 text-white"
												: "bg-white/10 text-kiri-text-muted"
										}`}
										aria-current={index === currentStepIndex ? "step" : undefined}
									>
										{index + 1}
									</div>
									{index < steps.length - 1 && (
										<div
											className={`w-12 h-0.5 mx-2 ${
												index < currentStepIndex
													? "bg-kiri-blue-600"
													: "bg-white/10"
											}`}
											aria-hidden="true"
										/>
									)}
								</div>
							))}
						</nav>
					</div>
				)}

				<div className="rounded-2xl border border-white/8 bg-kiri-925 p-8">
					{currentStep !== "confirmation" && (
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-kiri-text">
								{currentStep === "credentials" && "Create Account"}
								{currentStep === "entity" && "Legal Entity Information"}
								{currentStep === "contact" && "Contact & Location"}
								{currentStep === "authority" && "Property Authority"}
								{currentStep === "payment" && "Payment Setup"}
								{currentStep === "review" && "Review & Submit"}
							</h2>
						</div>
					)}

					{error && (
						<div 
							className="mb-6 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400"
							role="alert"
							aria-live="polite"
						>
							{error}
						</div>
					)}

					{renderStep()}

					{currentStep !== "confirmation" && (
						<div className="mt-8 flex justify-between">
							{currentStepIndex > 0 && (
								<SecondaryButton
									type="button"
									onClick={handleBack}
									disabled={isLoading}
								>
									Back
								</SecondaryButton>
							)}
							{currentStepIndex < steps.length - 2 ? (
								<button
									type="button"
									onClick={handleNext}
									disabled={isLoading}
									className="rounded-xl bg-kiri-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/50"
								>
									{isLoading ? "Processing..." : "Next"}
								</button>
							) : (
								<button
									type="button"
									onClick={handleSubmit}
									disabled={isLoading}
									className="rounded-xl bg-kiri-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/50"
								>
									{isLoading ? "Submitting..." : "Submit Application"}
								</button>
							)}
						</div>
					)}
				</div>

				<div className="mt-6 text-center">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="text-xs font-medium text-kiri-text-muted hover:text-kiri-text-soft transition focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/50 rounded px-2 py-1"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
