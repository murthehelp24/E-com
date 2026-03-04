import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'

const MainNav = () => {
  return (
    <nav className={styles.navContainer}>
      <div className='mx-auto px-3'>
        <div className='flex justify-between h-16'>
          <div className='flex  items-center gap-3'>
            <Link to={'/'} className={styles.logo}>LOGO</Link>
            <Link to={'/'} className={styles.navLink}>Home</Link>
            <Link to={'/shop'} className={styles.navLink}>Shop</Link>
            <Link to={'/cart'} className={styles.navLink}>Cart</Link>
          </div>

          <div className='flex items-center gap-3'>
            <Link to={'/register'} className={styles.navLink}>Register</Link>
            <Link to={'/login'}className={styles.navLink}>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MainNav