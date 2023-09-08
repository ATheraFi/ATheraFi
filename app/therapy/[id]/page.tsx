import React from 'react';
import Link from 'next/link';

async function getData(id: string) {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.atherafi.com';
  const res = await fetch(`${baseUrl}/api/therapy/${id}`)

  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}


export default async function Page({ params: { id }, }: { params: { id: string }}){
  const therapy = await getData(id)

  return (
    <div className="flex flex-col md:flex-row p-8 gap-4">
      <div className="w-full p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-3xl font-bold mb-6">{therapy.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Address</h2>
            <p className="text-gray-600 mb-4">{therapy.address}</p>
            <p className="text-gray-600 mb-4">
              {therapy.city}, {therapy.state} {therapy.zipcode}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Contact Info</h2>
            <Link href={`http://${therapy.companyWebsite}`} target="_blank" className="text-gray-600 mb-4 link-primary">{therapy.companyWebsite}</Link>
            <p className="text-gray-600 my-4">{therapy.companyPhone}</p>
            <p className="text-gray-600 mb-4">{therapy.companyEmail}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Provider Network</h2>
          {therapy.providers?.map((provider: any) => (
            <div key={provider.id} className="text-gray-600 mb-2">
              {provider.name}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">About {therapy.name}</h2>
          <p className="text-gray-600 mb-6">{therapy.description}</p>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        {/* <MyMapComponent center={center} /> */}
      </div>
    </div>
  );
};