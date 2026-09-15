-- Landlord Application Lifecycle
-- States: PENDING_REGISTRATION -> PENDING_VERIFICATION -> PENDING_EXTERNAL_VERIFICATION -> APPROVED -> ACTIVE
--          MORE_INFORMATION_REQUIRED, REJECTED, SUSPENDED

CREATE TYPE landlord_application_status AS ENUM (
    'PENDING_REGISTRATION',
    'PENDING_VERIFICATION',
    'PENDING_EXTERNAL_VERIFICATION',
    'APPROVED',
    'ACTIVE',
    'MORE_INFORMATION_REQUIRED',
    'REJECTED',
    'SUSPENDED'
);

CREATE TABLE landlord_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_reference VARCHAR(50) UNIQUE NOT NULL,
    subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    status landlord_application_status NOT NULL DEFAULT 'PENDING_REGISTRATION',
    
    -- Timestamps
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    review_started_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    verification_updated_at TIMESTAMP WITH TIME ZONE,
    
    -- Verification source/result
    verification_source VARCHAR(100),
    verification_result JSONB,
    
    -- Review decision
    reviewer_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    decision VARCHAR(50),
    decision_reason TEXT,
    decision_category VARCHAR(50),
    
    -- Consent
    terms_version VARCHAR(20) NOT NULL,
    consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1,
    
    CONSTRAINT valid_status_transition CHECK (
        status IN ('PENDING_REGISTRATION', 'PENDING_VERIFICATION', 'PENDING_EXTERNAL_VERIFICATION', 
                  'APPROVED', 'ACTIVE', 'MORE_INFORMATION_REQUIRED', 'REJECTED', 'SUSPENDED')
    )
);

CREATE INDEX idx_landlord_applications_subject_id ON landlord_applications(subject_id);
CREATE INDEX idx_landlord_applications_status ON landlord_applications(status);
CREATE INDEX idx_landlord_applications_reference ON landlord_applications(application_reference);

-- Resubmission history (preserve historical decisions)
CREATE TABLE landlord_application_resubmissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES landlord_applications(id) ON DELETE CASCADE,
    
    previous_status landlord_application_status NOT NULL,
    previous_decision VARCHAR(50),
    previous_decision_reason TEXT,
    previous_decision_category VARCHAR(50),
    previous_reviewer_id UUID REFERENCES identity_subjects(id) ON DELETE SET NULL,
    previous_reviewed_at TIMESTAMP WITH TIME ZONE,
    
    resubmitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    resubmission_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_landlord_resubmissions_application_id ON landlord_application_resubmissions(application_id);

-- Password reset tokens (hashed, expiring, single-use)
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- bcrypt hash of the actual token
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    consumed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_reset_token CHECK (
        token_hash IS NOT NULL AND
        expires_at > created_at
    )
);

CREATE INDEX idx_password_reset_tokens_subject_id ON password_reset_tokens(subject_id);
CREATE INDEX idx_password_reset_tokens_hash ON password_reset_tokens(token_hash);
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Email verification tokens (hashed, expiring, single-use)
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES identity_subjects(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- bcrypt hash of the actual token
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    consumed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_verification_token CHECK (
        token_hash IS NOT NULL AND
        expires_at > created_at
    )
);

CREATE INDEX idx_email_verification_tokens_subject_id ON email_verification_tokens(subject_id);
CREATE INDEX idx_email_verification_tokens_hash ON email_verification_tokens(token_hash);
CREATE INDEX idx_email_verification_tokens_expires_at ON email_verification_tokens(expires_at);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_landlord_applications_updated_at
    BEFORE UPDATE ON landlord_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
