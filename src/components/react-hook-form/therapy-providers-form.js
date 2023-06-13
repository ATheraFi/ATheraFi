import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CustomProviderSelect } from './inputs'

const TherapyProvidersForm = () => {
  const { register, formState: { errors }, control } = useFormContext();
  return (
    <div>
      <CustomProviderSelect 
        name="providers"
        label="Providers"
        control={control}
      />
    </div>
  )
}

export default TherapyProvidersForm