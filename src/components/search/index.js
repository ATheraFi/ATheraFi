import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { TherapyType } from "@prisma/client"

function SearchBar() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [therapyType, setTherapyType] = useState(TherapyType.BEHAVIORAL)
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  const router = useRouter();

  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({ 
    callbackName: 'initMap',
    requestOptions: {
      types: ["(cities)"],
      componentRestrictions: { country: 'us' }
    } 
  })
  
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });
  
  const handleInput = (e) => {
    setValue(e.target.value);
  }

  const handleSelect = ({ description, terms }) => () => {
    setCity(`${terms[0].value}`)
    setState(`${terms[1].value}`)
    setValue(description, false);

    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setLat(lat)
        setLng(lng)
      })
  }

  const renderSuggestions = () => data.map((suggestion) => {
    const { place_id, structured_formatting: { main_text, secondary_text }, terms } = suggestion;

    return (
      <li key={place_id} onClick={handleSelect(suggestion)} className="border border-black py-2 text-xl bg-white">
        <strong>{ main_text }</strong> <small>{ secondary_text }</small>
      </li>
    )
  })

  const handleSubmit = async (e) => {
    await e.preventDefault()
    try{
      router.push({ 
        pathname: '/therapy/search', 
        query: { 
          city: city, 
          state: state,
          lat: lat, 
          lng: lng, 
          therapyType: therapyType 
        }
      });
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="w-full">
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="md:input-group">
          <input 
            type="text"
            placeholder="New York City, NY"
            className="input input-bordered w-full bg-white"
            value={value}
            required
            onChange={handleInput}
          />
          <select 
            defaultValue={TherapyType.BEHAVIORAL.value}
            className="select select-bordered w-full md:w-52"
            value={therapyType}
            onChange={(e) => setTherapyType(e.target.value)}
          >
            {Object.entries(TherapyType).map(([key, value], index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button className="btn btn-block md:btn-square" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
        { status === "OK" && <ul>{renderSuggestions()}</ul>}
      </form>
    </div>
  )
}

export default SearchBar