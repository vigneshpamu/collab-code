'use client'
import Header from '@/resume_components/custom/Header'
import { Button } from '@/resume_components/ui_two/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useEffect, useRef, useState } from 'react'
import { RWebShare } from 'react-web-share'
import ResumePreview from '../../../resume-dashboard/resume/components/ResumePreview'
import { useParams, useRouter } from 'next/navigation'
function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const params = useParams()
  const { resumeId } = params

  useEffect(() => {
    GetResumeInfo()
  }, [])
  const GetResumeInfo = async () => {
    try {
      const resp = await fetch(`/api/get-resume-by-id?resumeId=${resumeId}`)
      const data = await resp.json()

      if (resp.ok) {
        setResumeInfo(data.data.data)
      }
    } catch (err) {
    } finally {
    }
  }
  const divRef = useRef()

  const HandleDownload = () => {
    // Get the print and no-print areas
    const printArea = document.getElementById('print-area')
    const noPrintArea = document.getElementById('no-print')

    // Save the current body margin and padding values for restoration later
    const originalBodyMargin = document.body.style.margin
    const originalBodyPadding = document.body.style.padding
    const originalNoPrintDisplay = noPrintArea ? noPrintArea.style.display : ''

    // Hide other areas that should not be printed
    if (noPrintArea) noPrintArea.style.display = 'none'

    // Temporarily apply print-specific styles
    document.body.style.margin = '0'
    document.body.style.padding = '0'

    // Remove margins and padding for print-area and all other elements
    printArea.style.margin = '0'
    printArea.style.padding = '0'

    // Apply page-specific print styles
    const printStyles = document.createElement('style')
    printStyles.innerHTML = `
    @media print {
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #print-area {
        margin: 0 !important;
        padding: 0 !important;
        width: 100%;
        height:auto;
        page-break-inside: avoid;
      }



      * {
      }

      @page {
        margin: -40px -40px 0px -40px !important;
      
        // padding: -15px !important;
      }
    }
  `
    document.head.appendChild(printStyles)

    // Trigger the print dialog
    window.print()

    // Restore the original styles after printing
    document.body.style.margin = originalBodyMargin
    document.body.style.padding = originalBodyPadding
    if (noPrintArea) noPrintArea.style.display = originalNoPrintDisplay

    // Clean up the added print styles
    document.head.removeChild(printStyles)
  }

  // const HandleDownload = async () => {
  //   const element = divRef.current

  //   // Capture the content of the div as a canvas
  //   const canvas = await html2canvas(element, {
  //     scale: 2, // Higher scale for better resolution
  //   })

  //   const imgData = canvas.toDataURL('image/png')

  //   // Create a PDF with A4 dimensions
  //   const pdf = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'mm',
  //     format: 'a4', // A4 size
  //   })

  //   const pdfWidth = 210 // A4 width in mm
  //   const pdfHeight = 297 // A4 height in mm

  //   const imgWidth = pdfWidth
  //   const imgHeight = (canvas.height * pdfWidth) / canvas.width

  //   // Add image to the PDF
  //   pdf.addImage(imgData, 'PDF', 0, 0, imgWidth, imgHeight)

  //   // Save the PDF with a specific name
  //   pdf.save('resume.pdf')
  // }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        {/* <Header /> */}

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume is ready !{' '}
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family{' '}
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            {/* <RWebShare
              data={{
                text: 'Hello Everyone, This is my resume please open url to see it',
                url:
                  process.env.VITE_BASE_URL +
                  '/my-resume/' +
                  resumeId +
                  '/view',
                title:
                  resumeInfo?.firstName +
                  ' ' +
                  resumeInfo?.lastName +
                  ' resume',
              }}
              onClick={() => console.log('shared successfully!')}
            >
              {' '}
              <Button>Share</Button>
            </RWebShare> */}
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div
          ref={divRef}
          style={{
            // width: '750px', // Match A4 width
            // height: '297mm', // Match A4 height
            // padding: '20px',
            // border: '1px solid black',
            // margin: '0px auto',
            background: 'white',
          }}
          id="print-area"
        >
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
