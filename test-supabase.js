const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

console.log('Testing Supabase connection...');
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Has Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connection successful!');
  }
});
