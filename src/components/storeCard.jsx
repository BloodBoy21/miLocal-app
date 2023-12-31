import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'
import PropTypes from 'prop-types'
import Router from '../router'

const goToStore = (id) => {
  Router.navigate({
    to: `/store/${id}`
  })
}

const CardStore = ({
  name,
  address,
  image,
  storeId
}) => {
  return (
    <Card className="mt-6 w-96">
      {image && (
        <CardHeader color="blue-gray" className="relative h-56" >
        <img
          src={image}
          alt={`Store ${name}`}
        />
      </CardHeader>
      )}
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography>
          {address}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="blue-gray" onClick={() => goToStore(storeId)}>
          View
        </Button>
      </CardFooter>
    </Card>
  )
}

CardStore.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.string
}

export default CardStore
