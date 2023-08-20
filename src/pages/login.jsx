import SignupUser from '../components/signup'
import LoginUser from '../components/login'
import { useState } from 'react'
const Login = () => {
  const [createUSer, changeForm] = useState(0)
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        {createUSer
          ? (
          <SignupUser toggleForm={() => changeForm(!createUSer)} />
            )
          : (
          <LoginUser toggleForm={() => changeForm(!createUSer)} />
            )}
      </section>
    </>
  )
}

export default Login
