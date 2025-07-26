// Path: /app/api/buyer/profile/route.ts
// API route for buyer profile operations

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch the buyer profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .eq('role', 'buyer')
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error fetching buyer profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the request body
    const body = await request.json()
    
    // Update the buyer profile
    const { data: profile, error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: body.full_name,
        phone: body.phone,
        country: body.country,
        property_budget: body.property_budget,
        property_location: body.property_location,
        property_type: body.property_type,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .eq('role', 'buyer')
      .select()
      .single()

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 400 }
      )
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error updating buyer profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
