import './index.scss'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ResourceCacheContext } from './cache'
import App from './App'

const cache = new Map()

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <HelmetProvider>
      <ResourceCacheContext.Provider value={cache}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ResourceCacheContext.Provider>
    </HelmetProvider>
  </StrictMode>
)
