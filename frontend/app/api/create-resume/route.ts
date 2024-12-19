// @ts-nocheck
// app/api/create-resume/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json()
    const { title, userEmail, userName } = body.data

    // Check if the required fields are provided
    if (!title || !userEmail || !userName) {
      return NextResponse.json(
        { error: 'Title, userEmail, and userName are required' },
        { status: 400 }
      )
    }

    // Generate UUID for the new resume
    const { v4: uuidv4 } = require('uuid')
    const resumeId = uuidv4()

    const data = {
      title,
      resumeId,
      userEmail,
      userName,
    }

    console.log(`Creating new resume for ${userEmail} with title ${title}`)

    // Assuming you are using Strapi as the backend for creating the resume
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/user-resumes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_STRAPI_API_KEY}`,
        },
        body: JSON.stringify({ data }),
      }
    )

    const result = await response.json()
    console.log('Response from backend:', result)

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create resume', details: result },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { documentId: result.data.documentId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    )
  }
}
