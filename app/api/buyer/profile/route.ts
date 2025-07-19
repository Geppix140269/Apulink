// File: app/api/buyer/profile/route.ts

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Type definitions for the buyer profile
interface BuyerProfileData {
  fullName: string
  email: string
  phone: string
  nationality: string
  currentCountry: string
  buyerType: string
  timeline: string
  budget: string
  financingNeeded: boolean
  propertyTypes: string[]
  regions: string[]
  mustHaves: string[]
  servicesNeeded: string[]
  languagesSpoken: string[]
  specificRequirements: string
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: BuyerProfileData = await request.json()
    
    // Validate required fields
    if (!body.email || !body.fullName || !body.nationality || !body.currentCountry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Map frontend field names to database column names
    const buyerProfile = {
      email: body.email,
      full_name: body.fullName,
      phone: body.phone || null,
      nationality: body.nationality,
      current_country: body.currentCountry,
      buyer_type: body.buyerType,
      timeline: body.timeline,
      budget_range: body.budget,
      financing_needed: body.financingNeeded || false,
      property_types: body.propertyTypes || [],
      regions: body.regions || [],
      must_haves: body.mustHaves || [],
      services_needed: body.servicesNeeded || [],
      languages_spoken: body.languagesSpoken || [],
      specific_requirements: body.specificRequirements || null,
      source: 'website',
      utm_campaign: request.headers.get('utm_campaign') || null,
      utm_medium: request.headers.get('utm_medium') || null,
      utm_source: request.headers.get('utm_source') || null
    }

    // Insert buyer profile
    const { data: profile, error: profileError } = await supabase
      .from('buyer_profiles')
      .insert(buyerProfile)
      .select()
      .single()

    if (profileError) {
      console.error('Profile creation error:', profileError)
      
      // Check if email already exists
      if (profileError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered. Please use a different email or login.' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 500 }
      )
    }

    // Get matching professionals
    const { data: matches, error: matchError } = await supabase
      .rpc('match_buyer_to_professionals', { buyer_id: profile.id })

    if (matchError) {
      console.error('Matching error:', matchError)
    }

    // Send confirmation email to buyer
    try {
      await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: body.email,
        subject: 'Welcome to Apulink - We\'re Finding Your Perfect Matches',
        html: `
          <h2>Hello ${body.fullName},</h2>
          <p>Thank you for starting your Italian property journey with Apulink!</p>
          
          <p>We've received your profile and are now matching you with the best professionals for your needs:</p>
          
          <h3>Your Requirements:</h3>
          <ul>
            <li><strong>Property Goal:</strong> ${body.buyerType}</li>
            <li><strong>Timeline:</strong> ${formatTimeline(body.timeline)}</li>
            <li><strong>Budget:</strong> ${formatBudget(body.budget)}</li>
            <li><strong>Services Needed:</strong> ${body.servicesNeeded.join(', ')}</li>
            <li><strong>Preferred Regions:</strong> ${body.regions.join(', ')}</li>
          </ul>
          
          <h3>What happens next?</h3>
          <ol>
            <li>We're analyzing your requirements and matching you with qualified professionals</li>
            <li>Within 24 hours, you'll receive profiles of up to 3 matched professionals</li>
            <li>Each professional will provide a personalized quote for your project</li>
            <li>You can then choose who to work with based on their expertise and approach</li>
          </ol>
          
          <p>In the meantime, you might find these resources helpful:</p>
          <ul>
            <li><a href="https://apulink.com/tax-benefits">Guide to Apulia's 7% Tax Benefits</a></li>
            <li><a href="https://apulink.com/regions">Discover Apulia's Regions</a></li>
            <li><a href="https://apulink.com/grants">EU Grants for Property Renovation</a></li>
          </ul>
          
          <p>If you have any questions, simply reply to this email and we'll be happy to help!</p>
          
          <p>Best regards,<br>The Apulink Team</p>
        `
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails
    }

    // Send notification to admin
    try {
      await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Buyer Profile: ${body.fullName} - ${formatBudget(body.budget)}`,
        html: `
          <h2>New Buyer Profile Created</h2>
          
          <h3>Buyer Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${body.fullName}</li>
            <li><strong>Email:</strong> ${body.email}</li>
            <li><strong>Phone:</strong> ${body.phone || 'Not provided'}</li>
            <li><strong>Nationality:</strong> ${body.nationality}</li>
            <li><strong>Currently in:</strong> ${body.currentCountry}</li>
          </ul>
          
          <h3>Property Requirements:</h3>
          <ul>
            <li><strong>Goal:</strong> ${body.buyerType}</li>
            <li><strong>Timeline:</strong> ${formatTimeline(body.timeline)}</li>
            <li><strong>Budget:</strong> ${formatBudget(body.budget)}</li>
            <li><strong>Financing Needed:</strong> ${body.financingNeeded ? 'Yes' : 'No'}</li>
            <li><strong>Property Types:</strong> ${body.propertyTypes.join(', ')}</li>
            <li><strong>Regions:</strong> ${body.regions.join(', ')}</li>
          </ul>
          
          <h3>Services Needed:</h3>
          <p>${body.servicesNeeded.join(', ')}</p>
          
          <h3>Languages:</h3>
          <p>${body.languagesSpoken.join(', ')}</p>
          
          ${body.specificRequirements ? `
            <h3>Specific Requirements:</h3>
            <p>${body.specificRequirements}</p>
          ` : ''}
          
          <h3>Matched Professionals:</h3>
          <p>${matches?.length || 0} professionals matched</p>
          
          <p><a href="https://apulink.com/admin/buyers/${profile.id}">View in Dashboard</a></p>
        `
      })
    } catch (adminEmailError) {
      console.error('Admin email error:', adminEmailError)
    }

    // Return success response
    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name
      },
      matches: matches?.length || 0,
      message: 'Profile created successfully! We\'ll email you with matched professionals within 24 hours.'
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Helper functions
function formatTimeline(timeline: string): string {
  const timelineMap: { [key: string]: string } = {
    'immediate': 'Ready to buy now',
    '3months': 'Within 3 months',
    '6months': 'Within 6 months',
    '1year': 'Within 1 year',
    'exploring': 'Just exploring'
  }
  return timelineMap[timeline] || timeline
}

function formatBudget(budget: string): string {
  const budgetMap: { [key: string]: string } = {
    'under100k': 'Under €100,000',
    '100-250k': '€100,000 - €250,000',
    '250-500k': '€250,000 - €500,000',
    '500k-1m': '€500,000 - €1,000,000',
    'over1m': 'Over €1,000,000'
  }
  return budgetMap[budget] || budget
}
