export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-kiri-950 text-kiri-text p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">How KiriLock Works</h1>
          <p className="text-xl text-kiri-text-soft mb-2">One connected system for property, tenants, access, and payments</p>
        </div>

        <div className="space-y-4">
          <p className="text-kiri-text-soft">
            KiriLock connects the main relationships involved in managing a rental property.
          </p>
          <p className="text-kiri-text-soft mb-4">
            The basic structure is:
          </p>
          <p className="text-kiri-text-soft font-medium mb-4">
            Landlord → Property → Unit → Lock → Tenant → Payment Responsibility
          </p>
          <p className="text-kiri-text-soft">
            Each relationship is established through authorized workflows rather than being created arbitrarily by a user.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">1. Landlords register</h2>
            <p className="text-kiri-text-soft mb-4">
              A person who wants to manage property through KiriLock begins by selecting Register as Landlord.
            </p>
            <p className="text-kiri-text-soft mb-4">
              The landlord provides the information required for account creation and verification.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Depending on the property and jurisdiction, this may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>identity information</li>
              <li>contact information</li>
              <li>professional or business information</li>
              <li>property ownership or legal-authority information</li>
              <li>supporting documentation</li>
              <li>payment or settlement information</li>
              <li>required consent</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Registration does not automatically grant landlord privileges.
            </p>
            <p className="text-kiri-text-soft">
              The application enters a verification and review process.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">2. The landlord application is reviewed</h2>
            <p className="text-kiri-text-soft mb-4">
              After submission, the application enters a pending verification state.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The platform can perform automated checks where reliable verification sources are available.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Applications may also be reviewed by an authorized administrator.
            </p>
            <p className="text-kiri-text-soft mb-4">
              Possible states include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>Pending Verification</li>
              <li>Under Review</li>
              <li>More Information Required</li>
              <li>Verified</li>
              <li>Approved</li>
              <li>Rejected</li>
              <li>Suspended</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              The target for administrative review may be within 24 hours, but this should not be interpreted as a guarantee that every application will be approved within 24 hours.
            </p>
            <p className="text-kiri-text-soft">
              If additional verification providers are required, the application may remain pending until the necessary checks are completed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">3. Approved landlords access their dashboard</h2>
            <p className="text-kiri-text-soft mb-4">
              Once a landlord has been approved and activated, they can sign in.
            </p>
            <p className="text-kiri-text-soft mb-4">
              The landlord dashboard provides access to the functions permitted for that account.
            </p>
            <p className="text-kiri-text-soft mb-2">
              These can include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>properties</li>
              <li>units</li>
              <li>tenants</li>
              <li>locks</li>
              <li>payment responsibilities</li>
              <li>rental information</li>
              <li>activity</li>
              <li>account and security settings</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              The backend determines what the landlord is authorized to do.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">4. The landlord creates a property</h2>
            <p className="text-kiri-text-soft mb-4">
              The landlord creates or manages an authorized property.
            </p>
            <p className="text-kiri-text-soft mb-2">
              A property can contain multiple units.
            </p>
            <p className="text-kiri-text-soft mb-4">
              For example:
            </p>
            <div className="bg-white/[0.02] p-4 rounded-lg mb-4">
              <p className="text-kiri-text-soft font-medium mb-2">Property: KiriLock Apartments</p>
              <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                <li>Unit 01</li>
                <li>Unit 02</li>
                <li>Unit 03</li>
                <li>Unit 04</li>
              </ul>
            </div>
            <p className="text-kiri-text-soft">
              Each unit has its own identity within the system.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">5. Units receive locks</h2>
            <p className="text-kiri-text-soft mb-2">
              A KiriLock device must first be provisioned into the platform.
            </p>
            <p className="text-kiri-text-soft mb-2">
              An authorized administrator registers the device and, where supported, validates its connection and capabilities.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The device is then available for authorized assignment.
            </p>
            <p className="text-kiri-text-soft mb-4">
              The relationship becomes:
            </p>
            <p className="text-kiri-text-soft font-medium mb-4">
              Property → Unit → Lock
            </p>
            <p className="text-kiri-text-soft">
              The system prevents the same active lock from being assigned incorrectly to multiple units.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">6. The landlord registers a tenant</h2>
            <p className="text-kiri-text-soft mb-4">
              Tenant onboarding is controlled by the landlord.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The landlord selects the appropriate property and unit and provides the information required for tenant onboarding.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The platform establishes the tenancy.
            </p>
            <p className="text-kiri-text-soft mb-4">
              The tenant is therefore associated with:
            </p>
            <p className="text-kiri-text-soft font-medium mb-4">
              Tenant → Tenancy → Unit → Property
            </p>
            <p className="text-kiri-text-soft">
              The tenant does not simply choose a room and claim it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">7. The tenant receives an invitation</h2>
            <p className="text-kiri-text-soft mb-2">
              The tenant receives a controlled invitation or account-activation process.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The tenant completes the required activation steps and creates their secure account credentials where applicable.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Once activated, the tenant can access the tenant experience.
            </p>
            <p className="text-kiri-text-soft">
              The tenant sees only the information and functions authorized for that tenant.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">8. The tenant's access is connected to the correct lock</h2>
            <p className="text-kiri-text-soft mb-4">
              Because the tenant is assigned to a specific unit, and the unit has an assigned lock, KiriLock can establish the relationship:
            </p>
            <p className="text-kiri-text-soft font-medium mb-4">
              Tenant → Tenancy → Unit → Lock
            </p>
            <p className="text-kiri-text-soft mb-2">
              This allows access permissions to be based on authoritative relationships rather than manually entered identifiers.
            </p>
            <p className="text-kiri-text-soft">
              If a lock is replaced, the historical device relationship can be preserved while a new lock becomes the active device.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">9. Rental payment responsibility is established</h2>
            <p className="text-kiri-text-soft mb-4">
              The rental obligation is associated with the tenancy.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The platform can create a payment responsibility containing information such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>tenant</li>
              <li>landlord</li>
              <li>property</li>
              <li>unit</li>
              <li>rental period</li>
              <li>amount</li>
              <li>currency</li>
              <li>payment account</li>
              <li>payment reference</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              This creates an authoritative payment obligation before the payment is made.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">10. The tenant pays</h2>
            <p className="text-kiri-text-soft mb-2">
              The tenant sees their payment obligation and the appropriate payment reference.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Where a real payment provider is connected, the payment is initiated through the supported payment process.
            </p>
            <p className="text-kiri-text-soft">
              KiriLock does not treat a frontend message such as "Payment successful" as sufficient proof of payment.
            </p>
            <p className="text-kiri-text-soft">
              The backend verifies the payment through the applicable payment infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">11. The payment is reconciled</h2>
            <p className="text-kiri-text-soft mb-4">
              After confirmation, KiriLock associates the payment with its authoritative payment obligation.
            </p>
            <p className="text-kiri-text-soft mb-2">
              The system can determine:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>who paid</li>
              <li>what tenancy the payment belongs to</li>
              <li>which unit it concerns</li>
              <li>which property it concerns</li>
              <li>which landlord is responsible</li>
              <li>what amount was received</li>
              <li>what currency was used</li>
              <li>what platform fee applies</li>
              <li>what amount is attributable to the landlord</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Ambiguous transactions should enter an exception/reconciliation process rather than being guessed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">12. KiriLock maintenance/platform fee</h2>
            <p className="text-kiri-text-soft mb-4">
              Where applicable, KiriLock may deduct a platform or maintenance fee according to the applicable fee policy.
            </p>
            <p className="text-kiri-text-soft mb-4">
              Conceptually:
            </p>
            <div className="bg-white/[0.02] p-4 rounded-lg mb-4 space-y-2">
              <p className="text-kiri-text-soft font-medium">Rental Payment</p>
              <p className="text-kiri-text-muted">minus</p>
              <p className="text-kiri-text-soft font-medium">KiriLock Platform/Maintenance Fee</p>
              <p className="text-kiri-text-muted">equals</p>
              <p className="text-kiri-text-soft font-medium">Landlord Settlement</p>
            </div>
            <p className="text-kiri-text-soft mb-2">
              The exact fee policy should be disclosed where applicable and recorded with the transaction.
            </p>
            <p className="text-kiri-text-soft">
              Historical transactions should retain the fee policy that was applied to them.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">13. Administrators oversee the platform</h2>
            <p className="text-kiri-text-soft mb-4">
              Authorized administrators can manage platform responsibilities such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>landlord verification</li>
              <li>property oversight</li>
              <li>tenant oversight</li>
              <li>device management</li>
              <li>payment reconciliation</li>
              <li>security operations</li>
              <li>audit review</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Administrative access is controlled by backend authorization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">14. Security is continuous</h2>
            <p className="text-kiri-text-soft mb-4">
              KiriLock treats authentication, authorization, device management, payments, and auditing as connected security concerns.
            </p>
            <p className="text-kiri-text-soft mb-2">
              For sensitive operations, the system can require:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>authentication</li>
              <li>appropriate permissions</li>
              <li>explicit confirmation</li>
              <li>backend validation</li>
              <li>transaction processing</li>
              <li>audit records</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              The user interface should make the system easy to operate, but the backend remains the final authority.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-kiri-text">In simple terms</h2>
          <p className="text-kiri-text-soft mb-6">
            KiriLock works like this:
          </p>
          
          <div className="space-y-6">
            <div className="bg-white/[0.02] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-kiri-text-soft">LANDLORD</h3>
              <div className="space-y-2 text-kiri-text-muted">
                <p>Register</p>
                <p>↓</p>
                <p>Verification</p>
                <p>↓</p>
                <p>Approval</p>
                <p>↓</p>
                <p>Create Property</p>
                <p>↓</p>
                <p>Create Units</p>
                <p>↓</p>
                <p>Provision/assign Locks</p>
                <p>↓</p>
                <p>Register Tenants</p>
                <p>↓</p>
                <p>Establish Payment Responsibilities</p>
              </div>
            </div>

            <div className="bg-white/[0.02] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-kiri-text-soft">TENANT</h3>
              <div className="space-y-2 text-kiri-text-muted">
                <p>Receive Invitation</p>
                <p>↓</p>
                <p>Activate Account</p>
                <p>↓</p>
                <p>See Assigned Home</p>
                <p>↓</p>
                <p>See Authorized Lock</p>
                <p>↓</p>
                <p>See Rental Payment</p>
                <p>↓</p>
                <p>Pay</p>
                <p>↓</p>
                <p>View Payment Status</p>
              </div>
            </div>

            <div className="bg-white/[0.02] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-kiri-text-soft">KIRILOCK</h3>
              <div className="space-y-2 text-kiri-text-muted">
                <p>Connects the relationships</p>
                <p>↓</p>
                <p>Authenticates users</p>
                <p>↓</p>
                <p>Authorizes actions</p>
                <p>↓</p>
                <p>Manages devices</p>
                <p>↓</p>
                <p>Reconciles payments</p>
                <p>↓</p>
                <p>Calculates applicable fees</p>
                <p>↓</p>
                <p>Maintains auditability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
