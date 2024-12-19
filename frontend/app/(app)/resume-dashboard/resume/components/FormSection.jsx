'use client'
import React, { useState } from 'react'
import { Button } from '@/resume_components/ui_two/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import PersonalDetail from './forms/PersonalDetail'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ThemeColor from './ThemeColor'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(true)
  const router = useRouter()
  const params = useParams()
  const { resumeId } = params // Access the dynamic route parameter

  // Handle navigation on "Next" button click
  const handleNextClick = () => {
    if (activeFormIndex < 5) {
      setActiveFormIndex(activeFormIndex + 1)
    } else {
      router.push(`/my-resume/${resumeId}/view`) // Navigate to the view page when index is 6
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href="/resume-dashboard">
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={handleNextClick}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Form Content */}
      {activeFormIndex === 1 && (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 2 && (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 3 && <Experience />}
      {activeFormIndex === 4 && <Education />}
      {activeFormIndex === 5 && <Skills />}
    </div>
  )
}

export default FormSection
