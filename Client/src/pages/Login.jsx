import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../components/FireBaseConfig'
import { useFormik } from 'formik'
import Buttons from '../components/ButtonsAuth/Buttons'
import InputCustom from '../components/InputCustom'
import * as yup from 'yup'
import { login } from '../features/user/userSlice'
import ButtonCustom from '../components/ButtonCustom'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth'

let schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is Required'),
  password: yup.string().required('Password is Required')
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [dataAuth, setDataAuth] = useState({})

  const authState = useSelector(state => state)
  const { isSuccess, isLoading } = authState?.auth

  let getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('customer')
  )?.token
  
  useEffect(() => {
    if (getTokenFromLocalStorage) {
      navigate('/')
    }
  }, [getTokenFromLocalStorage])

  const googleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      await setDataAuth({
        email: result?.user?.email
      })
    } catch (err) {
      console.log(err)
    }
  }

  const facebookAuth = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)

      await setDataAuth({
        email: result?.user?.email
      })
    } catch (err) {
      console.log(err)
    }
  }

  const xAuth = async () => {
    try {
      const provider = new TwitterAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      await setDataAuth({
        email: result?.user?.email
      })
    } catch (err) {
      console.log(err)
    }
  }

  const gitHubAuth = async () => {
    try {
      const provider = new GithubAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      await setDataAuth({
        email: result?.user?.email
      })
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: dataAuth?.email || '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: async values => {
      dispatch(login(values))
    }
  })

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 max-w'>
          Or
          <Link
            to='/register'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            create an account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            <InputCustom
              label='Email'
              id='email'
              name='email'
              type='email'
              value={formik?.values?.email}
              onChange={formik?.handleChange('email')}
              onBlur={formik?.handleBlur('email')}
              // autocomplete='email'
              placeholder='Enter your email address...'
            />
            <div className='error'>
              {formik.touched.email && formik.errors.email}
            </div>

            <InputCustom
              id='password'
              name='password'
              type='password'
              label='Password'
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder='Enter your password'
            />
            <div className='error'>
              {formik.touched.password && formik.errors.password}
            </div>

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <Link
                  to='/forgotPassword'
                  className='font-medium text-red-600 hover:text-red-500'
                >
                  Forgot your password
                </Link>
              </div>
            </div>

            <ButtonCustom
              label={'Sign in'}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-100 text-gray-500'>
                  Or continue with
                </span>
              </div>
            </div>
            <Buttons
              googleAuth={googleAuth}
              facebookAuth={facebookAuth}
              xAuth={xAuth}
              gitHubAuth={gitHubAuth}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
