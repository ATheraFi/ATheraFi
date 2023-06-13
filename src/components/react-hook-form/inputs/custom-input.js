import React from 'react'
import { camelize } from '../../../../utils/camelize';

const CustomInput = ({ label, register, required, errors }) => {
  let camelLabel = camelize(label)
  return (
    <>
      <div>
        <label>{ label }</label>
        <input 
          className={`shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} 
          {...register(camelLabel, { required })} 
        />
      </div>
      { errors[camelLabel] && <div className="text-sm text-red-600">This field is required</div> }
    </>
  )
}

export default CustomInput