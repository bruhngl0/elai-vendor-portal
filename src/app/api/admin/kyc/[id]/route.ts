import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const application = await prisma.kYCApplication.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        reviewHistory: {
          include: {
            reviewer: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

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
    const updatedApplication = await prisma.kYCApplication.update({
      where: { id: params.id },
      data: updateData,
    })

    // Add to review history
    await prisma.kYCReviewHistory.create({
      data: {
        applicationId: params.id,
        reviewerId,
        action: action.replace('_', ' ').toUpperCase(),
        notes: notes || null,
      }
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