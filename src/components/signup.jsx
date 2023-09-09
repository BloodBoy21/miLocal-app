import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography
} from '@material-tailwind/react'
import AlertNotification from './alert'
import UserStore from '../storages/user'
import Router from '../router'
import { UseRegister } from '../hooks/user'

const createAlert = (error) => {
  const {
    response: {
      data: { detail }
    }
  } = error
  const alerts = detail.map((error) => {
    const { loc, msg } = error
    const source = loc[1]
    const message = `${source}: ${msg}`
    return <AlertNotification type="error" message={message} key={loc.join('_')} />
  })
  return (
    <div className="mb-4 box-border flex flex-col gap-2">
      {alerts}
    </div>
  )
}

const Signup = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { setUser } = UserStore()
  const { error, mutate } = UseRegister()
  const onSubmit = (body) => {
    mutate(body, {
      onSuccess: (data) => {
        setUser(data)
        Router.navigate({
          to: '/'
        })
      }
    })
  }

  return (
    <Card color="transparent" shadow={false} className='flex flex-col justify-center items-center'>
      {error && createAlert(error)}
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Thank you for joining us!<br></br>Please fill in the form to proceed.
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-3">
          <Input type="text" label="Name" {...register('first_name')} />
          <Input type="text" label="Last name" {...register('last_name')} />
          <Input
            type="email"
            label="Email"
            {...register('email', { required: true })}
          />

          <Input
            {...register('password', { required: true })}
            type="password"
            label="Password"
          />

          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button className="mt-6" fullWidth type="submit">
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{' '}
          <a
            href="#"
            className="font-medium text-gray-900"
            onClick={() => toggleForm()}
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  )
}

Signup.propTypes = {
  toggleForm: PropTypes.func.isRequired
}
export default Signup
