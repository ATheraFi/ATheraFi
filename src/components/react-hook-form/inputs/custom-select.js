import { TherapyType } from '@prisma/client'
import React, { forwardRef } from 'react';

const CustomSelect = forwardRef(({ onChange, onBlur, name, label, register, errors }, ref) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // Invoke the original onChange handler
    // register(name, { value: selectedValue }); // Register the selected value
  };

  return (
    <div>
      <label>{label}</label>
      <select
        className={`shadow border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[name] ? 'border-red-500' : ''
        }`}
        name={name}
        ref={ref}
        onChange={handleChange} // Use the updated handleChange function
        onBlur={onBlur}
        {...register(name)}
      >
        {Object.entries(TherapyType).map(([key, value], index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors[name] && <div className="text-sm text-red-600">This field is required</div>}
    </div>
  );
});

export default CustomSelect;
