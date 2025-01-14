'use client'
import React from 'react'
import Link from 'next/link'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import Dashboard from './Dashboard'

export default function CallToAction() {

  const {currentUser} = useAuth();

  if(currentUser) {
    return (
      <div className='max'>
        <Link href={'/dashboard'}>
          <Button dark full text='Go to dashboard'/>
        </Link>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Link href={'/dashboard'}>
          <Button text='Sign Up' />
        </Link>
        <Link href={'/dashboard'}>
          <Button text='Login' dark/>
        </Link>
    </div>
  )
}
