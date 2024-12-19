// @ts-nocheck
'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AppWrapper = ({ children }) => {
  return (
    <>
      <RecoilRoot>
        {/* {children} */}
        <ToastContainer />
      </RecoilRoot>
    </>
  )
}

export default AppWrapper
