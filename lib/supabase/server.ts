// Path: lib/supabase/server.ts
// Server-side Supabase client for Next.js App Router

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const createClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

// Alternative implementation if you're not using auth-helpers:
// import { createClient as createSupabaseClient } from '@supabase/supabase-js'
// 
// export const createClient = () => {
//   return createSupabaseClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }
