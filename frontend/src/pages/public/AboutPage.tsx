export function AboutPage() {
  return (
    <div className="min-h-screen bg-kiri-950 text-kiri-text p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">About KiriLock</h1>
          <p className="text-xl text-kiri-text-soft mb-2">Secure access. Smarter property management. Better accountability.</p>
        </div>

        <div className="space-y-4">
          <p className="text-kiri-text-soft">
            KiriLock is a technology platform designed to connect property owners, landlords, tenants, locks, rental responsibilities, and payments through one secure property-management and access-control system.
          </p>
          <p className="text-kiri-text-soft">
            Our goal is simple: make property management easier to operate while creating a clear, accountable relationship between the people, properties, units, locks, and payments involved.
          </p>
          <p className="text-kiri-text-soft">
            KiriLock is designed for property owners and landlords who need to manage multiple properties and tenants, tenants who need reliable access to their assigned homes, and authorized administrators who oversee the platform and its security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">What KiriLock does</h2>
          <p className="text-kiri-text-soft mb-4">
            KiriLock brings several parts of property management together:
          </p>
          <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
            <li>Landlord registration and verification</li>
            <li>Property management</li>
            <li>Unit and room management</li>
            <li>Tenant onboarding</li>
            <li>Tenancy management</li>
            <li>Smart lock and device management</li>
            <li>Access authorization</li>
            <li>Rental payment and subscription management</li>
            <li>Platform maintenance and service fees</li>
            <li>Administrative oversight</li>
            <li>Security and audit records</li>
          </ul>
          <p className="text-kiri-text-soft mt-4">
            Instead of treating these as unrelated systems, KiriLock connects them through authoritative relationships.
          </p>
          <p className="text-kiri-text-soft mt-2">
            A property contains units.
          </p>
          <p className="text-kiri-text-soft">
            A unit can have an assigned lock.
          </p>
          <p className="text-kiri-text-soft">
            A tenant can be assigned to a unit through a tenancy.
          </p>
          <p className="text-kiri-text-soft">
            A tenancy can have a payment responsibility.
          </p>
          <p className="text-kiri-text-soft">
            The payment responsibility can produce a specific payment obligation and reference.
          </p>
          <p className="text-kiri-text-soft mt-2">
            This creates a traceable relationship between the physical property and the digital system.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Built around accountability</h2>
          <p className="text-kiri-text-soft mb-4">
            KiriLock is designed around the principle that important actions should be attributable, authorized, and traceable.
          </p>
          <p className="text-kiri-text-soft mb-2">
            Landlords do not simply create privileged accounts and immediately receive unrestricted access. New landlord applications can be subject to verification and administrative review.
          </p>
          <p className="text-kiri-text-soft mb-2">
            Tenants do not claim properties or rooms themselves. Their access is established through the landlord-controlled tenancy and onboarding process.
          </p>
          <p className="text-kiri-text-soft mb-2">
            Administrators operate within their authorized responsibilities.
          </p>
          <p className="text-kiri-text-soft mb-2">
            Security-sensitive actions are subject to backend authorization rather than relying solely on what the user interface displays.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">KiriLock and locks</h2>
          <p className="text-kiri-text-soft mb-4">
            KiriLock is designed to support physical locks and connected access devices.
          </p>
          <p className="text-kiri-text-soft mb-2">
            A KiriLock device can be provisioned into the platform, validated where the relevant device integration supports validation, and associated with a property and unit.
          </p>
          <p className="text-kiri-text-soft mb-4">
            This allows the platform to maintain a clear relationship between:
          </p>
          <p className="text-kiri-text-soft font-medium mb-2">
            Property → Unit → Lock → Tenant
          </p>
          <p className="text-kiri-text-soft mb-2">
            When a lock is replaced, the system can preserve the historical relationship while establishing the new active device.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">KiriLock and payments</h2>
          <p className="text-kiri-text-soft mb-4">
            KiriLock is designed to make rental payment responsibilities easier to identify and reconcile.
          </p>
          <p className="text-kiri-text-soft mb-2">
            A payment should not depend on guessing which tenant paid based only on an amount, name, or telephone number.
          </p>
          <p className="text-kiri-text-soft mb-2">
            Instead, the platform can establish an authoritative payment obligation and reference associated with the relevant tenancy, unit, property, landlord, and applicable payment responsibility.
          </p>
          <p className="text-kiri-text-soft mb-2">
            Where platform fees apply, KiriLock can calculate the applicable platform or maintenance fee and the corresponding landlord settlement according to the applicable fee policy.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Designed for growth</h2>
          <p className="text-kiri-text-soft mb-4">
            KiriLock is being designed with international operation in mind.
          </p>
          <p className="text-kiri-text-soft mb-2">
            The platform is intended to support different:
          </p>
          <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
            <li>currencies</li>
            <li>payment providers</li>
            <li>property structures</li>
            <li>device providers</li>
            <li>identity and verification providers</li>
            <li>regional requirements</li>
          </ul>
          <p className="text-kiri-text-soft mt-4">
            Specific legal, regulatory, payment, identity-verification, and service-provider requirements may vary by jurisdiction and may require additional integrations or professional review.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Our approach to security</h2>
          <p className="text-kiri-text-soft mb-4">
            Security is part of the system architecture rather than simply a visual feature.
          </p>
          <p className="text-kiri-text-soft mb-2">
            KiriLock is designed to use:
          </p>
          <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
            <li>authenticated sessions</li>
            <li>backend authorization</li>
            <li>role-based access</li>
            <li>controlled administrative actions</li>
            <li>transactionally consistent operations</li>
            <li>audit records</li>
            <li>secure credential handling</li>
            <li>controlled device provisioning</li>
            <li>payment reconciliation</li>
            <li>data minimization</li>
          </ul>
          <p className="text-kiri-text-soft mt-4">
            No technology platform can guarantee that every risk will be eliminated. KiriLock therefore focuses on reducing unnecessary exposure, enforcing authorization at the appropriate boundary, and maintaining accountability for important operations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Who KiriLock is for</h2>
          <p className="text-kiri-text-soft mb-4">
            KiriLock is designed for:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Landlords and property owners</h3>
              <p className="text-kiri-text-muted">
                Manage properties, units, tenants, locks, rental responsibilities, and relevant financial information.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Tenants</h3>
              <p className="text-kiri-text-muted">
                Access information about their assigned home, authorized access device, tenancy, and payment responsibilities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Administrators</h3>
              <p className="text-kiri-text-muted">
                Review and manage authorized operational, verification, security, and platform functions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Super Administrators</h3>
              <p className="text-kiri-text-muted">
                Manage higher-level platform configuration and privileged operations according to the platform's security policy.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Our purpose</h2>
          <p className="text-kiri-text-soft mb-2">
            KiriLock exists to make property management more connected, transparent, and manageable.
          </p>
          <p className="text-kiri-text-soft mb-2">
            We want a landlord to know which tenant occupies which unit.
          </p>
          <p className="text-kiri-text-soft mb-2">
            We want the system to know which lock belongs to which unit.
          </p>
          <p className="text-kiri-text-soft mb-2">
            We want tenants to know exactly what property and payment responsibility belongs to them.
          </p>
          <p className="text-kiri-text-soft mb-2">
            We want administrators to have the information necessary to operate and secure the platform.
          </p>
          <p className="text-kiri-text-soft mb-2">
            And we want important actions to leave a reliable trail.
          </p>
          <p className="text-kiri-text-soft mt-4 font-semibold">
            KiriLock — connecting property, people, access, and accountability.
          </p>
        </div>
      </div>
    </div>
  )
}
