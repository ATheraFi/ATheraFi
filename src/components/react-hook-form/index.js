import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import TherapyBasicStep from './therapy-basics-step';
import TherapyDetailsStep from './therapy-details-step';
import TherapyAddressForm from './therapy-address-form';
import TherapyProvidersForm from './therapy-providers-form';

const schema = yup.object().shape({
  companyName: yup.string().required(),
});

const ReactHookForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit, formState: { isValid, errors }, reset, register } = methods;

  const nextStep = (e) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const prevStep = (e) => {
    e.preventDefault()
    setStep(step - 1)
  }

  const handleDataSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/therapy', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const responseData = await response.json();
      setIsLoading(false);
      router.push(`/therapy/${responseData.id}`);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error: ", error.message)
      console.error("Error: ", error)
    }
  }

  const onSubmit = (data) => {
    if (!isLoading && data) {
      handleDataSubmit(data);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <TherapyBasicStep register={register} errors={errors} />
      case 2:
        return <TherapyAddressForm register={register} errors={errors} />
      case 3:
        return <TherapyDetailsStep register={register} errors={errors} />
      case 4:
        return <TherapyProvidersForm register={register} errors={errors} />
      default:
        return <TherapyBasicStep register={register} errors={errors} />
    }
  }

  const isNextButtonDisabled = !isValid || isLoading;

  return (
    <>
      <ul className="steps my-4">
        <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Basic Info</li>
        <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Location Info</li>
        <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Details</li>
        <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Add Providers</li>
        <li className={`step ${step >= 5 ? 'step-primary' : ''}`}>Review</li>
      </ul>
      <div className="flex justify-center items-center w-3/5 card bg-white p-8 shadow-xl">
        <div className="w-full justify-center items-center">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              { renderStep() }
              <div className="w-full flex flex-row justify-between">
                <div>
                  {step > 1 && <button className="btn btn-primary btn-outline" onClick={(e) => prevStep(e)}>Previous</button>}
                </div>
                <div>
                  {step < 4 && <button disabled={isNextButtonDisabled} className="btn btn-info" onClick={(e) => nextStep(e)}>Next</button>}
                  {step === 4 && <button disabled={isNextButtonDisabled} className="btn btn-info" type="button" onClick={(e) => onSubmit(methods.getValues())}>Submit</button>}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default ReactHookForm