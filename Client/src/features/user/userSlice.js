import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './userServices'
import { toast } from 'react-toastify'

const getUserfromLocalStorage = localStorage.getItem('customer')
  ? JSON.parse(localStorage.getItem('customer'))
  : null

const initialState = {
  user: getUserfromLocalStorage,
  wishlist: [],
  orders: [],
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (email, thunkAPI) => {
    try {
      return await authService.forgetPasswordToken(email)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (token, thunkAPI) => {
    try {
      return await authService.resetPasswordToken(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: buildeer => {
    buildeer
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        localStorage.setItem('token', action.payload.token)
        if (state.isSuccess) {
          setTimeout(() => {
            window.location.reload()
            toast.success('User is created Successfullly!')
          }, 1500)
        }
        state.createdUser = action.payload
        state.message = 'success'
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        state.isLoading = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true
        localStorage.setItem('token', action.payload.token)
        state.isError = false
        state.isLoading = false
        state.user = action.payload
        state.message = 'success'
        if (state.isSuccess === true) {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          toast.info('you are logged in successfully')
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(forgotPassword.pending, state => {
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.ForgotPassword = action.payload
        if (state.isSuccess) {
          toast.success('Email Sent Successfully !')
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })

      .addCase(resetState, () => initialState)
  }
})

export default authSlice.reducer
