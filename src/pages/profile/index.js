import React from 'react'
import { getServerSession } from 'next-auth'
import { ProfileComponent } from '@/components'
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