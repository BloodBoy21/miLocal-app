import Login from './pages/login'
import App from './App'
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

const routeTree = rootRoute.addChildren([homeRoute, loginRoute])
const router = new Router({ routeTree })

export default router
