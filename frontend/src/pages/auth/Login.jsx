import React, { use, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/ecom-store'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/loginPage.module.css'

const login = () => {
  // javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  // console.log('user form zustand', user)

  const [form, setFrom] = useState({
    email: '',
    password: '',
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

    // ส่งไปให้ backend 
    // try {
    //   const result = await axios.post('http://localhost:5000/api/login', form)
    //   console.log(result.data)
    //   toast.success(result.data)
    // } catch (error) {
    //   const errMsg = error.response?.data?.message
    //   toast.error(errMsg)
    //   console.log(error)
    // }

    // เปลี่ยนมาส่งข้อมูลไปให้ backend แบบใช้ zustand โฟลเดอร์ store
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role  // log ดู res แล้วเข้าถึง role
      roleRedirect(role)       // เรียกฟังชั่น navigate ที่มีเงื่อนไข admin & user มาใช้
      toast.success('Welcome Back')
      console.log('role', role)
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  return (
    <div className={`${styles.container}`}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={hldSubmit} className={styles.formCard}>

        <label className={styles.label} >Email</label>
        <input className={styles.input}
          onChange={hdlOnChange}
          type='email'
          name='email'
        />

        <label className={styles.label}>Password</label>
        <input className={styles.input}
          onChange={hdlOnChange}
          type='text'
          name='password'
        />


        <button className={styles.submitButton}>Login</button>

      </form>

    </div>
  )
}

export default login