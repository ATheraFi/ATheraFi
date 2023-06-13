import React from 'react'
import { useRouter } from 'next/router';
import { LoadingPage } from '@/components';
import { useSession } from 'next-auth/react';
import ReactHookForm from '@/components/react-hook-form';

function AddTherapy() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "Loading") {
    return <LoadingPage />
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-[75vh] flex-col">
        <h1 className="text-5xl font-bold">Access Denied!</h1>
        <p>You must be registered and logged in as a service.</p>
      </div>
    )
  }
  if (session && session.user.role === "user") {
    router.push('/')
  }


  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="font-semibold text-3xl">Add Therapy</h1>
      <ReactHookForm />
    </div>
  )
}

export default AddTherapy