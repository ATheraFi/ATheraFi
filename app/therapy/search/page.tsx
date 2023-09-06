"use client"

import React, { useEffect, useState, useMemo, cache, use } from 'react';
import useSWR from 'swr';
import TherapyCard from '@/components/shared/TherapyCard';
import LoadingPage from '@/components/shared/LoadingPage';
import MyMapComponent from '@/components/shared/MyMapComponent';
import SearchBar from '@/components/shared/SearchBar';
import NoResultsPage from '../no-results/page';
import { Therapy } from '@prisma/client';

const getTherapies = () => fetch("http://localhost:3000/api/search").then((res) => res.json());

function Search() {
  // let { city, state, lat, lng, therapyType } = router.query;
  let therapies = getTherapies()
  console.log("THERAPIES: ", therapies)

  return (
    <div className="mt-2 px-8">
      <h1 className="text-center font-semibold text-3xl">Search results</h1>
      <div className="my-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-span-8">

        </div>
        <div className="col-span-1 md:col-span-4">

        </div>
      </div>
    </div>
  );
}

export default Search;
