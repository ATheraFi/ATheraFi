import React, { useCallback, useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'

function MyMapComponent({ center, zoom }: any) {
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  )

  const mapCenter = useMemo(
    () => ({ lat: center.lat, lng: center.lng }),
    []
  );

  const onLoad = useCallback(function callback(map: any) {
    console.log("Map loaded...")
  }, [])

  return (
    <div>
      <GoogleMap 
        options={mapOptions}
        mapContainerStyle={{
          height: 500,
        }}
        center={mapCenter}
        zoom={zoom || 15}
        onLoad={onLoad}
      >
        <MarkerF position={mapCenter} />
      </GoogleMap>
    </div>
  )
}

export default MyMapComponent