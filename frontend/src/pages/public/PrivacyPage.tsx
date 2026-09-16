export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-kiri-950 text-kiri-text p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">KiriLock Privacy Policy</h1>
          <div className="text-sm text-kiri-text-muted mb-6">
            Version: 1.0 | Last Updated: [Insert Date]
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">1. Introduction</h2>
            <p className="text-kiri-text-soft mb-2">
              This Privacy Policy explains how KiriLock may collect, use, protect, retain, and disclose information when you use KiriLock services.
            </p>
            <p className="text-kiri-text-soft mb-2">
              KiriLock is designed to collect information necessary to operate property-management, tenancy, access-control, payment, security, and administrative functions.
            </p>
            <p className="text-kiri-text-soft">
              This Privacy Policy should be reviewed and adapted by qualified privacy/legal professionals for the jurisdictions in which KiriLock operates.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">2. Information We May Collect</h2>
            <p className="text-kiri-text-soft mb-4">
              Depending on how you use KiriLock, information may include:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Account Information</h3>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>name</li>
                  <li>email address</li>
                  <li>telephone number</li>
                  <li>account identifiers</li>
                  <li>authentication information</li>
                  <li>account status</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Landlord Information</h3>
                <p className="text-kiri-text-muted mb-2">Where required for landlord onboarding:</p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>identity information</li>
                  <li>professional or business information</li>
                  <li>property ownership or management information</li>
                  <li>verification information</li>
                  <li>supporting documentation</li>
                  <li>payment or settlement information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Tenant Information</h3>
                <p className="text-kiri-text-muted mb-2">Depending on the tenancy:</p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>name</li>
                  <li>contact information</li>
                  <li>tenant account information</li>
                  <li>tenancy information</li>
                  <li>assigned property</li>
                  <li>assigned unit</li>
                  <li>authorized access information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Property Information</h3>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>property identifiers</li>
                  <li>addresses</li>
                  <li>unit information</li>
                  <li>occupancy information</li>
                  <li>lock/device relationships</li>
                  <li>property-management records</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Payment Information</h3>
                <p className="text-kiri-text-muted mb-2">
                  KiriLock may process information necessary to identify and reconcile payments, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>payment references</li>
                  <li>transaction identifiers</li>
                  <li>payment status</li>
                  <li>amount</li>
                  <li>currency</li>
                  <li>payment dates</li>
                  <li>payment-account identifiers</li>
                  <li>settlement information</li>
                </ul>
                <p className="text-kiri-text-muted mt-2">
                  Where a third-party payment provider is used, sensitive payment credentials may be handled directly by the provider rather than stored by KiriLock.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Device Information</h3>
                <p className="text-kiri-text-muted mb-2">For connected locks and devices, information may include:</p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>device identifier</li>
                  <li>serial number</li>
                  <li>device status</li>
                  <li>connectivity status</li>
                  <li>capability information</li>
                  <li>device events</li>
                  <li>assignment history</li>
                </ul>
                <p className="text-kiri-text-muted mt-2">
                  Device API credentials and secrets should be handled using appropriate security controls and should not normally be exposed to ordinary users.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Security and Audit Information</h3>
                <p className="text-kiri-text-muted mb-2">KiriLock may record:</p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>authentication events</li>
                  <li>session events</li>
                  <li>authorization events</li>
                  <li>administrative actions</li>
                  <li>security events</li>
                  <li>device operations</li>
                  <li>payment reconciliation events</li>
                  <li>relevant timestamps</li>
                  <li>technical identifiers</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">3. Why We Use Information</h2>
            <p className="text-kiri-text-soft mb-4">
              Information may be used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>create and manage accounts</li>
              <li>authenticate users</li>
              <li>verify landlord applications</li>
              <li>manage properties</li>
              <li>manage units</li>
              <li>onboard tenants</li>
              <li>manage tenancies</li>
              <li>authorize access</li>
              <li>operate connected devices</li>
              <li>create payment obligations</li>
              <li>reconcile payments</li>
              <li>calculate applicable platform fees</li>
              <li>process settlements where supported</li>
              <li>maintain security</li>
              <li>investigate suspicious activity</li>
              <li>maintain audit records</li>
              <li>provide customer support</li>
              <li>maintain and improve the service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">4. Identity and Landlord Verification</h2>
            <p className="text-kiri-text-soft mb-2">
              Landlord verification information may be used to determine whether an applicant satisfies applicable onboarding requirements.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Verification may involve automated checks, internal checks, administrator review, or third-party providers.
            </p>
            <p className="text-kiri-text-soft mb-2">
              KiriLock should only claim to have verified information that was actually verified through the relevant process.
            </p>
            <p className="text-kiri-text-soft">
              Verification records may be retained as necessary for security, operational, legal, accounting, or dispute-resolution purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">5. Payment Information</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock is designed to associate payment activity with an authoritative payment responsibility.
            </p>
            <p className="text-kiri-text-soft mb-2">
              This can include relationships between:
            </p>
            <p className="text-kiri-text-soft font-medium mb-4">
              Tenant → Tenancy → Unit → Property → Landlord → Payment Responsibility
            </p>
            <p className="text-kiri-text-soft mb-2">
              Payment information may be processed by KiriLock and/or third-party payment providers depending on the configured payment architecture.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock should not request or store payment credentials that are unnecessary for the service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">6. Device and Access Information</h2>
            <p className="text-kiri-text-soft mb-4">
              Where KiriLock operates connected locks or access devices, the platform may process device information necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>identify the device</li>
              <li>determine its status</li>
              <li>associate it with a unit</li>
              <li>determine authorized users</li>
              <li>process authorized commands</li>
              <li>maintain device history</li>
              <li>investigate security events</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Access-related information may be sensitive and should be protected accordingly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">7. How We Share Information</h2>
            <p className="text-kiri-text-soft mb-4">
              Information may be shared with authorized parties where necessary to provide KiriLock services.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Depending on the service, this may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>the relevant landlord</li>
              <li>the relevant tenant</li>
              <li>authorized KiriLock administrators</li>
              <li>payment providers</li>
              <li>identity verification providers</li>
              <li>device/lock providers</li>
              <li>infrastructure providers</li>
              <li>communication providers</li>
              <li>professional advisers</li>
              <li>authorities where legally required</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              KiriLock should not disclose information merely because another user requests it.
            </p>
            <p className="text-kiri-text-soft">
              Access should be based on authorization and legitimate operational need.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">8. Data Minimization</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock is designed around collecting information necessary for the relevant purpose.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Users should not be asked to provide sensitive information that is not required for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>account operation</li>
              <li>verification</li>
              <li>property management</li>
              <li>tenancy management</li>
              <li>access control</li>
              <li>payment processing</li>
              <li>security</li>
              <li>legal or operational obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">9. Security</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock uses technical and organizational controls intended to protect information.
            </p>
            <p className="text-kiri-text-soft mb-2">
              These may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>authentication</li>
              <li>authorization</li>
              <li>access controls</li>
              <li>encrypted communications</li>
              <li>secure credential handling</li>
              <li>transaction controls</li>
              <li>audit records</li>
              <li>secret management</li>
              <li>monitoring</li>
              <li>controlled administrative access</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Security measures may evolve as the platform develops.
            </p>
            <p className="text-kiri-text-soft">
              No internet-connected service can guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">10. Passwords and Authentication Secrets</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock should not store user passwords in recoverable plaintext form.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Authentication secrets should be handled using appropriate security mechanisms.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Users should never provide passwords or authentication tokens to another person.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock personnel should not request a user's password.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">11. Device Credentials</h2>
            <p className="text-kiri-text-soft mb-2">
              Credentials used to communicate with supported lock/device providers may be treated as sensitive secrets.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Where stored by KiriLock, they should be protected through appropriate secret-management or encryption mechanisms.
            </p>
            <p className="text-kiri-text-soft">
              Such credentials should not be exposed through ordinary frontend interfaces, logs, analytics, or API responses.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">12. Cookies and Technical Information</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may use cookies, local storage, session mechanisms, or similar technologies where required for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>authentication</li>
              <li>security</li>
              <li>preferences</li>
              <li>application functionality</li>
              <li>analytics where appropriately configured</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              The specific technologies used should be documented according to the production implementation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">13. Data Retention</h2>
            <p className="text-kiri-text-soft mb-2">
              Information should be retained only for as long as reasonably necessary for the purpose for which it was collected and for applicable operational, security, accounting, contractual, or legal requirements.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Different information may have different retention periods.
            </p>
            <p className="text-kiri-text-soft mb-2">
              For example, historical:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>payment records</li>
              <li>audit records</li>
              <li>security events</li>
              <li>tenancy records</li>
              <li>verification decisions</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              may need to remain available after an account is closed.
            </p>
            <p className="text-kiri-text-soft">
              Specific retention schedules should be established before production deployment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">14. User Rights</h2>
            <p className="text-kiri-text-soft mb-4">
              Depending on the jurisdiction and applicable law, users may have rights relating to their personal information, which may include rights to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>access information</li>
              <li>correct inaccurate information</li>
              <li>request deletion where applicable</li>
              <li>object to certain processing</li>
              <li>restrict certain processing</li>
              <li>request data portability</li>
              <li>withdraw consent where consent is the applicable basis</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Some requests may be subject to legal or operational exceptions.
            </p>
            <p className="text-kiri-text-soft">
              The applicable rights depend on the user's jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">15. Children's Information</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock is intended for users who are legally able to enter into the relevant account and property-management arrangements.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock should not knowingly collect children's personal information where it is not necessary for the service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">16. International Operation</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may operate across multiple countries and may use service providers located in different jurisdictions.
            </p>
            <p className="text-kiri-text-soft">
              International data transfers should be handled according to applicable legal requirements.
            </p>
            <p className="text-kiri-text-soft mt-2">
              Specific transfer mechanisms should be established according to the jurisdictions in which KiriLock operates.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">17. Third-Party Providers</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock may use third-party providers for services such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>payments</li>
              <li>identity verification</li>
              <li>email</li>
              <li>messaging</li>
              <li>device connectivity</li>
              <li>hosting</li>
              <li>monitoring</li>
              <li>analytics</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Those providers may process information according to their own terms and privacy policies.
            </p>
            <p className="text-kiri-text-soft">
              The production KiriLock implementation should maintain an up-to-date list of relevant providers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">18. Changes to This Privacy Policy</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may update this Privacy Policy as the service develops or legal requirements change.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The platform should display the current:
            </p>
            <p className="text-kiri-text-soft font-medium mb-2">Version</p>
            <p className="text-kiri-text-soft font-medium mb-2">and</p>
            <p className="text-kiri-text-soft font-medium mb-4">Last Updated</p>
            <p className="text-kiri-text-soft mb-2">date.</p>
            <p className="text-kiri-text-soft">
              Where required, users will be given appropriate notice of material changes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">19. Contact</h2>
            <p className="text-kiri-text-soft mb-2">
              Questions or privacy requests should be submitted through the official KiriLock privacy/support channel.
            </p>
            <p className="text-kiri-text-soft mt-2">
              Privacy Contact: [Insert Official Privacy Contact]
            </p>
            <p className="text-kiri-text-soft mt-2">
              Support: [Insert Official Support Contact]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">20. Important Notice</h2>
            <p className="text-kiri-text-soft">
              This Privacy Policy describes the intended privacy architecture and should be finalized against the actual production data flows, service providers, jurisdictions, retention requirements, and legal obligations before deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
