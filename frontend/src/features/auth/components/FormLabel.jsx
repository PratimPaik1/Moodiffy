import React, { useState } from 'react'
import '../style/fromLabel.scss'

const FormLabel = ({ name, id, value, setValue, type }) => {

  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"

  return (
    <div className='labelContainer'>

      <input
        id={id}
        value={value}
        placeholder=" "
        onChange={(e) => setValue(e.target.value)}
        type={isPassword ? (showPassword ? "text" : "password") : type}
      />

      <label htmlFor={id}>{name}</label>

      {isPassword && (
        <span
          className="eyeIcon"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      )}

    </div>
  )
}

export default FormLabel