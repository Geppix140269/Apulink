// Path: /app/api/professional/profile/route.ts
// API route for professional profile operations

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

    // Fetch the professional profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .eq('role', 'professional')
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error fetching professional profile:', error)
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
    
    // Update the professional profile
    const { data: profile, error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: body.full_name,
        company_name: body.company_name,
        phone: body.phone,
        profession: body.profession,
        specializations: body.specializations,
        languages: body.languages,
        service_areas: body.service_areas,
        bio: body.bio,
        years_experience: body.years_experience,
        certifications: body.certifications,
        hourly_rate: body.hourly_rate,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .eq('role', 'professional')
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
    console.error('Error updating professional profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
