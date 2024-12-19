// @ts-nocheck
'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

import '../styles/globals.css'
import { useRouter } from 'next/navigation'
import { auth, firestore } from '@/_leetcode_things/firebase/firebase'
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { toast } from 'sonner'
import { doc, setDoc } from 'firebase/firestore'
import { XCircle } from 'lucide-react'

export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  //   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {

  //     try {

  //       const newUser = await createUserWithEmailAndPassword(
  //         inputs.email,
  //         inputs.password
  //       )
  //       if (!newUser) return
  //       const userData = {
  //         uid: newUser.user.uid,
  //         email: newUser.user.email,
  //         displayName: inputs.displayName,
  //         createdAt: Date.now(),
  //         updatedAt: Date.now(),
  //         likedProblems: [],
  //         dislikedProblems: [],
  //         solvedProblems: [],
  //         starredProblems: [],
  //       }
  //       await setDoc(doc(firestore, 'users', newUser.user.uid), userData)
  //       router.push('/')
  //     } catch (error: any) {
  //       toast.error(error.message, { position: 'top-center' })
  //     } finally {
  //       toast.dismiss('loadingToast')
  //     }
  //   }

  useEffect(() => {
    const handleUser = async () => {
      if (user) {
        console.log('-------------------------------------------------------')
        console.log(user)

        try {
          const newUser = await createUserWithEmailAndPassword(
            user.primaryEmailAddress.emailAddress,
            user.primaryEmailAddress.emailAddress
          )

          console.log(
            'newuser',
            newUser,
            user.primaryEmailAddress?.emailAddress
          )

          if (!newUser) {
            const newUser2 = await signInWithEmailAndPassword(
              user.primaryEmailAddress.emailAddress,
              user.primaryEmailAddress?.emailAddress
            )

            console.log('newUser2', newUser2)

            return
          }

          console.log('-------------------------------------------------------')
          const userData = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            displayName: user.firstName,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            likedProblems: [],
            dislikedProblems: [],
            solvedProblems: [],
            starredProblems: [],
          }

          await setDoc(doc(firestore, 'users', newUser.user.uid), userData)
          // Uncomment to enable redirection if user exists
          router.push('/leetcode')
        } catch (error) {
          console.error('Error creating user or setting user data:', error)
        }
      }
    }

    handleUser()
  }, [user])

  // return (
  //   <div className="flex w-screen overflow-hidden overscroll-none flex-col h-screen bg-background">
  //     <div className="w-full max-w-screen-md px-8 flex flex-col items-center">
  //       <h1 className="text-2xl font-medium text-center mt-32">
  //         A Collaborative Cloud Code Editor, AI Powered, Auto-Scaling Copilot
  //       </h1>
  //       <div className="text-muted-foreground mt-4 text-center">
  //         Collaborative Cloud Code Editor is Virtual box code editing
  //         environment with AI code autocompletion and real-time collaboration.
  //         The infrastructure runs on Docker containers and Kubernetes to scale
  //         automatically based on resource consumption
  //       </div>
  //       <div className="mt-8 flex space-x-4">
  //         <Link href={'/sign-up'}>
  //           <Button>Go To App</Button>
  //         </Link>
  //       </div>
  //       <div className="w-full rounded-lg bg-neutral-800 aspect-video" />
  //     </div>
  //   </div>
  // )

  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-gray-50">
      <header className="relative z-10 py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <a
                href="#"
                title=""
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                <img
                  className="w-auto h-8"
                  src="https://cdn.rareblocks.xyz/collection/clarity/images/logo.svg"
                  alt="Logo"
                />
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-900"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {!expanded ? (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="hidden md:flex md:items-center md:justify-center md:space-x-10 md:absolute md:inset-y-0 md:left-1/2 md:-translate-x-1/2 lg:space-x-16">
              <Link
                href={'/resume-dashboard'}
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                AI Resume Builder
              </Link>
              <Link
                href={'/leetcode'}
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                DSA Platform
              </Link>
              <Link
                href={'/dashboard'}
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                React Playground
              </Link>
            </div>

            <div className="hidden md:flex">
              <Link
                href={'/dashboard'}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                React Playground
              </Link>
            </div>
          </div>

          {expanded && (
            <nav>
              <div className="px-1 py-8">
                <div className="grid gap-y-7">
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Pricing
                  </a>
                  <a
                    href="#"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Try for free
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="relative py-12 sm:py-16 lg:pb-40">
        <div className="absolute bottom-0 right-0 overflow-hidden">
          <img
            className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png"
            alt="Background"
          />
        </div>
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
            <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight font-pj">
                Unleash Your Coding Potential with Interactive Playgrounds
              </h1>
              <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
                Explore our powerful platforms to accelerate your learning and
                development. Dive into the React Playground for hands-on coding,
                sharpen your skills with DSA challenges, and craft ATS-friendly
                resumes with our AI-driven Resume Builder. Empower your journey
                as a developer today!
              </p>

              <Link
                href={'/dashboard'}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                className="inline-flex px-8 py-4 mt-8 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded sm:mt-10 font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Try our React Playground
              </Link>
            </div>
            <div class="xl:col-span-1">
              <img
                class="w-full mx-auto"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
