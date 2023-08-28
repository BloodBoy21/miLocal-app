import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import Router from './router.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={Router} />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
)
