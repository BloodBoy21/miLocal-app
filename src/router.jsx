import login from './pages/login'
import App from './App'
import { Router, Route, RootRoute } from '@tanstack/react-router'

// Create a root route
const rootRoute = new RootRoute({
  component: App
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: login
})

const routeTree = rootRoute.addChildren([loginRoute])
const router = new Router({ routeTree })

export default router
