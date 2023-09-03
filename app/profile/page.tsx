"use client"

import React from 'react'
import ProfileComponent from '@/components/profile/Profile';
import { useUser } from '@clerk/nextjs'

function Profile() {
  const { user } = useUser();

  return (
    <div className="mt-5 px-8">
      <p>Profile</p>
      <ProfileComponent user={user} />
    </div>
  )
}

export default Profile