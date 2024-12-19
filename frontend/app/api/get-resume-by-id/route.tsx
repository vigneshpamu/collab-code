// app/api/get-resume-by-id/route.ts

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)

  // Extract the resume ID from the query params
  const resumeId = url.searchParams.get('resumeId')
  console.log(resumeId)

  if (!resumeId) {
    return NextResponse.json({ error: 'resumeId is required' }, { status: 400 })
  }

  try {
    // Fetch the resume by ID from the Strapi API
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/user-resumes/${resumeId}?populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_STRAPI_API_KEY}`,
        },
      }
    )

    const data = await response.json()
    console.log(data)

    if (!data || !data.data) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
