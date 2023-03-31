import { Card } from './Card.jsx'
import { useState } from 'react'
import './App.css'

const initialsArg = [1,152,252,387,495,650,722,810]
const initials = (arr) => {
  const respuesta = []
  for(let i=0;i<arr.length;i++){
    const num = arr[i]
    respuesta.push(num)
    for(let j=1; j<8; j++){
      respuesta.push(num+j)
    }
  }
  return respuesta
}

function App() {

    const [render, setRender] = useState(initials(initialsArg))

    return(
      <main>
        {
          render.map(num=>{
            return <Card className='card' key={num} id={num}/>
          })
        }              
      </main>
    )     
}

export default App
