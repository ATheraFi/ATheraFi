"use client"

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserSignInForm } from '@/components/forms/UserSignInForm';
import ServiceSignInForm from '@/components/forms/ServiceSignInForm';

export default function Onboarding() {
  const { user } = useUser();
  const [toggle, setToggle] = useState(false);

  const userInfo: any = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Welcome to ATheraFi!</h1>
      <p className="text-gray-600 mb-6">
        Complete your profile to get started.
      </p>

      <div className="form-control mb-2">
        <label className="label cursor-pointer">
          <span className="label-text mr-2">Are you registering as a service?</span> 
          <input type="checkbox" className="toggle toggle-success" checked={toggle} onClick={() => setToggle(!toggle)} />
        </label>
      </div>

      { toggle === true ? (
        <ServiceSignInForm />
      ) : (
        <UserSignInForm userData={userData} />
      )}
      
    </main>
  );
}
