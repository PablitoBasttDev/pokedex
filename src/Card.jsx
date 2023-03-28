import { useEffect, useState } from "react";
import { Types } from './Types.jsx'
import './Card.css'

const DATA_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

export function Card({id}) {
    const num = id;
    const [nombre, setNombre] = useState()
    const [url, setUrl] = useState()
    const [types, setTypes] = useState()
    
    useEffect(()=>{
        fetch(`${DATA_POKEMON}${num}`)
        .then(res=>res.json())
        .then(data=> {
            setNombre(firstInMayusc(data.species.name))
            setUrl(data.sprites.front_default)
            setTypes(data.types.map(t=>t.type.name))
        })
    },[])
    
    const firstInMayusc = (str) => {
        return str.charAt(0).toUpperCase().concat(str.substring(1,str.length))
    }

    const color1 = types && 'var(--'+types[0]+')'

    return(
        <>
            <section className='card' style={{backgroundColor: color1}}>
                <header className='header-card'>
                    {num&&<h3 className='id'>#{num}</h3>}
                    {nombre&&<h3 className='name'>{nombre}</h3>}
                </header>
                    {url&&<img className='img' src={url} alt={'Imagen del pokemon numero: '+id} />}
                <footer className='type-pokemon'>
                    <Types key={num} types={types}/>
                </footer>
            </section>
        </>
        
    )
}