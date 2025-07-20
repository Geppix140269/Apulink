-- Path: supabase/verify_setup.sql
-- Script to verify the database setup after migration

-- Check all tables were created
SELECT 'Tables Created:' as check_type;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'buyer_profiles',
  'professionals',
  'projects',
  'project_team',
  'documents',
  'document_permissions',
  'budget_items',
  'project_milestones',
  'notifications',
  'project_messages',
  'activity_log'
)
ORDER BY table_name;

-- Check enum types
SELECT 'Enum Types Created:' as check_type;
SELECT typname 
FROM pg_type 
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typname IN (
  'user_role',
  'project_status',
  'document_category',
  'team_member_status',
  'subscription_status'
);

-- Check key columns exist
SELECT 'Key Columns in buyer_profiles:' as check_type;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'buyer_profiles' 
AND column_name IN ('id', 'user_id', 'email', 'full_name');

SELECT 'Key Columns in professionals:' as check_type;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'professionals' 
AND column_name IN ('id', 'user_id', 'email', 'subscription_status');

SELECT 'Key Columns in projects:' as check_type;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
AND column_name IN ('id', 'buyer_id', 'status', 'name');

-- Check functions exist
SELECT 'Functions Created:' as check_type;
SELECT proname 
FROM pg_proc 
WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND proname IN ('create_project_with_setup', 'invite_professional_to_project');

-- Check RLS is enabled
SELECT 'RLS Enabled on Tables:' as check_type;
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true
AND tablename IN (
  'projects',
  'project_team',
  'documents',
  'budget_items',
  'notifications'
);
