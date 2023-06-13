import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CustomAddressInput } from './inputs'

const TherapyAddressForm = () => {
  const { register, formState: { errors }, control } = useFormContext();
  return (
    <div>
      <CustomAddressInput 
        control={control}
        name="address"
        label="Address"
      />
    </div>
  )
}

export default TherapyAddressForm