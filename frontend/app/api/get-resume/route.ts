// @ts-nocheck
// app/api/get-resume/route.ts

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const userEmail = url.searchParams.get('userEmail')
  console.log(userEmail)

  if (!userEmail) {
    return NextResponse.json(
      { error: 'userEmail is required' },
      { status: 400 }
    )
  }
  console.log(
    `${process.env.VITE_API_BASE_URL}/api/user-resumes?filters[userEmail][$eq]=${userEmail}`
  )
  try {
    // Assuming you are using Strapi as your backend
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/user-resumes?filters[userEmail][$eq]=${userEmail}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_STRAPI_API_KEY}`,
        },
      }
    )

    const data = await response.json()
    console.log(data)

    if (!data || !data.data.length) {
      return NextResponse.json({ error: 'No resumes found' }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
