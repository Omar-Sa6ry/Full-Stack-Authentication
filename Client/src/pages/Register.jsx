import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../components/FireBaseConfig'
import { useFormik } from 'formik'
import Buttons from '../components/ButtonsAuth/Buttons'
import InputCustom from '../components/InputCustom'
import * as yup from 'yup'
import ButtonCustom from '../components/ButtonCustom'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth'
import { register } from '../features/user/userSlice'

let schema = yup.object().shape({
  firstname: yup.string().required('First Name is Required'),
  lastname: yup.string().required('Last Name is Required'),
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is Required'),
  password: yup.string().required('Password is Required')
})

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [dataAuth, setDataAuth] = useState({})

  const authState = useSelector(state => state)
  const { isSuccess, isLoading } = authState?.auth

  // let getTokenFromLocalStorage = JSON.parse(
  //   localStorage?.getItem('customer')
  // )?.token

  // useEffect(() => {
  //   if (getTokenFromLocalStorage) {
  //     navigate('/')
  //   }
  // }, [getTokenFromLocalStorage])

  const googleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      await setDataAuth({
        firstname: result?._tokenResponse?.firstName,
        lastname: result?._tokenResponse?.lastName,
        email: result?.user?.email,
        avatar: result?.user?.photoURL
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
        firstname: result?._tokenResponse?.firstName,
        lastname: result?._tokenResponse?.lastName,
        email: result?.user?.email,
        avatar: result?.user?.photoURL
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

      await setDataAuth({
        firstname: result?.user?.displayName.split(' ')[0],
        lastname: result?.user?.displayName.split(' ')[1],
        email: result?.user?.email,
        avatar: result?.user?.photoURL
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

      await setDataAuth({
        firstname: result?.user?.displayName.split(' ')[0],
        lastname: result?.user?.displayName.split(' ')[1],
        email: result?.user?.email,
        avatar: result?.user?.photoURL
      })
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: dataAuth?.firstname || '',
      lastname: dataAuth?.lastname || '',
      email: dataAuth?.email || '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: async values => {
      dispatch(register(values))
      if (isSuccess) {
        navigate('/')
      }
    }
  })

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Sign up to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 max-w'>
          Or
          <Link
            to='/login'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            Login to your account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' action='#' method='POST'>
            <InputCustom
              label='First Name'
              id='firstname'
              name='firstname'
              type='text'
              value={formik?.values?.firstname}
              onChange={formik?.handleChange('firstname')}
              onBlur={formik?.handleBlur('firstname')}
              placeholder='Enter your First Name...'
            />
            <div className='error'>
              {formik.touched.firstname && formik.errors.firstname}
            </div>

            <InputCustom
              label='Last Name'
              id='lastname'
              name='lastname'
              type='text'
              value={formik?.values?.lastname}
              onChange={formik?.handleChange('lastname')}
              onBlur={formik?.handleBlur('lastname')}
              placeholder='Enter your last Name...'
            />
            <div className='error'>
              {formik.touched.lastname && formik.errors.lastname}
            </div>

            <InputCustom
              label='Email'
              id='email'
              name='email'
              type='email'
              value={formik?.values?.email}
              onChange={formik?.handleChange('email')}
              onBlur={formik?.handleBlur('email')}
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

            <ButtonCustom
              label={'Sign up'}
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

export default Register
