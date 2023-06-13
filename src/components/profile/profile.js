import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Input from '../input';
import Avatar from '../avatar';


const Account = ({ user }) => {
  const [bio, setBio] = useState(user.bio);

  const onUpdate = async () => {
    console.log("BIO: ", bio)
    try {
      await fetch(`/api/user/${user.id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bio)
      })
        .then((response) => {
          toast.success("Your profile was successfully updated")
          return response.json()
        })
    } catch (error) {
      toast.error("Something went wrong trying to update your profile...")
      console.error("Error: ", error)
    }
  }

  return (
    <>
      <h1 className="text-3xl">Account Settings</h1>
      <div className="flex flex-row w-full gap-4">
        <Input
          label="Name"
          id="name"
          type="text"
          name="name"
          value={user.name}
          disabled
        />
        <Input
          label="Email"
          id="email"
          type="text"
          name="email"
          value={user.email}
          disabled
        />
      </div>

      <div className="w-full">
        <label className="text-gray-700 font-bold mb-2 w-full">
          Bio
        </label>
        <textarea
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
          placeholder=""
          className="textarea textarea-bordered h-72 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button onClick={onUpdate} className="btn btn-warning">Update</button>
    </>
  )
}

const ConnectedServices = ({ therapies, setTherapies }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/therapy/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        return response.json()
      }).then((data) => {
        setTherapies(prevTherapies => prevTherapies.filter(therapy => therapy.id !== id))
      })
    } catch (error) {
      toast.error("Error: ", error.message)
      console.error("Error: ", error)
    }
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="bg-gray-100 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Connected Services</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Therapy Type</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {therapies.map((therapy) => (
                <tr key={therapy.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{therapy.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{therapy.therapyType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <Link href={`/therapy/${therapy.id}`} className="text-sm px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                        View
                      </Link>
                      <Link href={`/therapy/edit/${therapy.id}`} className="text-sm px-2 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300">
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          toast.promise(handleDelete(therapy.id), {
                            loading: 'Deleting...',
                            success: 'Therapy deleted!'
                          })
                        }}
                        className="text-sm px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link href="/therapy/add" className="btn btn-block btn-outline mt-2">Add Therapy</Link>
    </>
  )
}


const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('tab1')
  const [therapies, setTherapies] = useState(user.therapies)

  const handleTab1 = () => {
    setActiveTab("tab1");
  }

  const handleTab2 = () => {
    setActiveTab("tab2");
  }

  return (
    <div className="card shadow-lg p-8 flex md:flex-row">
      <div className="md:border-r-2 flex flex-col items-center">
        <Avatar user={user} />
        {/* <img src={user.image} className="avatar rounded-full w-24" /> */}
        <h1 className="text-3xl">{user.name}</h1>
        <ul className="menu bg-base-100 w-56">
          <li><a className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>Account</a></li>

          {user.role === "therapy" &&
            <li><a className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>My Services</a></li>
          }

        </ul>
      </div>

      <div className="ml-4 w-full">
        {activeTab === "tab1" ? <Account user={user} /> : <ConnectedServices therapies={therapies} setTherapies={setTherapies} />}
      </div>

    </div>
  );
};

export default Profile;
