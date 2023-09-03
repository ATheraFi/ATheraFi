import React from 'react'

function Input({ label, type, name, value, disabled, onChange }: any) {

  return (
    <div className="mb-4 w-full">
      <label className="text-gray-700 font-bold mb-2 w-full" htmlFor={name}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}

export default Input