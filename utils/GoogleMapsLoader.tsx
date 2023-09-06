"use client"

import { useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

const GoogleMapsLoader = ({ children }: { children: React.ReactNode }) => {
  const libraries = useMemo(() => ['places'], []);
  const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries as ("places" | "drawing" | "geometry" | "localContext" | "visualization")[],
  });

  return isLoaded ? <>{children}</> : null;
};

export default GoogleMapsLoader;
