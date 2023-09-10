import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'

const getDiscount = (price, discount) => {
  if (!discount) return price
  return price - (price * discount) / 100
}

const CardProduct = ({ name, description, image, stock, price, discount }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }
  return (
    <Card className='flex w-96 bg-inherit'>
      <CardBody className='mt-2'>
        {image && (
          <CardHeader className='mb-2'>
            <img
              src={image}
              alt={`${name}`}
              style={{ objectFit: 'cover', height: '200px' }}
            />
          </CardHeader>
        )}
        <Typography variant='h5' color='blue-gray' className='mb-2'>
          {name}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className='pt-0'>
        <Typography variant='h6' color='blue-gray'>
          Stock: {stock}
        </Typography>
        {discount > 0 && (
          <Typography
            variant='h6'
            color='red'
            className='line-through font-bold'
          >
            {formatPrice(price)}
          </Typography>
        )}
        <Typography variant='h6' color='blue-gray' className='mb-2'>
          {formatPrice(getDiscount(price, discount))}
        </Typography>
        <Button color='blue'>View</Button>
      </CardFooter>
    </Card>
  )
}
export default CardProduct
