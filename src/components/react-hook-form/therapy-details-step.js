import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CustomInput, CustomTextArea } from './inputs'

const TherapyDetailsStep = () => {
  const { register, formState: { errors }, control } = useFormContext();
  return (
    <div>
      <div className="grid grid-row grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-span-4">
          <CustomInput 
            label="Company Website"
            register={register}
            required
            errors={errors}
          />
        </div>
        <div className="col-span-1 md:col-span-4">
          <CustomInput 
            label="Company Email"
            register={register}
            required
            errors={errors}
          />
        </div>
        <div className="col-span-1 md:col-span-4">
          <CustomInput 
            label="Company Phonenumber"
            register={register}
            required
            errors={errors}
          />
        </div>
      </div>
      <CustomTextArea 
        label="Description"
        name="description"
        register={register}
        errors={errors}
      />
    </div>
  )
}

export default TherapyDetailsStep