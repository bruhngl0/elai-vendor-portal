import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const applicationId = searchParams.get('applicationId')

    if (applicationId) {
      // Get specific application status
      const application = await prisma.kYCApplication.findUnique({
        where: { id: applicationId },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        }
      })

      if (!application) {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        id: application.id,
        status: application.status.toLowerCase(),
        businessName: application.businessName,
        submittedAt: application.submittedAt,
        reviewedAt: application.reviewedAt,
        rejectionReason: application.rejectionReason,
        reviewerNotes: application.reviewerNotes,
      })
    }

    if (userId) {
      // Get all applications for a user
      const applications = await prisma.kYCApplication.findMany({
        where: { userId },
        orderBy: { submittedAt: 'desc' },
        select: {
          id: true,
          status: true,
          businessName: true,
          submittedAt: true,
          reviewedAt: true,
          rejectionReason: true,
        }
      })

      return NextResponse.json({
        applications: applications.map(app => ({
          id: app.id,
          status: app.status.toLowerCase(),
          businessName: app.businessName,
          submittedAt: app.submittedAt,
          reviewedAt: app.reviewedAt,
          rejectionReason: app.rejectionReason,
        }))
      })
    }

    return NextResponse.json(
      { error: 'userId or applicationId is required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error fetching KYC status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    )
  }
}