import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../features/user/userSlice'
import { useFormik } from 'formik'
import InputCustom from '../components/InputCustom'
import * as yup from 'yup'
import ButtonCustom from '../components/ButtonCustom'

let schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is Required')
})

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: ''
    },
    validationSchema: schema,
    onSubmit: async values => {
      dispatch(forgotPassword(values))
      if (isSuccess) {
        navigate('/')
      }
    }
  })

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Forgot my Password
        </h2>
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

            <ButtonCustom
              label={'Send Link'}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
