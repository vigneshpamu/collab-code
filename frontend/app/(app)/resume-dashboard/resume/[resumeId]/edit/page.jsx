'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' // Use Next.js useRouter for dynamic routes
import ResumePreview from '../../components/ResumePreview'
import { ResumeInfoContext } from '../../../../../../context/ResumeInfoContext'
import FormSection from '../../components/FormSection'
import { useParams } from 'next/navigation'

function EditResume() {
  const router = useRouter()
  const params = useParams()

  const { resumeId } = params // Access the dynamic route parameter
  const [resumeInfo, setResumeInfo] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state
  const [error, setError] = useState(null) // Add error state

  useEffect(() => {
    if (resumeId) {
      GetResumeInfo() // Fetch data only when resumeId is available
    }
  }, [resumeId])

  const GetResumeInfo = async () => {
    try {
      setLoading(true)
      setError(null)
      const resp = await fetch(`/api/get-resume-by-id?resumeId=${resumeId}`)
      const data = await resp.json()

      if (resp.ok) {
        setResumeInfo(data.data.data)
      } else {
        setError(data.error || 'Failed to load resume data.')
      }
    } catch (err) {
      setError('Failed to load resume data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div> // You can replace this with a spinner component or custom loader
  }

  if (error) {
    return <div>{error}</div> // Show error message if the API call fails
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
