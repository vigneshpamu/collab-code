import { Button } from '@/resume_components/ui_two/button'
import { Textarea } from '@/resume_components/ui_two/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../../service/AIModal'
import { useParams } from 'next/navigation'

const prompt =
  'Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format'
function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summery, setSummery] = useState()
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState()
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      })
  }, [summery])

  const GenerateSummeryFromAI = async () => {
    try {
      setLoading(true)
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
      console.log(PROMPT)

      const result = await AIChatSession.sendMessage(PROMPT)
      const responseText = await result.response.text()

      console.log('responseText', responseText)

      // Parse and extract summaries
      const parsedResponse = JSON.parse(responseText)
      const summaries = parsedResponse?.summaries

      if (Array.isArray(summaries)) {
        setAiGenerateSummeryList(summaries)
      } else {
        throw new Error('Invalid summaries structure')
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      toast('Failed to generate summaries. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onSave = (e) => {
    e.preventDefault()

    setLoading(true)
    const data = {
      data: {
        summery: summery,
      },
    }
    fetch(`/api/update-resume/${params.resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        enabledNext(true)
        setLoading(false)
        toast('Theme Color Updated')
      })
      .catch((err) => {
        setLoading(false)
        toast.error('Failed to update theme color')
      })
  }
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            defaultValue={summery ? summery : resumeInfo?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summery
