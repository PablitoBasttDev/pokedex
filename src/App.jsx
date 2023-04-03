import { Card } from './Card.jsx'
import { CardType } from './CardType.jsx'
import { useEffect, useState } from 'react'
import './App.css'

const initialsArg = [1,152,252,387,495,650,722,810]
const initials = (arr) => {
  const respuesta = []
  for(let i=0;i<arr.length;i++){
    const num = arr[i]
    respuesta.push(num)
    for(let j=1; j<=8; j++){
      respuesta.push(num+j)
    }
  }
  return respuesta
}

// URL para el fetching de debilidades y resistencias del tipo pokemon
const URL_TYPES = 'https://pokeapi.co/api/v2/type/'

function App() {

    const [render, setRender] = useState(initials(initialsArg))
    const [renderCardType, setRenderCardType] = useState()
    const [dataCardType, setDataCardType] = useState()


    const cardType = (type) => {
      setRenderCardType(type)
    }

    useEffect(()=>{
      renderCardType &&
      fetch(URL_TYPES+renderCardType)
      .then(res=>res.json())
      .then(data=>{
        const name = [data.name]
        const doubleDamageFrom = data.damage_relations.double_damage_from.map(i=>i.name)
        const doubleDamageTo = data.damage_relations.double_damage_to.map(i=>i.name)
        const halfDamageFrom = data.damage_relations.half_damage_from.map(i=>i.name)
        const halfDamageTo = data.damage_relations.half_damage_to.map(i=>i.name)
        const noDamageFrom = data.damage_relations.no_damage_from.map(i=>i.name)
        const noDamageTo = data.damage_relations.no_damage_to.map(i=>i.name)

        setDataCardType({
          name: name,
          doubleDamageFrom: doubleDamageFrom, 
          doubleDamageTo: doubleDamageTo,
          halfDamageFrom: halfDamageFrom,
          halfDamageTo: halfDamageTo,
          noDamageFrom: noDamageFrom,
          noDamageTo: noDamageTo
        })
      
      })
      .catch(error=>console.log(error))
    },[renderCardType])

    function buttonClose(){
      setDataCardType()
    }

    return(
      <main>
        {
          render.map(num=>{
            return (
              <Card 
                className='card' 
                key={num} 
                id={num}
                cardType={cardType}
              />
            )
          })
        }
        {
          dataCardType && 
          <CardType 
            key={dataCardType.name[0]} 
            dataCardType={dataCardType}
            cardType={cardType}
            buttonClose={buttonClose}
          />
        }              
      </main>
    )     
}

export default App
