// @ts-nocheck
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { resumeId: string } }
) {
  const resumeId = params.resumeId
  const data = await req.json() // Get the updated data from the request body

  // Check if data is provided
  if (!data || !data.data) {
    return NextResponse.json({ error: 'No data provided' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/user-resumes/${resumeId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_STRAPI_API_KEY}`,
        },
        body: JSON.stringify(data),
      }
    )

    const updatedResume = await response.json()

    if (!updatedResume) {
      return NextResponse.json(
        { error: 'Failed to update resume' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: updatedResume }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
