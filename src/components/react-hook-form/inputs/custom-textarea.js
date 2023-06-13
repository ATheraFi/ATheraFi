import React from 'react'
import { camelize } from '../../../../utils/camelize'

const CustomTextArea = ({ name, label, register, required, errors }) => {
  return (
    <>
      <div>
        <label>{ label }</label>
        <textarea 
          className={`shadow appearance-none h-48 border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} 
          {...register(name, { required })} 
        />
      </div>
      { errors[name] && <div className="text-sm text-red-600">This field is required</div> }
    </>
  )
}

export default CustomTextArea