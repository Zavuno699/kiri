-- Migration 000042: Admin invitations and profiles for vetting lifecycle
-- This migration adds tables for admin invitation flow and admin profile management
-- with explicit state machine for vetting process.

-- Admin invitations table for managing invite-to-admin workflow
CREATE TABLE IF NOT EXISTS admin_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL UNIQUE REFERENCES identity_subjects(id) ON DELETE CASCADE,
    invited_by_subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE SET NULL,
    intended_role VARCHAR(50) NOT NULL CHECK (intended_role IN ('security_admin', 'finance_admin', 'device_admin', 'audit_admin', 'super_admin')),
    reason TEXT NOT NULL,
    department VARCHAR(255),
    invitation_token_hash VARCHAR(64) NOT NULL UNIQUE,
    invitation_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INVITED' CHECK (status IN ('INVITED', 'ACCEPTED', 'REVOKED', 'EXPIRED')),
    single_use BOOLEAN NOT NULL DEFAULT true,
    accepted_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1
);

-- Indexes for admin_invitations
CREATE INDEX IF NOT EXISTS idx_admin_invitations_subject_id ON admin_invitations(subject_id);
CREATE INDEX IF NOT EXISTS idx_admin_invitations_invited_by ON admin_invitations(invited_by_subject_id);
CREATE INDEX IF NOT EXISTS idx_admin_invitations_token_hash ON admin_invitations(invitation_token_hash);
CREATE INDEX IF NOT EXISTS idx_admin_invitations_status ON admin_invitations(status);
CREATE INDEX IF NOT EXISTS idx_admin_invitations_expires_at ON admin_invitations(invitation_expires_at);

-- Admin profiles table for managing admin lifecycle and vetting
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL UNIQUE REFERENCES identity_subjects(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('security_admin', 'finance_admin', 'device_admin', 'audit_admin', 'super_admin')),
    status VARCHAR(50) NOT NULL DEFAULT 'PROFILE_COMPLETED' CHECK (status IN (
        'PROFILE_COMPLETED',
        'VETTING_PENDING',
        'UNDER_REVIEW',
        'APPROVED',
        'ACTIVE',
        'REJECTED',
        'SUSPENDED',
        'REVOKED'
    )),
    department VARCHAR(255),
    justification TEXT,
    vetting_notes TEXT,
    approved_by_subject_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_by_subject_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    suspended_by_subject_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    suspended_at TIMESTAMP WITH TIME ZONE,
    suspension_reason TEXT,
    reactivated_by_subject_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    reactivated_at TIMESTAMP WITH TIME ZONE,
    effective_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    effective_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1
);

-- Indexes for admin_profiles
CREATE INDEX IF NOT EXISTS idx_admin_profiles_subject_id ON admin_profiles(subject_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON admin_profiles(role);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_status ON admin_profiles(status);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_approved_by ON admin_profiles(approved_by_subject_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_effective_dates ON admin_profiles(effective_from, effective_until);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_invitations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_admin_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trg_admin_invitations_updated_at ON admin_invitations;
CREATE TRIGGER trg_admin_invitations_updated_at
BEFORE UPDATE ON admin_invitations
FOR EACH ROW
EXECUTE FUNCTION update_admin_invitations_updated_at();

DROP TRIGGER IF EXISTS trg_admin_profiles_updated_at ON admin_profiles;
CREATE TRIGGER trg_admin_profiles_updated_at
BEFORE UPDATE ON admin_profiles
FOR EACH ROW
EXECUTE FUNCTION update_admin_profiles_updated_at();

-- Comments documenting the vetting state machine
COMMENT ON TABLE admin_invitations IS 'Manages admin invitation workflow with token-based single-use invitations';
COMMENT ON TABLE admin_profiles IS 'Manages admin lifecycle with explicit vetting state machine: PROFILE_COMPLETED -> VETTING_PENDING -> UNDER_REVIEW -> APPROVED -> ACTIVE, plus REJECTED/SUSPENDED/REVOKED states';
COMMENT ON COLUMN admin_profiles.status IS 'Vetting state machine: PROFILE_COMPLETED (initial), VETTING_PENDING (awaiting review), UNDER_REVIEW (being reviewed), APPROVED (approved but not yet active), ACTIVE (fully operational), REJECTED (denied), SUSPENDED (temporarily suspended), REVOKED (permanently removed)';
