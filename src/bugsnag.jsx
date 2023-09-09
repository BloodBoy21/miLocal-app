import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
const KEY = import.meta.env.VITE_BUGSNAG_KEY
Bugsnag.start({
  apiKey: KEY,
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react')
  .createErrorBoundary(React)

export default ErrorBoundary
