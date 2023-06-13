import React from 'react'

const Avatar = () => {
  return (
    <>
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
          <span className="text-3xl">K</span>
        </div>
      </div> 
    </>
  )
}

const NewUser = () => {
  return (
    <div className="justify-center items-center flex">
      <Avatar />
    </div>
  )
}

export default NewUser