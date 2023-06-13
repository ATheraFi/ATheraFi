import React, { useState } from 'react';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';


const Login = ({ csrfToken }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting")
    try {
      await signIn('app-login', {
        email: userInfo.email,
        password: userInfo.password,
      })
    } catch (error) {
      toast.error('Error signing in')
      console.log(error)
    }
  }

  return (
    <form method="post" onSubmit={onSubmit} className="w-full">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="form-control w-full">
        <label>Email</label>
        <input 
          type="text" 
          placeholder="johndoe@gmail.com" 
          value={userInfo.email} 
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              email: e.target.value
            })
          }}
          className="border w-full py-3 pl-3 flex justify-center gap-2 my-2" 
        />
      </div>
      <div className="form-control w-full">
        <label>Password</label>
        <input 
          type="password" 
          placeholder="***********" 
          value={userInfo.password} 
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              password: e.target.value
            })
          }}
          className="border w-full py-3 pl-3 flex justify-center gap-2 mb-2" 
        />
      </div>
      <button
        className="w-full border py-3 flex justify-center gap-2 hover:bg-blue-400 hover:text-white transition ease-in duration-300"
        type="submit"
      >
        Sign In
      </button>
      <div className="divider">OR</div>
      <button
        className="w-full border py-3 flex justify-center gap-2"
        onClick={() => signIn('google')}
      >
        Sign in with Google <Image src={'/google.svg'} width="20" height={20} />
      </button>
    </form>
  )
}

const Register = ({ csrfToken }) => {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    }

    await fetch('/api/user/create', options)
      .then(res => res.json())
      .then((data) => {
        if (data) router.push('/auth/new-user')
      })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="form-control w-full grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="w-full col-span-1 md:col-span-6">
          <label>First Name</label>
          <input 
            type="text" 
            placeholder="John" 
            value={userInfo.firstName} 
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                firstName: e.target.value
              })
            }} 
            className="border w-full py-3 pl-3 flex justify-center gap-2 my-2" 
          />
        </div>
        <div className="w-full col-span-1 md:col-span-6">
          <label>Last Name</label>
          <input 
            type="text" 
            placeholder="Doe" 
            value={userInfo.lastName} 
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                lastName: e.target.value
              })
            }}
            className="border w-full py-3 pl-3 flex justify-center gap-2 my-2" 
          />
        </div>
      </div>
      <div className="form-control w-full">
        <label>Email</label>
        <input 
          type="text" 
          placeholder="johndoe@gmail.com" 
          value={userInfo.email} 
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              email: e.target.value
            })
          }}
          className="border w-full py-3 pl-3 flex justify-center gap-2 my-2" 
        />
      </div>
      <div className="form-control w-full">
        <label>Password</label>
        <input 
          type="password" 
          placeholder="***********" 
          value={userInfo.password} 
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              password: e.target.value
            })
          }}
          className="border w-full py-3 pl-3 flex justify-center gap-2 mb-2" 
        />
      </div>
      <button
        className="w-full border py-3 flex justify-center gap-2 hover:bg-blue-400 hover:text-white transition ease-in duration-300"
        type="submit"
      >
        Sign Up
      </button>
      <div className="divider">OR</div>
      <button
        className="w-full border py-3 flex justify-center gap-2"
        onClick={() => signIn('google')}
      >
        Sign up with Google <Image src={'/google.svg'} width="20" height={20} />
      </button>
    </form>
  )
}


const AuthPage = ({ csrfToken }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center px-8 py-16">
        <div className="w-full lg:w-1/2">
          <img
            src="./transp-logo.png"
            alt="Auth Image"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center mb-8 lg:mb-0">
          {isLogin ? <h1 className="text-4xl font-bold py-4">Sign In</h1> : <h1 className="text-4xl font-bold py-4">Sign Up</h1>}

          { isLogin ? (
            <Login csrfToken={csrfToken} />
          ) : (
            <Register csrfToken={csrfToken}  />
          )}

          <div className="mt-2">
            {isLogin ?
              (<p>Not registered? <button className="btn-link" onClick={() => setIsLogin(false)}>Register</button></p>) :
              (<p>Already have an account? <button className="btn-link" onClick={() => setIsLogin(true)}>Login</button></p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   if (session) {
//     return { redirect: { permanent: false, destination: '/' }}
//   }

//   const csrfToken = await getCsrfToken({ req: context.req })
  
//   return {
//     props: { csrfToken }
//   }
// }


export default AuthPage;