import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstApp from './FirstApp'
import SecondApp from './SecondApp'

function App(){
  return (
  <div>
  <h1>Hola Mundo</h1>
  <FirstApp/>
  <SecondApp value ={12}/>
  </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
