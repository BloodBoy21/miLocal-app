import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'
const CardProduct = ({
  name,
  description,
  image,
  stock,
  price
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }
  return (
    <Card className="mt-6 w-96">
      {image && (
        <CardHeader className="relative h-56" >
        <img
          src={image}
          alt={`${name}`}
        />
      </CardHeader>
      )}
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Stock: {stock}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {formatPrice(price)}
        </Typography>
        <Button color="blue">
          View
        </Button>
      </CardFooter>
    </Card>
  )
}
export default CardProduct
