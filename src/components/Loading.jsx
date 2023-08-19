import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex h-[100vh] flex-col justify-center'>
    <div className='flex justify-center'>
      <CircularProgress color='secondary'/>
    </div>
    </div>
  )
}
