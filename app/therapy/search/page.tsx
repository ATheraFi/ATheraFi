"use client"

import React, { useEffect, useState, useMemo, cache, use } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import TherapyCard from '@/components/shared/TherapyCard';
import LoadingPage from '@/components/shared/LoadingPage';
import MyMapComponent from '@/components/shared/MyMapComponent';
import SearchBar from '@/components/shared/SearchBar';
import NoResultsPage from '../no-results/page';
import { Therapy, TherapyType } from '@prisma/client';

async function getTherapies() {
  const searchParams = useSearchParams()
  const city = searchParams?.get('city')
  const state = searchParams?.get('state')
  const lat: number = parseFloat(searchParams?.get('lat') as string)
  const lng: number = parseFloat(searchParams?.get('lng') as string)
  const therapyType: TherapyType | null = searchParams?.get('therapyType') as TherapyType | null

  const res = await fetch(`http://localhost:3000/api/search?city=${city}&state=${state}&lat=${lat}&lng=${lng}&therapyType=${therapyType}`)
  return res.json()
}

async function Search() {
  const therapies = await getTherapies()

  return (
    <div className="mt-2 px-8">
      <h1 className="text-center font-semibold text-3xl">Search results</h1>
      <div className="my-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-span-8">
          { therapies.map(( therapy: Therapy ) => <TherapyCard therapy={therapy} /> )}
        </div>
        <div className="col-span-1 md:col-span-4">
          {/* <MyMapComponent zoom={15} /> */}
        </div>
      </div>
    </div>
  );
}

export default Search;
