import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skill
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skill.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <progress
              className="h-2 w-[120px]"
              value={skill?.rating * 20}
              max="100"
              style={{
                border: `4px solid ${resumeInfo?.themeColor}`,
                backgroundColor: '#f0f0f0',
              }}
            ></progress>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview
