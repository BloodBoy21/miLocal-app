import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import {
  Card,
  Input,
  Button,
  Typography
} from '@material-tailwind/react'
import { UseLogin } from '../hooks/user'

const Login = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { error, mutate } = UseLogin()
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      }
    })
    if (error) {
      console.log(error)
    }
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Welcome back, login to continue.
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true
            })}
          />

          <Input
            {...register('password', { required: true })}
            type="password"
            label="Password"
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Let me in!
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          You don&rsquo;t have an account?{' '}
          <a
            href="#"
            className="font-medium text-gray-900"
            onClick={() => toggleForm()}
          >
            Create One
          </a>
        </Typography>
      </form>
    </Card>
  )
}
Login.propTypes = {
  toggleForm: PropTypes.func.isRequired
}
export default Login
