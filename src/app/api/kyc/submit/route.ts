import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { kycFormSchema } from '@/lib/validations'
import { encrypt } from '@/lib/encryption'
import { emailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = kycFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid submission data', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Find or create user by email (no auth required)
    let user = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (!user) {
      user = await prisma.user.create({
        data: { email: data.email }
      })
    }

    // Encrypt sensitive tax ID
    // We DO NOT encrypt the database fields yet because the schema field is String, 
    // and we might want to search (though usually not on tax id). 
    // Ideally we should have a separate encrypted field or use a dedicated vault.
    // Given the task, I will encrypt it before saving to the `taxIdNumber` field 
    // assuming the schema allows strict text (it does).
    // Note: The schema field name is `taxIdNumber`. 
    const encryptedTaxId = encrypt(data.taxIdNumber)


    // Create KYC application
    const kycApplication = await prisma.kYCApplication.create({
      data: {
        userId: user.id,
        businessName: data.businessName,
        taxIdNumber: encryptedTaxId, // Storing encrypted
        businessAddress: data.businessAddress,

        // S3 Keys from the frontend upload
        businessLicenseKey: data.businessLicenseKey,
        taxIdDocumentKey: data.taxIdDocumentKey,
        governmentIdKey: data.governmentIdKey,

        status: 'PENDING',
        submittedAt: new Date(),
      }
    })

    // Add to review history
    await prisma.kYCReviewHistory.create({
      data: {
        applicationId: kycApplication.id,
        reviewerId: 'system',
        action: 'submitted',
        notes: 'Application submitted via secure web form',
      }
    })

    // Send email
    try {
      await emailService.sendApplicationSubmitted(user.email, kycApplication.businessName, kycApplication.id);
    } catch (emailError) {
      console.error("Failed to send confirmation email", emailError);
      // Do not fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      applicationId: kycApplication.id,
      status: kycApplication.status,
    })

  } catch (error) {
    console.error('Error submitting KYC application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}