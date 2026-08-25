import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './containers/App'
import PersonPage from './containers/PersonPage'
import registerServiceWorker from './registerServiceWorker';
import 'tachyons'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/person/:id' element={<PersonPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

registerServiceWorker();