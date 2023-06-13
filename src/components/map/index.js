import React, { useCallback, useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'

function MyMapComponent({ center, zoom }) {
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

  const onLoad = useCallback(function callback(map) {
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

// import React, { useCallback, useMemo, useEffect } from 'react';
// import {
//   useLoadScript,
//   GoogleMap,
//   Marker,
// } from '@react-google-maps/api';

// function MyMapComponent({ center, zoom, searchLat, searchLng, searchRadius, databasePlaces }) {
//   const mapOptions = useMemo(
//     () => ({
//       disableDefaultUI: true,
//       clickableIcons: true,
//       scrollwheel: true,
//     }),
//     []
//   );

//   const mapCenter = useMemo(
//     () => ({ lat: center.lat, lng: center.lng }),
//     []
//   );

//   const onLoad = useCallback(function callback(mapInstance) {
//     console.log('Map loaded...');
//     fetchPlaces(searchLat, searchLng, searchRadius, mapInstance);
//   }, [searchLat, searchLng, searchRadius]);

//   const fetchPlaces = (lat, lng, radius, mapInstance) => {
//     const placesService = new window.google.maps.places.PlacesService(mapInstance);

//     const request = {
//       location: { lat, lng },
//       radius,
//     };

//     placesService.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         // Filter places by comparing lat/lng against your database
//         const filteredPlaces = results.filter(place => {
//           return databasePlaces.some(dbPlace =>
//             isPlaceSameLocation(place.geometry.location, dbPlace)
//           );
//         });

//         // Handle the filtered list of places here
//         console.log(filteredPlaces);
//       }
//     });
//   };

//   const isPlaceSameLocation = (placeLocation, dbPlace) => {
//     const { lat, lng } = dbPlace.location;
//     return placeLocation.lat() === lat && placeLocation.lng() === lng;
//   };

//   return (
//     <div>
//       <GoogleMap
//         options={mapOptions}
//         mapContainerStyle={{
//           height: 500,
//         }}
//         center={mapCenter}
//         zoom={zoom || 15}
//         onLoad={onLoad}
//       >
//         <Marker position={mapCenter} />
//       </GoogleMap>
//     </div>
//   );
// }

// export default MyMapComponent;

