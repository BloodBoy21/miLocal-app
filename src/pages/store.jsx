import { useParams } from '@tanstack/react-router'
import {
  useGetStoreProducts,
  useGetStoreInfo,
  useGetAllStoreProducts
} from '../hooks/store'
import { useEffect } from 'react'
import {
  Input,
  Typography,
  Button,
  Breadcrumbs
} from '@material-tailwind/react'
import { Search, Map } from '@mui/icons-material'
import ProductCard from '../components/productCard'
import _ from 'lodash'
const PRODUCTS_SECTIONS = ['sales', 'all']
const googleMapsUrl = (lat, lng) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

const ProductList = ({ products = [] }) => {
  return (
    <div className='flex gap-4 w-full px-2 mt-1'>
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          name={product.name}
          description={product.description}
          image={product.image}
          stock={product.stock}
          price={product.price}
          discount={product.discount}
        />
      ))}
    </div>
  )
}

const ProductSection = ({ products = [], section }) => {
  return _.isEmpty(products)
    ? null
    : (
    <div className='w-full flex flex-col px-5 gap-2'>
      <Typography variant='h3' className='capitalize'>
        {section}
      </Typography>
      <div className='w-full  flex flex-col items-center gap-2 h-1.3'>
        <ProductList products={products} />
      </div>
    </div>
      )
}

function Store () {
  const { storeId } = useParams()
  const { data: saleProducts, refetch: refetchSales } = useGetStoreProducts(
    storeId,
    {
      sale: true
    }
  )
  const { data: products, refetch: refetchAll } =
    useGetAllStoreProducts(storeId)
  const { data: storeInfo } = useGetStoreInfo(storeId)
  useEffect(() => {
    refetchAll()
    refetchSales()
  }, [refetchAll, refetchSales])
  return (
    <main className='flex flex-col items-center h-screen w-full '>
      <nav className='flex items-center justify-center w-full h-1/6 gap-2 px-4'>
        <div className='w-4/6  flex justify-between '>
          <Breadcrumbs className='bg-transparent'>
          <a href='/' className='opacity-60'>
            Stores
          </a>
            <a href={`/${storeId}`}>{storeInfo?.name}</a>
        </Breadcrumbs>
          <div className='w-1/2'>
            <Input
              size='md'
              label='Search product'
              icon={<Search size='md' />}
            />
          </div>
        </div>
        <div className='flex  items-center  gap-5 w-2/6 pl-2 '>
          <Button
            className='flex items-center justify-center gap-1'
            size='sm'
            onClick={() =>
              window.open(googleMapsUrl(storeInfo?.lat, storeInfo?.long))
            }
          >
            <Map size='xs' />
            Open in maps
          </Button>
          <Typography variant='lead'>
            {storeInfo?.name},{storeInfo?.address}
          </Typography>
        </div>
      </nav>
      <section className='flex items-center justify-center w-full h-auto'>
        <div className='w-full flex flex-col'>
          {PRODUCTS_SECTIONS.map((section) => (
            <ProductSection
              key={section}
              products={section === 'sales' ? saleProducts : products}
              section={section}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
export default Store
