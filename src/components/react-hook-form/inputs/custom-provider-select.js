import React from 'react';
import { useFieldArray } from 'react-hook-form';

const KEY_COMMA = ",";
const KEY_BACKSPACE = "Backspace";
const KEY_ENTER = "Enter";

const ProviderItem = ({ provider, onRemove }) => {
  return (
    <div className="flex items-center space-x-2 py-1 px-2 mb-1">
      <div className="flex-1 font-bold text-lg text-gray-700">{provider}</div>
      <button className="btn btn-circle btn-outline btn-sm" onClick={() => onRemove(provider)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

const CustomProviderSelect = ({ name, label, control, required, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const handleProviders = (event) => {
    if (event.key === KEY_COMMA && event.target.value !== "") {
      append({ provider: event.target.value.trim()});
      event.target.value = "";
      event.preventDefault();
    } else if (event.key === KEY_BACKSPACE && event.target.value === "") {
      const lastFieldIndex = fields.length - 1;
      if (lastFieldIndex >= 0) {
        remove(lastFieldIndex);
        event.preventDefault();
      }
    } else if (fields.length < 1 && event.key === KEY_BACKSPACE) {
      console.log("Error!");
    } else if (event.target.value === "" && event.key === KEY_ENTER) {
      console.log("Other error");
    }
  };
  
  return (
    <>
      <div>
        <label>{ label }</label>
        <input 
          className={`shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} 
          onKeyDown={(e) => handleProviders(e)}
        />
        <label>Separate providers with a comma</label>
        <div className="my-2">
          {fields.map((field, index) => (
            <ProviderItem
              key={field.id}
              provider={field.provider}
              onRemove={() => remove(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomProviderSelect;
