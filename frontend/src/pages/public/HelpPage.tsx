export function HelpPage() {
  return (
    <div className="min-h-screen bg-kiri-950 text-kiri-text p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">KiriLock Help & Support</h1>
          <p className="text-xl text-kiri-text-soft mb-2">We're here to help</p>
          <p className="text-kiri-text-soft">
            KiriLock is designed to make property management, tenant onboarding, access control, and rental payments easier to manage.
          </p>
          <p className="text-kiri-text-soft mt-2">
            If you are unsure what to do, start by identifying which type of user you are.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">I am a Landlord</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">I don't have an account</h3>
                <p className="text-kiri-text-muted mb-2">
                  From the KiriLock sign-in page, select:
                </p>
                <p className="text-kiri-text-soft font-medium mb-2">Register as Landlord</p>
                <p className="text-kiri-text-muted mb-2">
                  Complete the registration and provide the information required for verification.
                </p>
                <p className="text-kiri-text-muted mb-2">
                  After submitting your application, you will be able to view its status.
                </p>
                <p className="text-kiri-text-muted mb-4">
                  Landlord registration does not immediately grant landlord privileges. Your application must pass the applicable verification and approval process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">How long does landlord verification take?</h3>
                <p className="text-kiri-text-muted mb-2">
                  KiriLock targets administrative review within 24 hours where the service and required information are available.
                </p>
                <p className="text-kiri-text-muted mb-2">
                  This is a review target, not a guarantee that every application will be approved within 24 hours.
                </p>
                <p className="text-kiri-text-muted">
                  Some applications may require additional information or external verification.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">My application says "More Information Required"</h3>
                <p className="text-kiri-text-muted mb-2">
                  Open your application status page and review the requested information.
                </p>
                <p className="text-kiri-text-muted mb-2">
                  Provide the required information and resubmit the application.
                </p>
                <p className="text-kiri-text-muted">
                  Your previous application history should remain available to the authorized system for review and accountability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">My landlord application was rejected</h3>
                <p className="text-kiri-text-muted mb-2">
                  Review the safe reason provided by KiriLock.
                </p>
                <p className="text-kiri-text-muted mb-2">
                  Depending on the reason and applicable policy, you may be allowed to correct the information and submit another application.
                </p>
                <p className="text-kiri-text-muted">
                  Do not create duplicate accounts to bypass a rejection.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">Managing My Property</h3>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">How do I add a property?</h4>
                    <p className="text-kiri-text-muted">
                      After your landlord account is approved, open your landlord dashboard and select the property-management function.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Provide the required property information and save the property.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      The property will then become available for authorized unit management.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">How do I add a unit?</h4>
                    <p className="text-kiri-text-muted">
                      Open the relevant property and select:
                    </p>
                    <p className="text-kiri-text-soft font-medium mt-2">Add Unit</p>
                    <p className="text-kiri-text-muted mt-2">
                      Provide the required unit information.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Each unit receives its own identity within KiriLock.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">How do I add a tenant?</h4>
                    <p className="text-kiri-text-muted">
                      Tenant onboarding is initiated by the landlord.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Select the appropriate property and unit, then choose:
                    </p>
                    <p className="text-kiri-text-soft font-medium mt-2">Add Tenant</p>
                    <p className="text-kiri-text-muted mt-2">
                      Provide the required tenant information and follow the invitation process.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Make sure the tenant is assigned to the correct unit before completing the process.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">Locks and Access</h3>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">How do I assign a lock?</h4>
                    <p className="text-kiri-text-muted">
                      A lock must first be properly provisioned and available for assignment.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      The authorized workflow is:
                    </p>
                    <p className="text-kiri-text-soft font-medium mt-2">Provisioned Lock → Property → Unit → Assign</p>
                    <p className="text-kiri-text-muted mt-2">
                      Only users with the appropriate permission can perform the assignment.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">My lock is not working</h4>
                    <p className="text-kiri-text-muted mb-2">Check:</p>
                    <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                      <li>device status</li>
                      <li>connectivity</li>
                      <li>power/battery status where available</li>
                      <li>device assignment</li>
                      <li>current authorization</li>
                      <li>recent device events</li>
                    </ul>
                    <p className="text-kiri-text-muted mt-2">
                      If the device remains unavailable, contact support.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Do not attempt to bypass the device's security controls.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">My lock was replaced</h4>
                    <p className="text-kiri-text-muted">
                      A replacement lock should be provisioned and assigned through the authorized KiriLock workflow.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Historical device information should remain available to authorized users.
                    </p>
                    <p className="text-kiri-text-muted mt-2">
                      Do not manually change device identifiers to force a replacement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">I am a Tenant</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">How do I get a KiriLock account?</h3>
                <p className="text-kiri-text-muted mb-2">
                  Tenants normally receive an invitation from their landlord.
                </p>
                <p className="text-kiri-text-muted mb-2">
                  Use:
                </p>
                <p className="text-kiri-text-soft font-medium mb-2">Activate Invitation</p>
                <p className="text-kiri-text-muted mb-2">
                  to complete your account activation.
                </p>
                <p className="text-kiri-text-muted">
                  Do not attempt to register yourself as the owner or landlord of a property you do not manage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">I cannot see my home</h3>
                <p className="text-kiri-text-muted mb-2">
                  Your account may not yet be activated, or your landlord may not have completed the tenancy assignment.
                </p>
                <p className="text-kiri-text-muted">
                  Contact your landlord or KiriLock support if the problem continues.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">I cannot access my lock</h3>
                <p className="text-kiri-text-muted mb-2">First check whether:</p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>your account is active</li>
                  <li>your tenancy is active</li>
                  <li>the correct unit is assigned</li>
                  <li>the device is online</li>
                  <li>your access permission is active</li>
                </ul>
                <p className="text-kiri-text-muted mt-2">
                  If the problem continues, contact your landlord or support.
                </p>
                <p className="text-kiri-text-muted mt-2">
                  Do not attempt to bypass the lock.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">Payments</h3>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">How do I know what I should pay?</h4>
                    <p className="text-kiri-text-muted mb-2">
                      Your payment screen should identify the relevant rental obligation, including applicable information such as:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                      <li>property</li>
                      <li>unit</li>
                      <li>rental period</li>
                      <li>amount</li>
                      <li>currency</li>
                      <li>payment reference</li>
                      <li>payment status</li>
                    </ul>
                    <p className="text-kiri-text-muted mt-2">
                      Always verify the payment reference before completing payment.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">My payment was made but still shows as pending</h4>
                    <p className="text-kiri-text-muted mb-2">
                      Payment status may remain pending until the relevant payment provider confirms the transaction.
                    </p>
                    <p className="text-kiri-text-muted mb-2">
                      Do not repeatedly submit the same payment merely because the status has not updated.
                    </p>
                    <p className="text-kiri-text-muted">
                      If the status remains pending beyond the expected processing period, contact support with the payment reference.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">I paid the wrong account or reference</h4>
                    <p className="text-kiri-text-muted mb-2">
                      Contact support as soon as possible.
                    </p>
                    <p className="text-kiri-text-muted mb-2">
                      Do not make another payment simply to compensate unless instructed through an authorized process.
                    </p>
                    <p className="text-kiri-text-muted">
                      KiriLock should not automatically assign an unidentified payment to a tenant merely because the amount appears to match.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2 text-kiri-text-muted">I see an incorrect payment</h4>
                    <p className="text-kiri-text-muted mb-2">
                      Contact support and provide the relevant payment reference.
                    </p>
                    <p className="text-kiri-text-muted">
                      Do not attempt to alter payment records yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Account & Security</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">I forgot my password</h3>
                <p className="text-kiri-text-muted mb-2">
                  Select:
                </p>
                <p className="text-kiri-text-soft font-medium mb-2">Forgot Password?</p>
                <p className="text-kiri-text-muted mb-2">
                  from the sign-in page and follow the secure password-reset process.
                </p>
                <p className="text-kiri-text-muted">
                  Never send your password to support.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">I think someone accessed my account</h3>
                <p className="text-kiri-text-muted mb-2">Immediately:</p>
                <ul className="list-disc list-inside space-y-1 text-kiri-text-muted ml-4">
                  <li>Change your password.</li>
                  <li>Sign out of sessions where possible.</li>
                  <li>Review recent account/security activity.</li>
                  <li>Contact KiriLock support.</li>
                </ul>
                <p className="text-kiri-text-muted mt-2">
                  If you believe property or lock access has been compromised, notify your landlord or the appropriate administrator immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-kiri-text-soft">Why was I signed out?</h3>
                <p className="text-kiri-text-muted mb-2">
                  Your session may have expired, been revoked, or been invalidated for security reasons.
                </p>
                <p className="text-kiri-text-muted mb-2">
                  Sign in again.
                </p>
                <p className="text-kiri-text-muted">
                  If the problem happens repeatedly, contact support.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Administrators</h2>
            <p className="text-kiri-text-soft mb-4">
              Authorized administrators may have access to additional operational functions including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>landlord verification</li>
              <li>payment reconciliation</li>
              <li>property oversight</li>
              <li>tenant oversight</li>
              <li>device management</li>
              <li>security operations</li>
              <li>audit information</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              Administrative actions may be recorded for security and accountability.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Super Administrators</h2>
            <p className="text-kiri-text-soft mb-4">
              Super Administrators have additional privileges according to KiriLock's security policy.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Sensitive functions such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>administrator management</li>
              <li>platform configuration</li>
              <li>device provisioning</li>
              <li>security configuration</li>
              <li>financial policy configuration</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              should only be performed through authorized workflows.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Contact Support</h2>
            <p className="text-kiri-text-soft mb-4">
              When contacting support, provide information that helps us investigate the problem without sending secrets.
            </p>
            <p className="text-kiri-text-soft mb-2">
              Useful information may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>your account email</li>
              <li>application/reference ID</li>
              <li>payment reference</li>
              <li>property/unit identifier</li>
              <li>lock/device identifier</li>
              <li>approximate time of the issue</li>
              <li>description of what happened</li>
              <li>screenshot where appropriate</li>
            </ul>
            <p className="text-kiri-text-soft mt-4 mb-2">
              Never send support:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>your password</li>
              <li>authentication tokens</li>
              <li>API keys</li>
              <li>private keys</li>
              <li>payment PINs</li>
              <li>device API secrets</li>
              <li>verification tokens</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Emergency Security Issue</h2>
            <p className="text-kiri-text-soft mb-4">
              If you believe there is an immediate security problem involving:
            </p>
            <ul className="list-disc list-inside space-y-2 text-kiri-text-soft ml-4">
              <li>unauthorized property access</li>
              <li>compromised credentials</li>
              <li>unauthorized lock activity</li>
              <li>suspicious payment activity</li>
              <li>administrator privilege abuse</li>
            </ul>
            <p className="text-kiri-text-soft mt-4">
              contact the appropriate KiriLock security/support channel immediately.
            </p>
            <p className="text-kiri-text-soft mt-2">
              For physical safety emergencies, contact the relevant local emergency service rather than relying on KiriLock support.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Can a tenant register themselves as a landlord?</h3>
                <p className="text-kiri-text-muted">
                  No.
                </p>
                <p className="text-kiri-text-muted mt-2">
                  Landlord registration is a separate controlled process because landlord accounts can receive property-management privileges.
                </p>
                <p className="text-kiri-text-muted mt-2">
                  Tenant onboarding is normally initiated by the landlord.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Can I register more than one property?</h3>
                <p className="text-kiri-text-muted">
                  Subject to your account permissions and applicable service limitations, a landlord can manage multiple authorized properties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Can one lock belong to multiple units?</h3>
                <p className="text-kiri-text-muted">
                  An active lock should not be assigned to multiple units simultaneously.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Can a landlord see another landlord's tenants?</h3>
                <p className="text-kiri-text-muted">
                  No. Access to tenant and property information is controlled by backend authorization.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Can a tenant see another tenant's payment?</h3>
                <p className="text-kiri-text-muted">
                  No. Tenant financial information is restricted to the appropriate authorized scope.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Does KiriLock automatically approve every landlord after 24 hours?</h3>
                <p className="text-kiri-text-muted">
                  No.
                </p>
                <p className="text-kiri-text-muted mt-2">
                  The 24-hour period is a review target. Approval depends on the required verification and approval process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-kiri-text-soft">Does KiriLock automatically verify every identity?</h3>
                <p className="text-kiri-text-muted">
                  No.
                </p>
                <p className="text-kiri-text-muted mt-2">
                  Automatic verification is only possible where KiriLock has a reliable verification mechanism capable of establishing the relevant fact.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-kiri-text">Need More Help?</h2>
            <p className="text-kiri-text-soft mb-4">
              Use the official KiriLock support channel provided by the application.
            </p>
            <p className="text-kiri-text-soft mt-2">
              Support Contact: [Insert Official Support Contact]
            </p>
            <p className="text-kiri-text-soft mt-2">
              Privacy Contact: [Insert Official Privacy Contact]
            </p>
            <p className="text-kiri-text-soft mt-2">
              Security Contact: [Insert Official Security Contact]
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/8">
            <p className="text-kiri-text-soft font-semibold">
              KiriLock
            </p>
            <p className="text-kiri-text-muted mt-2">
              Secure property management, access, and accountability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
