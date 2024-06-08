import React from 'react'

const InputCustom = props => {
  const {
    id,
    className,
    name,
    onChange,
    value,
    type,
    label,
    onBlur,
    placeholder
  } = props
  return (
    <div>
      <label for={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        />
      </div>
    </div>
  )
}

export default InputCustom
