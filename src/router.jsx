import Login from './pages/login'
import App from './App'
import Store from './pages/store'
import { Router, Route, RootRoute } from '@tanstack/react-router'
import LandingPage from './pages/landing'
// Create a root route
const rootRoute = new RootRoute({
  component: App
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login
})

const storeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/store/$storeId',
  component: Store
})

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, storeRoute])
const router = new Router({ routeTree })

export default router
