import { useCallback, useState } from 'react'
import { Son } from './Son'
import './App.css'

export const Father = () =>{
  const list = [2,4,6,8]
  const [valor, setValor] = useState(0)

  const mostrar = useCallback((num) =>{
    setValor(valor + num)},[]);

  return(
    <div>
      <h1> Father </h1>
      <p> Total: {valor}</p>
      <hr/>

      {
        list.map((n,idx) =>{
          return(
            <Son
                key={idx}
                numero={n}
                mostrar={mostrar}
            
            />
          )
        })
      }


    </div>
  )

}