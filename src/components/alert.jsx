import { Alert, Typography } from '@material-tailwind/react'
import { Info } from '@mui/icons-material'
const TYPES = {
  info: 'blue',
  success: 'green',
  warning: 'orange',
  error: 'red'
}

const AlertNotification = ({
  type = 'info',
  message = '',
  Icon = Info
}) => {
  return (
    <Alert color={TYPES[type]} icon={<Icon />} className='w-full'>
      <Typography variant="paragraph" color="white">{message}</Typography>
      </Alert>
  )
}

export default AlertNotification
