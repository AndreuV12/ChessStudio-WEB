import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.css';

import { Provider } from './hooks/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <App/>
  </Provider>
  
)
