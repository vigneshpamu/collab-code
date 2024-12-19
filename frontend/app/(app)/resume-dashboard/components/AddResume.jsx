'use client'
import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/resume_components/ui_two/dialog'
import { Button } from '@/resume_components/ui_two/button'
import { Input } from '@/resume_components/ui_two/input'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
// import { useNavigate } from 'react-router-dom'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onCreate = async () => {
    setLoading(true)
    const data = {
      data: {
        title: resumeTitle,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    }

    try {
      // Call Next.js API to create a new resume
      const response = await fetch('/api/create-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setLoading(false)
        router.push('/resume-dashboard/resume/' + result.documentId + '/edit')
      } else {
        throw new Error(result.error || 'Failed to create resume')
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <div>
      <div
        className="p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume
