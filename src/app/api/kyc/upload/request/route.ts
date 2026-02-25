import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadRequestSchema } from '@/lib/validations'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = uploadRequestSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { fileName, fileType, email } = validationResult.data

    let userId: string
    const session = await auth()
    if (session?.user?.id) {
      userId = session.user.id
    } else if (email) {
      let user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        user = await prisma.user.create({ data: { email } })
      }
      userId = user.id
    } else {
      return NextResponse.json({ error: "Email is required for upload" }, { status: 400 })
    }

    // Generate unique file key scoped to user
    const fileKey = `kyc-documents/${userId}/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    // Create pre-signed URL for upload
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileKey,
      ContentType: fileType,
    })

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    return NextResponse.json({
      uploadUrl: signedUrl,
      fileKey: fileKey,
    })
  } catch (error) {
    console.error('Error generating pre-signed URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}