import React, { useState } from 'react';
import prisma from '../../../../lib/prisma';
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid'

const KEY_COMMA = ",";
const KEY_BACKSPACE = "Backspace";
const KEY_ENTER = "Enter";

const EditProvidersForm = ({ formData, setFormData, therapy }) => {
  const providers = formData.providers;

  const handleProviders = (event) => {
    if (event.key === KEY_COMMA && event.target.value !== "") {
      setFormData({
        ...formData,
        providers: [...providers, { id: uuidv4(), name: event.target.value.trim(), therapyId: therapy.id }],
      });
      event.target.value = "";
      event.preventDefault();
    } else if (event.key === KEY_BACKSPACE && event.target.value === "") {
      const providersCopy = [...providers];
      providersCopy.pop();
      setFormData({ ...formData, providers: providersCopy });
      event.preventDefault();
    } else if (providers.length < 1 && event.key === KEY_BACKSPACE) {
      console.log("Error!");
    } else if (event.target.value === "" && event.key === KEY_ENTER) {
      console.log("Other error");
    }
  };

  const handleRemoveProvider = (providerToRemove) => {
    const newProviders = providers.filter(
      (provider) => provider.id !== providerToRemove.id
    );
    setFormData((prevData) => ({
      ...prevData,
      providers: newProviders,
    }));
  };
  
  return (
    <div className="w-full">
      <label className="label">
        <span className="label-text">
          List providers in your network
        </span>
      </label>
      <input
        placeholder="Providers"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        onKeyDown={(event) => handleProviders(event)}
      />
      <label className="label">
        <span className="label-text-alt">
          Separate providers with a comma
        </span>
      </label>
      {providers.length > 0 && (
        <div className="my-2">
          {providers.map((provider) => (
            <ProviderItem
              key={provider.id}
              provider={provider}
              onRemove={handleRemoveProvider}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const ProviderItem = ({ provider, onRemove }) => {
  return (
    <div className="flex items-center space-x-2 py-1 px-2 mb-1">
      <div className="flex-1 font-bold text-lg text-gray-700">{provider.name}</div>
      <button className="btn btn-circle btn-outline btn-sm" onClick={() => onRemove(provider)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  )
}


const EditTherapy = ({ therapy }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: therapy.name, 
    description: therapy.description, 
    address: therapy.address, 
    city: therapy.city, 
    state: therapy.state, 
    zipcode: therapy.zipcode, 
    companyEmail: therapy.companyEmail, 
    companyWebsite: therapy.companyWebsite, 
    companyPhone: therapy.companyPhone,
    providers: [...therapy.providers],
    therapyType: therapy.therapyType,
    lat: therapy.lat,
    lng: therapy.lng,
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/therapy/${therapy.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then((response) => {
        return response.json()
      }).then((data) => {
        router.push(`/therapy/${therapy.id}`)
      })
    } catch (error) {
      toast.error("Error: ", error.message)
      console.error("Error: ", error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 p-8">
          <div className="col-span-1 md:col-span-12">
            <label>Company Name</label>
            <input className="input input-bordered w-full" type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-12">
            <label>Address</label>
            <input className="input input-bordered w-full" type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-6">
            <label>City</label>
            <input className="input input-bordered w-full" type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-3">
            <label>State</label>
            <input className="input input-bordered w-full" type="text" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-3">
            <label>Zipcode</label>
            <input className="input input-bordered w-full" type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-4">
            <label>Website</label>
            <input className="input input-bordered w-full" type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-4">
            <label>Email</label>
            <input className="input input-bordered w-full" type="text" name="companyEmail" value={formData.companyEmail} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-4">
            <label>Phone Number</label>
            <input className="input input-bordered w-full" type="text" name="companyPhone" value={formData.companyPhone} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-12">
            <label>Phone Number</label>
            <textarea className="textarea textarea-bordered w-full h-44" name="description" type="text" value={formData.description} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-12">
            <EditProvidersForm formData={formData} setFormData={setFormData} therapy={therapy} />
          </div>
          <button className="btn btn-warning" type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export async function getStaticPaths() {
  let therapies = await prisma.therapy.findMany()
  therapies = JSON.parse(JSON.stringify(therapies))
  const paths = therapies.map(({ id }) => ({
    params: { id: id }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { id }}) {
  let therapy = await prisma.therapy.findUnique({
    where: {
      id: id
    },
    include: {
      author: true,
      providers: true
    }
  })
  therapy = JSON.parse(JSON.stringify(therapy))
  return {
    props: { therapy, id }
  }
}

export default EditTherapy;

