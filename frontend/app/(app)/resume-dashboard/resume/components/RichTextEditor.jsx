import { Button } from '@/resume_components/ui_two/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../../service/AIModal'
import { toast } from 'sonner'

const PROMPT =
  'Position title: {positionTitle}. Based on this position title, provide 5-7 bullet points describing relevant experience in plain JSON format. Make sure the array of points must be inside "bulletPoints" named key'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue)
  const { resumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title')
      return
    }

    setLoading(true)
    const prompt = PROMPT.replace(
      '{positionTitle}',
      resumeInfo.experience[index].title
    )

    try {
      const result = await AIChatSession.sendMessage(prompt)
      const responseText = await result.response.text()

      // Parse the response only once
      const bulletPointsJson = JSON.parse(responseText).bulletPoints

      if (!bulletPointsJson) {
        throw new Error('Bullet points JSON not found in the response')
      }

      if (Array.isArray(bulletPointsJson)) {
        // Convert bullet points to HTML format
        const htmlContent = bulletPointsJson
          .map((point) => `<li>${point}</li>`)
          .join('')

        setValue(`<ul>${htmlContent}</ul>`)
      } else {
        throw new Error('Invalid bullet points format')
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      toast('Failed to generate summaries. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onRichTextEditorChange(e)
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
