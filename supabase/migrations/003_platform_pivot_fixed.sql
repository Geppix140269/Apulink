-- Path: supabase/migrations/003_platform_pivot_fixed.sql
-- Fixed migration for platform pivot - handles existing tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types if they don't exist
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('buyer', 'professional', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE project_status AS ENUM ('planning', 'searching', 'negotiating', 'closing', 'renovating', 'complete');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE document_category AS ENUM ('visura', 'planimetria', 'contracts', 'permits', 'invoices', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE team_member_status AS ENUM ('active', 'pending', 'removed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'canceled', 'none');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Check if buyer_profiles exists, if not create it
CREATE TABLE IF NOT EXISTS buyer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  nationality VARCHAR(100),
  property_goals TEXT,
  budget_range VARCHAR(50),
  timeline VARCHAR(50),
  preferred_regions TEXT[],
  languages_spoken TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add user_id to buyer_profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'buyer_profiles' 
                AND column_name = 'user_id') THEN
    ALTER TABLE buyer_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
END $$;

-- Update professionals table with new fields (check if columns exist first)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'professionals' 
                AND column_name = 'user_id') THEN
    ALTER TABLE professionals ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'professionals' 
                AND column_name = 'subscription_status') THEN
    ALTER TABLE professionals ADD COLUMN subscription_status subscription_status DEFAULT 'none';
  END IF;
  
  -- Add other columns similarly
  ALTER TABLE professionals 
    ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(50),
    ADD COLUMN IF NOT EXISTS subscription_started_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS profile_views INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS total_projects INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS completed_projects INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2),
    ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255),
    ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255);
END $$;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  buyer_id UUID NOT NULL REFERENCES buyer_profiles(id) ON DELETE CASCADE,
  status project_status DEFAULT 'planning',
  property_type VARCHAR(50),
  target_budget DECIMAL(12, 2),
  target_location VARCHAR(255),
  target_completion_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  notes TEXT
);

-- Project team members
CREATE TABLE IF NOT EXISTS project_team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  role VARCHAR(100) NOT NULL,
  status team_member_status DEFAULT 'pending',
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  permissions JSONB DEFAULT '{"view": true, "edit": false, "admin": false}'::jsonb,
  UNIQUE(project_id, professional_id)
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  category document_category DEFAULT 'other',
  description TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  is_public BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Document permissions
CREATE TABLE IF NOT EXISTS document_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  team_member_id UUID REFERENCES project_team(id),
  can_view BOOLEAN DEFAULT true,
  can_download BOOLEAN DEFAULT true,
  can_delete BOOLEAN DEFAULT false,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID REFERENCES auth.users(id),
  CONSTRAINT unique_doc_user UNIQUE(document_id, user_id),
  CONSTRAINT unique_doc_team UNIQUE(document_id, team_member_id)
);

-- Budget items
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  budgeted_amount DECIMAL(12, 2) DEFAULT 0,
  spent_amount DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project milestones
CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),
  order_index INTEGER DEFAULT 0,
  is_critical BOOLEAN DEFAULT false
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  action_url TEXT
);

-- Messages/Comments
CREATE TABLE IF NOT EXISTS project_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  message TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT false
);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance (IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_projects_buyer_id ON projects(buyer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_team_project_id ON project_team(project_id);
CREATE INDEX IF NOT EXISTS idx_project_team_professional_id ON project_team(professional_id);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_budget_items_project_id ON budget_items(project_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read_at);
CREATE INDEX IF NOT EXISTS idx_project_messages_project_id ON project_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_project_id ON activity_log(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DO $$ 
BEGIN
  -- Projects policies
  DROP POLICY IF EXISTS "Buyers can view their own projects" ON projects;
  DROP POLICY IF EXISTS "Buyers can create projects" ON projects;
  DROP POLICY IF EXISTS "Buyers can update their own projects" ON projects;
  DROP POLICY IF EXISTS "Team members can view projects" ON projects;
  
  -- Project team policies
  DROP POLICY IF EXISTS "Project members can view team" ON project_team;
  
  -- Documents policies
  DROP POLICY IF EXISTS "Project members can view documents" ON documents;
  DROP POLICY IF EXISTS "Authorized users can upload documents" ON documents;
  
  -- Notifications policies
  DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
END $$;

-- Projects policies
CREATE POLICY "Buyers can view their own projects" ON projects
  FOR SELECT USING (
    buyer_id IN (
      SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Buyers can create projects" ON projects
  FOR INSERT WITH CHECK (
    buyer_id IN (
      SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Buyers can update their own projects" ON projects
  FOR UPDATE USING (
    buyer_id IN (
      SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view projects" ON projects
  FOR SELECT USING (
    id IN (
      SELECT project_id FROM project_team 
      WHERE professional_id IN (
        SELECT id FROM professionals WHERE user_id = auth.uid()
      ) AND status = 'active'
    )
  );

-- Project team policies
CREATE POLICY "Project members can view team" ON project_team
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE buyer_id IN (
        SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
      )
    ) OR professional_id IN (
      SELECT id FROM professionals WHERE user_id = auth.uid()
    )
  );

-- Documents policies
CREATE POLICY "Project members can view documents" ON documents
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE buyer_id IN (
        SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
      )
    ) OR project_id IN (
      SELECT project_id FROM project_team 
      WHERE professional_id IN (
        SELECT id FROM professionals WHERE user_id = auth.uid()
      ) AND status = 'active'
    )
  );

CREATE POLICY "Authorized users can upload documents" ON documents
  FOR INSERT WITH CHECK (
    uploaded_by = auth.uid() AND (
      project_id IN (
        SELECT id FROM projects WHERE buyer_id IN (
          SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
        )
      ) OR project_id IN (
        SELECT project_id FROM project_team 
        WHERE professional_id IN (
          SELECT id FROM professionals WHERE user_id = auth.uid()
        ) AND status = 'active'
      )
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR ALL USING (user_id = auth.uid());

-- Budget policies
CREATE POLICY "Project members can view budgets" ON budget_items
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE buyer_id IN (
        SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
      )
    ) OR project_id IN (
      SELECT project_id FROM project_team 
      WHERE professional_id IN (
        SELECT id FROM professionals WHERE user_id = auth.uid()
      ) AND status = 'active'
    )
  );

-- Milestone policies
CREATE POLICY "Project members can view milestones" ON project_milestones
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE buyer_id IN (
        SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
      )
    ) OR project_id IN (
      SELECT project_id FROM project_team 
      WHERE professional_id IN (
        SELECT id FROM professionals WHERE user_id = auth.uid()
      ) AND status = 'active'
    )
  );

-- Messages policies
CREATE POLICY "Project members can view messages" ON project_messages
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE buyer_id IN (
        SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
      )
    ) OR project_id IN (
      SELECT project_id FROM project_team 
      WHERE professional_id IN (
        SELECT id FROM professionals WHERE user_id = auth.uid()
      ) AND status = 'active'
    )
  );

-- Activity log policies
CREATE POLICY "Project members can view activity" ON activity_log
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE buyer_id IN (
        SELECT id FROM buyer_profiles WHERE user_id = auth.uid()
      )
    ) OR project_id IN (
      SELECT project_id FROM project_team 
      WHERE professional_id IN (
        SELECT id FROM professionals WHERE user_id = auth.uid()
      ) AND status = 'active'
    )
  );

-- Functions for common operations
CREATE OR REPLACE FUNCTION create_project_with_setup(
  p_name VARCHAR,
  p_buyer_id UUID,
  p_property_type VARCHAR,
  p_target_budget DECIMAL,
  p_target_location VARCHAR,
  p_target_date DATE
) RETURNS UUID AS $$
DECLARE
  v_project_id UUID;
BEGIN
  -- Create project
  INSERT INTO projects (
    name, buyer_id, property_type, target_budget, 
    target_location, target_completion_date
  ) VALUES (
    p_name, p_buyer_id, p_property_type, p_target_budget,
    p_target_location, p_target_date
  ) RETURNING id INTO v_project_id;
  
  -- Create default budget categories (with NULL safety)
  INSERT INTO budget_items (project_id, category, budgeted_amount) VALUES
    (v_project_id, 'Property Purchase', COALESCE(p_target_budget * 0.75, 0)),
    (v_project_id, 'Notary & Legal Fees', COALESCE(p_target_budget * 0.03, 0)),
    (v_project_id, 'Professional Services', COALESCE(p_target_budget * 0.05, 0)),
    (v_project_id, 'Renovation', COALESCE(p_target_budget * 0.15, 0)),
    (v_project_id, 'Contingency', COALESCE(p_target_budget * 0.02, 0));
  
  -- Create default milestones
  INSERT INTO project_milestones (project_id, title, order_index) VALUES
    (v_project_id, 'Property Search', 1),
    (v_project_id, 'Property Selection', 2),
    (v_project_id, 'Due Diligence', 3),
    (v_project_id, 'Purchase Agreement', 4),
    (v_project_id, 'Closing', 5),
    (v_project_id, 'Post-Purchase Setup', 6);
  
  -- Log activity
  INSERT INTO activity_log (project_id, user_id, action, entity_type, entity_id)
  VALUES (v_project_id, auth.uid(), 'project_created', 'project', v_project_id);
  
  RETURN v_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to invite professional to project
CREATE OR REPLACE FUNCTION invite_professional_to_project(
  p_project_id UUID,
  p_professional_id UUID,
  p_role VARCHAR
) RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user owns the project
  IF NOT EXISTS (
    SELECT 1 FROM projects p
    JOIN buyer_profiles bp ON p.buyer_id = bp.id
    WHERE p.id = p_project_id AND bp.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Add professional to team
  INSERT INTO project_team (project_id, professional_id, role)
  VALUES (p_project_id, p_professional_id, p_role)
  ON CONFLICT (project_id, professional_id) DO NOTHING;
  
  -- Create notification for professional
  INSERT INTO notifications (user_id, type, title, message, data)
  SELECT 
    user_id,
    'project_invitation',
    'New Project Invitation',
    'You have been invited to join a project',
    jsonb_build_object('project_id', p_project_id, 'role', p_role)
  FROM professionals
  WHERE id = p_professional_id;
  
  -- Log activity
  INSERT INTO activity_log (project_id, user_id, action, entity_type, entity_id)
  VALUES (p_project_id, auth.uid(), 'professional_invited', 'professional', p_professional_id);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
