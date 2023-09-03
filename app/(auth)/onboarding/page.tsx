"use client"

import React from 'react';
import { useUser } from '@clerk/nextjs';

export default function Onboarding() {
  const { user } = useUser();

  const userInfo: any = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl,
  };

  console.log('Destructured User:', user);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Welcome to ATheraFi!</h1>
      <p className="text-gray-600 mb-6">
        Complete your profile to get started.
      </p>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-md w-full">

        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 relative">
            <img
              src={userData.image}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </label>
            <input
              type="file"
              id="avatar"
              className="hidden"
            />
          </div>
        </div>

        <input
          type="text"
          className="input mb-3 input-bordered w-full"
          placeholder={userData.username || 'Username'}
        />
        <input
          type="text"
          className="input mb-3 input-bordered w-full"
          placeholder={userData.name || 'Name'}
        />
        <textarea
          className="textarea mb-6 input-bordered w-full"
          placeholder={userData.bio || 'Bio'}
        />
        <button className="btn btn-primary w-full">Complete Profile</button>
      </div>
    </main>
  );
}
