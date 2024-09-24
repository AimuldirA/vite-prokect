import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider> 
    </Provider>
  </StrictMode>,
)
