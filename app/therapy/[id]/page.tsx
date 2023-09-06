"use client"

import React from 'react';
import LoadingPage from '@/components/shared/LoadingPage';
import MyMapComponent from '@/components/shared/MyMapComponent';
import prisma from '../../../lib/prisma'
import { useRouter } from 'next/router';
import Link from 'next/link';

const TherapyDetails = ({ therapy }: any) => {
  const router = useRouter();
  const center = { lat: therapy.lat, lng: therapy.lng };

  if (router.isFallback) {
    return <LoadingPage />;
  }
  if (!therapy) {
    return <p>Therapy not found.</p>;
  }

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
        <MyMapComponent center={center} />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  let therapies = await prisma.therapy.findMany();
  therapies = JSON.parse(JSON.stringify(therapies));
  const paths = therapies.map(({ id }) => ({
    params: { id: id },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { id } }: any) {
  let therapy = await prisma.therapy.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
      providers: true,
    },
  });
  therapy = JSON.parse(JSON.stringify(therapy));
  return {
    props: { therapy, id },
    revalidate: 1,
  };
}

export default TherapyDetails;