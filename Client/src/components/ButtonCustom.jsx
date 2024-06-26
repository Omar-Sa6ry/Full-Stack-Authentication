import React from 'react'

const ButtonCustom = props => {
  const { label, isLoading } = props
  return (
    <button
      type='submit'
      disabled={isLoading}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
${
  isLoading ? 'opacity-75 hover:placeholder-opacity-75 cursor-not-allowed' : ''
}      
       `}
    >
      {`${isLoading ? 'Loading' : `${label}`} `}
    </button>
  )
}

export default ButtonCustom
