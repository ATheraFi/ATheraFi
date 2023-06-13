import { TherapyType } from '@prisma/client'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CustomInput } from './inputs'
import CustomSelect from './inputs/custom-select'

const TherapyBasicStep = () => {
  const { register, formState: { errors }, setValue } = useFormContext();

  return (
    <div className="w-full">
      <CustomInput 
        label="Company Name"
        register={register}
        required
        errors={errors}
      />
      <CustomSelect 
        label="Therapy Type"
        name="therapyType"
        register={register}
        errors={errors}
        defaultValue={TherapyType.ABA.value}
        onChange={(value) => {
          setValue('therapyType', value);
        }}
      />
    </div>
  )
}

export default TherapyBasicStep