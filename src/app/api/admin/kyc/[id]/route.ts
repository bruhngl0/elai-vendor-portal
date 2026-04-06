import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const { data: application } = await supabase
      .from('KYCApplication')
      .select(`
        *,
        user:users ( firstName, lastName, email ),
        reviewHistory:KYCReviewHistory (
          *,
          reviewer:AdminUser (
            user:users ( firstName, lastName )
          )
        )
      `)
      .eq('id', params.id)
      .maybeSingle()

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const { action, notes, reviewerId } = await request.json()

    if (!action || !reviewerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Update application based on action
    const updateData: any = {
      updatedAt: new Date(),
    }

    let newStatus = ''

    switch (action) {
      case 'approve':
        newStatus = 'APPROVED'
        updateData.status = newStatus
        updateData.reviewedBy = reviewerId
        updateData.reviewedAt = new Date()
        break
      case 'reject':
        newStatus = 'REJECTED'
        updateData.status = newStatus
        updateData.reviewedBy = reviewerId
        updateData.reviewedAt = new Date()
        if (notes) {
          updateData.rejectionReason = notes
        }
        break
      case 'request_info':
        newStatus = 'NEEDS_INFO'
        updateData.status = newStatus
        updateData.reviewedBy = reviewerId
        updateData.reviewedAt = new Date()
        if (notes) {
          updateData.reviewerNotes = notes
        }
        break
      case 'assign':
        // Just assign to reviewer without changing status
        updateData.reviewedBy = reviewerId
        break
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update application
    const { data: updatedApplication } = await supabase
      .from('KYCApplication')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    // Add to review history
    await supabase.from('KYCReviewHistory').insert({
      applicationId: params.id,
      reviewerId,
      action: action.replace('_', ' ').toUpperCase(),
      notes: notes || null,
    })

    return NextResponse.json({
      success: true,
      application: updatedApplication,
      newStatus
    })

  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}