import { useParams } from '@tanstack/react-router'
import { useGetStore, useGetStoreInfo } from '../hooks/store'
import { useEffect } from 'react'
import { Input, Typography, Button } from '@material-tailwind/react'
import { Search, Map } from '@mui/icons-material'
import ProductCard from '../components/productCard'

const googleMapsUrl = (lat, lng) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

const ProductList = ({ products = [] }) => {
  return (
    <div className='flex gap-4 w-full justify-center px-2'>
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          name={product.name}
          description={product.description}
          image={product.image}
          stock={product.stock}
          price={product.price}
        />
      ))}
    </div>
  )
}

function Store () {
  const { storeId } = useParams()
  const { data, refetch } = useGetStore(storeId)
  const { data: storeInfo } = useGetStoreInfo(storeId)
  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <main className='flex flex-col items-center h-screen w-full '>
      <nav className='flex items-center justify-center w-full h-1/6 gap-2 px-4'>
        <div className='w-4/6  flex justify-end'>
          <div className='w-1/2'>
            <Input
              size='md'
              label='Search product'
              icon={<Search size='md' />}
            />
          </div>
        </div>
        <div className='flex  items-center  gap-5 w-2/6 '>
          <Button
            className='flex items-center justify-center gap-1'
            size='sm'
            onClick={() =>
              window.open(googleMapsUrl(storeInfo?.lat, storeInfo?.lng))
            }
          >
            <Map size='xs' />
            Open in maps
          </Button>
            <Typography variant="lead" >{storeInfo?.name},{storeInfo?.address}</Typography>
        </div>
      </nav>
      <section className='flex items-center justify-center w-full h-auto'>
        <div className='w-full flex flex-col'>
          <div className='w-full flex flex-col px-5 gap-2'>
            <Typography variant='h3' className="capitalize">sales</Typography>
            <div className='w-full  flex flex-col items-center justify-center gap-2'>
              <ProductList products={data} />
            </div>
          </div>
        </div>
        <div>

        </div>
        <div></div>
      </section>
    </main>
  )
}
export default Store
