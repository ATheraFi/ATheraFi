import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import usePlacesAutocomplete, { getGeocode, getLatLng, getZipCode } from 'use-places-autocomplete';
import CustomInput from './custom-input';

const CustomAddressInput = ({ control, name, label, rules, register, required, errors }) => {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')

  const { field: { ref, onChange, onBlur } } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({ callbackName: 'initMap' });

  const handleSelect = async ({ description, terms }) => {
    const formattedAddress = `${terms[0].value} ${terms[1].value}`
    setValue(formattedAddress, false);
    setCity(terms[2].value)
    setState(terms[3].value)

    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);
    const zipcode = await getZipCode(results[0], false)
    setZipcode(zipcode)

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng)

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      console.log("invalid lat and lng")
      return;
    }

    onChange({ 
      address: formattedAddress,
      city: terms[2].value,
      state: terms[3].value, 
      lat: parsedLat, 
      lng: parsedLng, 
      zipcode 
    });
    clearSuggestions();
  };

  const renderSuggestions = () => data.map((suggestion) => {
    const { place_id, structured_formatting: { main_text, secondary_text }, terms } = suggestion;

    return (
      <li className="bordered border-2 p-4 bg-white" key={place_id} onClick={() => handleSelect(suggestion)}>
        <strong>{ main_text }</strong> <small>{ secondary_text }</small>
      </li>
    )
  })

  return (
    <div>
      <label>{ label }</label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        ref={ref}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      { status === "OK" && <ul>{renderSuggestions()}</ul>}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-span-6">
          <label>City</label>
          <input
            label="City"
            className={`shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            value={city}
            onChange={(e) => {
              setCity(e.target.value)
            }}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label>State</label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={state}
            onChange={(e) => {
              setState(e.target.value)
            }}
          />
        </div>
        <div className="col-span-1 md:col-span-4">
          <label>Zipcode</label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={zipcode}
            onChange={(e) => {
              setZipcode(e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomAddressInput;
