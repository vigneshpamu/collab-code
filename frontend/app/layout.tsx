'use client'
import { ThemeProvider } from '@/components/layout/themeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import AppWrapper from '@/providers/AppWrapper'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <RecoilRoot>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme=""
              forcedTheme=""
              disableTransitionOnChange
            >
              {children}
              <Toaster position="bottom-left" richColors />
              <ToastContainer />
            </ThemeProvider>
          </body>
        </html>
      </RecoilRoot>
    </ClerkProvider>
  )
}
