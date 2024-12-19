import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/resume_components/ui_two/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/resume_components/ui_two/alert-dialog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function ResumeCardItem({ resume, refreshData }) {
  const router = useRouter()
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/resumes/${resume.documentId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to delete resume.')
      } else {
        toast('Resume Deleted!')
        refreshData()
      }
    } catch (error) {
      toast.error('An error occurred while deleting the resume.')
    } finally {
      setLoading(false)
      setOpenAlert(false)
    }
  }

  return (
    <div className="">
      <Link href={'/resume-dashboard/resume/' + resume.documentId + '/edit'}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4"
          style={{
            borderColor: resume?.themeColor,
          }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  '/resume-dashboard/resume/' + resume.documentId + '/edit'
                )
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push('/my-resume/' + resume.documentId + '/view')
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push('/my-resume/' + resume.documentId + '/view')
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ResumeCardItem
