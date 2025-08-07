'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function TestAuth() {
  const [status, setStatus] = useState('Checking...')
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function check() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          setStatus('Error: ' + error.message)
        } else if (session) {
          setStatus('Logged in as: ' + session.user.email)
        } else {
          setStatus('Not logged in')
        }
      } catch (e) {
        setStatus('Exception: ' + e.message)
      }
    }
    check()
  }, [])

  return (
    <div className='p-8'>
      <h1 className='text-2xl mb-4'>Auth Status</h1>
      <p>{status}</p>
      <a href='/login' className='text-blue-600 underline'>Go to Login</a>
    </div>
  )
}
