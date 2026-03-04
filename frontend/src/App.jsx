import React from 'react'
import AppRouter from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';



const App = () => {
  return (
    <>
      <AppRouter router />
      <ToastContainer />
    </>
  )
}

export default App

