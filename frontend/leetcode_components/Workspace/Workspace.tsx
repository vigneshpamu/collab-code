// @ts-nocheck
'use client'
import { useState } from 'react'
import Split from '@uiw/react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription'
import Playground from './Playground/Playground'
import { Problem } from '@/utils/types/problem'
import Confetti from 'react-confetti'
import useWindowSize from '../../_leetcode_things/hooks/useWindowSize'

type WorkspaceProps = {
  problem: Problem
}

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize()
  const [success, setSuccess] = useState(false)
  const [solved, setSolved] = useState(false)

  // console.log('Problem _Inblioce', problem)

  if (!problem) return null
  return (
    <Split
      style={{ display: 'flex', height: '100%' }} // Ensure the height is 100% for proper layout
      minSize={0}
      snapOffset={30} // Optional: adjust based on preference
    >
      <ProblemDescription problem={problem} _solved={solved} />
      <div className="bg-dark-fill-2" style={{ flex: 1 }}>
        {problem?.id && (
          <Playground
            problem={problem}
            setSuccess={setSuccess}
            setSolved={setSolved}
          />
        )}
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  )
}

export default Workspace
