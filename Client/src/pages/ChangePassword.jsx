import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { changePassword } from '../features/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import SignOut from '../components/SignOut&Delete'
import InputCustom from '../components/InputCustom'
import ButtonCustom from '../components/ButtonCustom'

let schema = yup.object().shape({
  oldPassword: yup.string().required('Password is Required'),
  newPassword: yup.string().required('Password is Required')
})

const ChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authState = useSelector(state => state)
  const { isSuccess, isLoading } = authState?.auth

  let getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('customer')
  )?.token

  useEffect(() => {
    if (!getTokenFromLocalStorage) {
      navigate('/login')
    }
  }, [getTokenFromLocalStorage])

  useEffect(() => {
    if (isSuccess === true) {
      formik.resetForm()
    }
  }, [authState, isSuccess])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: schema,
    onSubmit: async values => {
      dispatch(changePassword(values))
    }
  })

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Change your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            <InputCustom
              label='Old Password'
              id='oldPassword'
              name='oldPassword'
              type='password'
              value={formik?.values?.oldPassword}
              onChange={formik?.handleChange('oldPassword')}
              onBlur={formik?.handleBlur('oldPassword')}
              placeholder='Enter your email address...'
            />
            <div className='error'>
              {formik.touched.oldPassword && formik.errors.oldPassword}
            </div>

            <InputCustom
              id='newPassword'
              name='newPassword'
              type='password'
              label='New Password'
              value={formik.values.newPassword}
              onChange={formik.handleChange('newPassword')}
              onBlur={formik.handleBlur('newPassword')}
              placeholder='Enter a new password'
            />
            <div className='error'>
              {formik.touched.newPassword && formik.errors.newPassword}
            </div>

            <ButtonCustom
              label={'Change Your Password'}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>

          <Link to='/profile' className='block mt-5 text-sky-600'>
            Change Your Email
          </Link>

          <SignOut />
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
