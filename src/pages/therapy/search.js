import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { TherapyCard, LoadingPage, MyMapComponent, SearchBar } from '@/components';
import NoResultsPage from './no-results';

function Search() {
  const router = useRouter();
  const { city, state, lat, lng, therapyType } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.prefetch(`/api/therapy/search?city=${city}&state=${state}&lat=${lat}&lng=${lng}&therapyType=${therapyType}`);
  }, [city, state, lat, lng, therapyType]);

  const fetchTherapies = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/therapy/search?city=${city}&state=${state}&lat=${lat}&lng=${lng}&therapyType=${therapyType}`);
      if (response.ok) {
        const { therapies } = await response.json();
        return therapies;
      } else {
        throw new Error('Error in searching');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error in fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const key = useMemo(() => `/api/therapy/search?city=${city}&state=${state}&lat=${lat}&lng=${lng}&therapyType=${therapyType}`, [city, state, lat, lng, therapyType]);
  const { data: fetchedTherapies, error } = useSWR(key, fetchTherapies);

  if (error) {
    console.error(error);
    return <div>Error loading data...</div>;
  }

  if (isLoading || !fetchedTherapies) {
    return <LoadingPage />;
  }

  const center = {
    lat: Number(lat),
    lng: Number(lng)
  };

  if (fetchedTherapies.length <= 0) {
    return <NoResultsPage />;
  }

  return (
    <div className="mt-2 px-8">
      <h1 className="text-center font-semibold text-3xl">Search results for {city}, {state}</h1>
      <div className="my-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-span-8">
          {fetchedTherapies?.map((therapy) => (
            <TherapyCard key={therapy.id} therapy={therapy} />
          ))}
        </div>
        <div className="col-span-1 md:col-span-4">
          <MyMapComponent center={center} zoom={10} searchLat={parseFloat(lat)} searchLng={parseFloat(lng)} searchRadius={10} />
        </div>
      </div>
    </div>
  );
}

export default Search;
