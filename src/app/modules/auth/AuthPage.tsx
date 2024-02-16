/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import ForgotPassword from './components/ForgotPassword'
import ResendVerification from './components/ResendVerification'
import ResetPassword from './components/ResetPassword'



const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <Outlet />
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='resend-verification' element={<ResendVerification />} />
      <Route path='reset-password/:token' element={<ResetPassword />} />
      <Route path='*' element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
