import React from 'react'
import ProfileComponent from '@/components/profile/Profile';
import { useUser, auth } from '@clerk/nextjs'

async function getData() {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.atherafi.com';
  const res = await fetch(`${baseUrl}/api/therapy`)

  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}

export default async function Page() {
  const { user } = auth();
  const therapies = await getData()

  console.log("Auth User: ", auth)

  return (
    <div className="mt-5 px-8">
      <p>Profile</p>
      {/* <ProfileComponent user={user} therapies={therapies} /> */}
    </div>
  )
}