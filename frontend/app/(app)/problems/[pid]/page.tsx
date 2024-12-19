// @ts-nocheck
import Topbar from '@/leetcode_components/Topbar/Topbar'
import Workspace from '@/leetcode_components/Workspace/Workspace'
import { problems } from '@/utils/problems'
import { Problem } from '@/utils/types/problem'

export async function generateStaticParams() {
  const paths = Object.keys(problems).map((key) => ({
    pid: key,
  }))
  return paths.map(({ pid }) => ({
    pid,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { pid: string }
}) {
  const problem = problems[params.pid]
  if (problem) {
    return {
      title: problem.title,
      description: problem.description,
    }
  }
  return {}
}

export default async function ProblemPage({
  params,
}: {
  params: { pid: string }
}) {
  const problem = problems[params.pid]

  if (!problem) {
    return {
      notFound: true,
    }
  }

  problem.handlerFunction = problem.handlerFunction.toString()

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  )
}
