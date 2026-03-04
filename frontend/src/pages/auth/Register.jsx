import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  // javascript
  const [form, setFrom] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const hdlOnChange = async (e) => {
    // console.log(e.target.name, e.target.value)
    setFrom({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const hldSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password is not match !!!')
    }
    // console.log(form)

    // ส่งไปให้ backend 
    try {
      const result = await axios.post('http://localhost:5000/api/register', form)
      console.log(result.data)
      toast.success(result.data)
    } catch (error) {
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
      console.log(error)
    }
  }

  return (
    <div>
      Register
      <form onSubmit={hldSubmit}>

        <label>Email</label>
        <input className='border'
          onChange={hdlOnChange}
          type='email'
          name='email'
        />

        <label>Password</label>
        <input className='border'
          onChange={hdlOnChange}
          type='text'
          name='password'
        />

        <label>Confirm Password</label>
        <input className='border'
          onChange={hdlOnChange}
          type='text'
          name='confirmPassword'
        />

        <button className='bg-gray-700 rounded-4xl p-1'>Register</button>

      </form>

    </div>
  )
}

export default Register