import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

document.documentElement.style.setProperty(
  '--project-covers-image',
  `url("${import.meta.env.BASE_URL}assets/project-covers.png")`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
