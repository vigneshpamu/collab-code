'use client'

import React, { useMemo } from 'react'
import Topbar from '@/leetcode_components/Topbar/Topbar'
import Workspace from '@/leetcode_components/Workspace/Workspace'
import useHasMounted from '../../../../_leetcode_things/hooks/useHasMounted'
import { Problem } from '@/utils/types/problem'

type ProblemClientProps = {
  problem: Omit<Problem, 'handlerFunction'> & { handlerFunction: string }
}

const ProblemClient: React.FC<ProblemClientProps> = ({ problem }) => {
  const hasMounted = useHasMounted()
  console.log(problem, 'problem2')

  // Reconstruct the handler function
  const handlerFunction = useMemo(() => {
    return new Function(`return ${problem.handlerFunction}`)()
  }, [problem.handlerFunction])

  if (!hasMounted || !problem) {
    // console.log();
    console.log(problem, 'problem3')
    return null
  }

  return (
    <div>
      <Topbar problemPage />
      {problem && <Workspace problem={{ ...problem, handlerFunction }} />}
    </div>
  )
}

export default ProblemClient
