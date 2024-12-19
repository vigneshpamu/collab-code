// @ts-nocheck
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { resumeId: string } }
) {
  const resumeId = params.resumeId

  if (!resumeId) {
    return NextResponse.json(
      { error: 'Resume ID not provided' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/user-resumes/${resumeId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_STRAPI_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to delete resume' },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { message: 'Resume deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
