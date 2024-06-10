import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { updateUser } from '../features/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import InputCustom from '../components/InputCustom'
import ButtonCustom from '../components/ButtonCustom'
import SignOut from '../components/SignOut&Delete'
import { app } from '../components/FireBaseConfig'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'

let schema = yup.object().shape({
  firstname: yup.string().required('First Name is Required'),
  lastname: yup.string().required('Last Name is Required'),
  avatar: yup.string().required('Avatar  is Required'),
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is Required'),
  password: yup.string().required('Password is Required')
})

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({})
  const [fileUploadError, setFileUploadError] = useState(false)

  const authState = useSelector(state => state)
  const { user, isLoading, isSuccess } = authState?.auth

  let getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('customer')
  )?.token

  useEffect(() => {
    if (!getTokenFromLocalStorage) {
      navigate('/login')
    }
  }, [getTokenFromLocalStorage])

  const handleFileUpload = file => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      error => {
        setFileUploadError(true)
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>
          setFormData(downloadURL)
        )
      }
    )
  }

  useEffect(() => {
    if (isSuccess === true) {
      formik.values.password = ''
    }
  }, [authState, isSuccess])

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: user?.avatar || '',
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        if (formData?.length > 0) {
          values.avatar = formData
        }
        dispatch(updateUser(values))
        navigate('/')
        navigate('/profile')
      } catch (err) {
        console.log(err)
      }
    }
  })

  return (
    <>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 text-center text-2xl font-bold text-gray-900'>
                Hi {user?.firstname}...,,This is your Profile
              </h2>
            </div>

            <div className='flex-center'>
              <input
                type='file'
                ref={fileRef}
                onChange={e => {
                  setFile(e.target.files[0])
                }}
                accept='image/*'
                hidden
              />
              <img
                value={formik.values.avatar}
                onBlur={formik.handleBlur('avatar')}
                onChange={formik.handleChange('avatar')}
                src={formData?.length > 0 ? formData : user?.avatar}
                onClick={() => fileRef?.current?.click()}
                className='w-24 h-24 mb-5 object-cover br-50 cursor-pointer'
                style={{ border: '4px solid white' }}
                alt='profile'
              />
            </div>

            <p className='text-sm self-center'>
              {fileUploadError ? (
                <span className='text-red-700'>
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className='text-green-700'>
                  Image successfully uploaded!
                </span>
              ) : (
                ''
              )}
            </p>
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
              label={'Update'}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>

          <Link to='/change-password' className='mt-5 block text-sky-600'>
            Change Your Password
          </Link>

          <SignOut />
        </div>
      </div>
    </>
  )
}

export default Profile
