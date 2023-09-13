"use client"

// Import statements (check if these paths are correct)
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { TherapyType } from "@prisma/client";
import { toast } from 'react-hot-toast';

function SearchBar() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [therapyType, setTherapyType] = useState<TherapyType>(TherapyType.BEHAVIORAL);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const router = useRouter();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      componentRestrictions: { country: 'us' },
    },
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: any) => async () => {
    try {
      const { description, terms } = suggestion;
      setCity(`${terms[0].value}`);
      setState(`${terms[1].value}`);
      setValue(description, false);

      clearSuggestions();

      const results = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(results[0]);
      setLat(lat);
      setLng(lng);
    } catch (error) {
      console.error("Error in handleSelect:", error);
    }
  };

  const renderSuggestions = () => {
    if (status === "OK") {
      return data.map((suggestion: any) => {
        const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)} className="border border-black py-2 text-xl bg-white">
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      toast.error("You must input a location!");
      return;
    }

    try {
      router.push(`/therapy/search?city=${city}&state=${state}&lat=${lat}&lng=${lng}&therapyType=${therapyType}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="w-full">
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="md:input-group">
          <input
            type="text"
            placeholder="New York City, NY"
            className="input input-bordered w-full bg-white"
            value={value}
            onChange={handleInput}
          />
          <select
            className="select select-bordered w-full md:w-44"
            value={therapyType}
            onChange={(e) => setTherapyType(e.target.value as TherapyType)}
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
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </form>
    </div>
  );
}

export default SearchBar;
