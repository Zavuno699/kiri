export function TermsPage() {
  return (
    <div className="min-h-screen bg-kiri-950 text-kiri-text p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">KiriLock Terms & Conditions</h1>
          <div className="text-sm text-kiri-text-muted mb-6">
            Version: 1.0 | Last Updated: [Insert Date]
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">1. Introduction</h2>
            <p className="text-kiri-text-soft mb-2">
              These Terms & Conditions ("Terms") govern your access to and use of KiriLock, including the KiriLock website, applications, property-management services, access-control functionality, payment-related functionality, and associated services.
            </p>
            <p className="text-kiri-text-soft mb-2">
              By creating an account, accessing the platform, or using KiriLock services, you agree to these Terms.
            </p>
            <p className="text-kiri-text-soft mb-2">
              If you do not agree with these Terms, you should not create or use a KiriLock account.
            </p>
            <p className="text-kiri-text-soft">
              These Terms should be reviewed and adapted by appropriate legal counsel for the jurisdictions in which KiriLock operates.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">2. About KiriLock</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock is a technology platform that connects property management, tenancy, access-control devices, payment responsibilities, and administrative operations.
            </p>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may provide software functionality for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>landlord onboarding</li>
              <li>property management</li>
              <li>unit management</li>
              <li>tenant onboarding</li>
              <li>tenancy management</li>
              <li>lock/device management</li>
              <li>access authorization</li>
              <li>payment management</li>
              <li>payment reconciliation</li>
              <li>administrative oversight</li>
              <li>security and audit functions</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              The availability of particular features depends on the user's account, permissions, location, configured integrations, and applicable service conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">3. Eligibility</h2>
            <p className="text-kiri-text-soft mb-4">
              You must provide truthful and accurate information when creating and using an account.
            </p>
            <p className="text-kiri-text-soft mb-2">
              You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>impersonate another person</li>
              <li>provide deliberately false information</li>
              <li>use another person's credentials</li>
              <li>attempt to obtain unauthorized access</li>
              <li>create accounts to circumvent restrictions</li>
              <li>manipulate verification processes</li>
              <li>misrepresent ownership or legal authority over property</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              KiriLock may require additional information or verification before granting certain privileges.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">4. Landlord Accounts</h2>
            <p className="text-kiri-text-soft mb-2">
              A landlord account provides access to property-management functionality only after the applicable registration, verification, and approval requirements have been satisfied.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Submitting a landlord application does not guarantee approval.
            </p>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>review submitted information</li>
              <li>request additional information</li>
              <li>perform available verification checks</li>
              <li>place an application under review</li>
              <li>approve an application</li>
              <li>reject an application</li>
              <li>suspend an account</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Where applicable, KiriLock may target administrative review within 24 hours. This is a service objective and does not constitute a guarantee that an application will be approved within 24 hours.
            </p>
            <p className="text-kiri-text-soft">
              Landlords are responsible for providing accurate property and tenant information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">5. Tenant Accounts</h2>
            <p className="text-kiri-text-soft mb-2">
              Tenant accounts are generally established through landlord-controlled onboarding or another authorized process.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Tenants must not attempt to claim or access property, units, locks, or payment responsibilities that have not been assigned to them.
            </p>
            <p className="text-kiri-text-soft">
              Tenants are responsible for protecting their account credentials and reporting suspected unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">6. Account Security</h2>
            <p className="text-kiri-text-soft mb-4">
              Users are responsible for protecting their credentials.
            </p>
            <p className="text-kiri-text-soft mb-2">
              You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>share passwords</li>
              <li>share authentication tokens</li>
              <li>attempt to bypass authentication</li>
              <li>attempt to manipulate authorization</li>
              <li>access another user's account</li>
              <li>attempt to extract system credentials</li>
              <li>interfere with security controls</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              KiriLock may suspend or restrict accounts where there is a reasonable security concern, subject to applicable law and platform procedures.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">7. Property Information</h2>
            <p className="text-kiri-text-soft mb-4">
              Landlords are responsible for the accuracy of information they provide regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>properties</li>
              <li>units</li>
              <li>ownership or management authority</li>
              <li>tenants</li>
              <li>tenancy information</li>
              <li>rental obligations</li>
              <li>payment responsibilities</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              KiriLock does not automatically guarantee that information supplied by a landlord is legally correct merely because it has been entered into the platform.
            </p>
            <p className="text-kiri-text-soft">
              Where verification is required, KiriLock may use internal or third-party verification processes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">8. Verification</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock may verify identity, property ownership, legal authority, business information, payment information, or other relevant information.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Verification may involve:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>automated checks</li>
              <li>internal checks</li>
              <li>document review</li>
              <li>third-party verification providers</li>
              <li>administrator review</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Verification status does not necessarily constitute a legal determination of ownership, title, or rights beyond the scope of the verification process actually performed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">9. Locks and Access Devices</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock may support physical locks and connected access devices.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Users must not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>tamper with devices</li>
              <li>attempt unauthorized access</li>
              <li>bypass device controls</li>
              <li>interfere with device communications</li>
              <li>attempt to obtain device credentials</li>
              <li>assign devices outside their authority</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Device functionality depends on the relevant hardware, connectivity, provider, configuration, and service availability.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock cannot guarantee continuous connectivity or availability of third-party device services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">10. Rental Payments</h2>
            <p className="text-kiri-text-soft mb-2">
              Where payment functionality is available, users must use the payment information and references provided by the platform.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Users should verify the payment details before completing a transaction.
            </p>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may use payment providers and other third-party financial services.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Payment confirmation may depend on provider confirmation rather than a frontend transaction result.
            </p>
            <p className="text-kiri-text-soft mb-4">
              Payment transactions may be subject to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>provider terms</li>
              <li>transaction limits</li>
              <li>verification</li>
              <li>fraud controls</li>
              <li>refunds</li>
              <li>reversals</li>
              <li>disputes</li>
              <li>applicable financial requirements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">11. Platform and Maintenance Fees</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may charge a platform or maintenance fee according to the applicable fee policy.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Where applicable, the platform fee may be deducted from rental payments before landlord settlement.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The applicable fee should be identified by the relevant transaction or service terms.
            </p>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may change its fee policies prospectively, subject to applicable notice requirements.
            </p>
            <p className="text-kiri-text-soft">
              A fee policy applied to a completed transaction should remain associated with that historical transaction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">12. Landlord Settlements</h2>
            <p className="text-kiri-text-soft mb-2">
              Where KiriLock provides settlement functionality, the landlord's settlement amount may be calculated after applicable fees, adjustments, refunds, reversals, or other permitted deductions.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Settlement timing may depend on the payment provider, financial institution, verification status, and other operational conditions.
            </p>
            <p className="text-kiri-text-soft">
              A displayed settlement amount is not necessarily proof that funds have already been transferred.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">13. Prohibited Use</h2>
            <p className="text-kiri-text-soft mb-2">
              You must not use KiriLock to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>commit unlawful activity</li>
              <li>gain unauthorized access</li>
              <li>interfere with another user's property or access</li>
              <li>manipulate payment information</li>
              <li>circumvent verification</li>
              <li>impersonate a landlord or tenant</li>
              <li>falsify ownership information</li>
              <li>abuse lock functionality</li>
              <li>distribute malicious software</li>
              <li>attack platform infrastructure</li>
              <li>interfere with service availability</li>
              <li>extract confidential information</li>
              <li>attempt privilege escalation</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">14. Administrative Actions</h2>
            <p className="text-kiri-text-soft mb-2">
              Authorized administrators may perform operational actions according to their assigned permissions.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Sensitive actions may be recorded for security and audit purposes.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock may maintain records of administrative actions to support security, troubleshooting, dispute resolution, and accountability.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">15. Suspension and Termination</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may restrict, suspend, or terminate access where permitted by law and applicable platform procedures, including where:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>information is materially false</li>
              <li>verification fails</li>
              <li>account security is compromised</li>
              <li>the account is used improperly</li>
              <li>payment obligations are materially violated</li>
              <li>the user attempts unauthorized access</li>
              <li>continued access creates a significant security or operational risk</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Termination does not necessarily erase historical records that must be retained for security, accounting, legal, or operational reasons.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">16. Third-Party Services</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock may integrate with third-party services including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>payment providers</li>
              <li>identity verification providers</li>
              <li>email providers</li>
              <li>messaging providers</li>
              <li>device/lock providers</li>
              <li>infrastructure providers</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Third-party services may have their own terms and privacy policies.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock does not control third-party services and may depend on their availability and functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">17. Availability</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock aims to provide reliable services but does not guarantee uninterrupted availability.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Service interruptions may result from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>maintenance</li>
              <li>infrastructure failures</li>
              <li>network failures</li>
              <li>third-party provider outages</li>
              <li>device connectivity issues</li>
              <li>security incidents</li>
              <li>circumstances beyond reasonable control</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">18. Security and Responsible Use</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock uses technical and organizational measures intended to protect accounts, data, devices, and transactions.
            </p>
            <p className="text-kiri-text-soft mb-2">
              However, no online service can guarantee absolute security.
            </p>
            <p className="text-kiri-text-soft">
              Users must report suspected security incidents promptly through the available support channels.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">19. User Responsibilities</h2>
            <p className="text-kiri-text-soft mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>accurate information</li>
              <li>account security</li>
              <li>lawful use</li>
              <li>appropriate property information</li>
              <li>appropriate tenant information</li>
              <li>appropriate use of locks</li>
              <li>payment accuracy</li>
              <li>compliance with applicable agreements and laws</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Landlords remain responsible for their legal relationships with tenants and property owners.
            </p>
            <p className="text-kiri-text-soft">
              Tenants remain responsible for their obligations under their tenancy agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">20. Intellectual Property</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock software, branding, interfaces, documentation, and associated materials may be protected by applicable intellectual-property laws.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Users receive only the rights necessary to use the service according to these Terms.
            </p>
            <p className="text-kiri-text-soft">
              Users must not copy, reverse engineer, redistribute, or commercially exploit protected platform components except where permitted by applicable law or written authorization.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">21. Privacy</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock processes personal and operational information according to its Privacy Policy.
            </p>
            <p className="text-kiri-text-soft mb-2">
              By using KiriLock, you acknowledge that information may be processed for purposes including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>account management</li>
              <li>authentication</li>
              <li>verification</li>
              <li>property management</li>
              <li>tenancy management</li>
              <li>payment processing</li>
              <li>security</li>
              <li>auditing</li>
              <li>service improvement</li>
              <li>customer support</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">22. Changes to These Terms</h2>
            <p className="text-kiri-text-soft mb-2">
              KiriLock may update these Terms from time to time.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The platform should identify the applicable version and update date.
            </p>
            <p className="text-kiri-text-soft">
              Where applicable law requires additional notice or consent, KiriLock will follow the required process.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">23. Governing Law and Disputes</h2>
            <p className="text-kiri-text-soft mb-2">
              The governing law, dispute-resolution process, and jurisdiction applicable to a user's use of KiriLock will depend on the applicable contractual arrangement and jurisdiction.
            </p>
            <p className="text-kiri-text-soft">
              This section should be completed with jurisdiction-specific legal advice before production deployment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">24. Contact</h2>
            <p className="text-kiri-text-soft">
              Questions regarding these Terms should be directed through the official KiriLock support channel.
            </p>
            <p className="text-kiri-text-soft mt-2">
              Support: [Insert Official Support Contact]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-kiri-text">25. Acceptance</h2>
            <p className="text-kiri-text-soft mb-2">
              By selecting the applicable acceptance option during registration or otherwise using KiriLock where acceptance is required, you acknowledge that you have read and agreed to the applicable Terms.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The platform may record:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>Terms version</li>
              <li>acceptance timestamp</li>
              <li>account identity</li>
              <li>relevant consent record</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              for accountability and compliance purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
