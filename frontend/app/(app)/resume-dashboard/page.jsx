'use client'
import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/nextjs'
import ResumeCardItem from './components/ResumeCardItem'
import axios from 'axios'

function Dashboard() {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    user && GetResumesList()
  }, [user])

  const GetResumesList = async () => {
    try {
      const response = await fetch(
        `/api/get-resume?userEmail=${
          user?.primaryEmailAddress?.emailAddress
            ? user?.primaryEmailAddress?.emailAddress
            : 'vigneshpamu2002@gmail.com'
        }`
      )
      const data = await response.json()
      console.log(data.data.data)
      setResumeList(data.data.data)
    } catch (error) {
      console.error('Error fetching resumes:', error.message)
    }
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div
        className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      "
      >
        <AddResume />
        {resumeList?.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default Dashboard
