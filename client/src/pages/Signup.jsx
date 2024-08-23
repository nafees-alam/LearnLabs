import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.username || !formData.email || !formData.password){
      return setErrMessage('All fields are required');
    }
    try {
      setLoading(true);
      setErrMessage(null);
      const res = await fetch('/server/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if(data.success === false){
        return setErrMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }
    }
    catch(err){
        setErrMessage(err.message);
        setLoading(false);
    }
  }

  

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to = '/' className='font-bold dark:text-white text-4xl'>
          <div className='text-gray-200 text-center px-2 py-1 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg' >
          LearnLabs
          </div>
          </Link>
          <p className='text-sm mt-5'>
            Where you feel the magic of science.  
            You can signin using email or through google account.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className=' flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username'/>
              <TextInput type='text' placeholder='username' id='username' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your email'/>
              <TextInput type='email' placeholder='example@email.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='password' placeholder='password' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
            {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span>Loading...</span>
                  </>
                )
                : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {
            errMessage && (
              <Alert className='mt-5' color='failure'>
                {errMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp