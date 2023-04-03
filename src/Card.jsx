import { useEffect, useState } from "react";
import { Types } from './Types.jsx'
import './Card.css'

const DATA_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

export function Card({id, cardType}) {
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
        .catch(error=>console.log(error))
    },[])
    
    const firstInMayusc = (str) => {
        return str.replace(/^\w/, (c)=>c.toUpperCase())
    }

    function colorSection(types){
        const color = types && 'var(--'+types[0]+')'
        return color
    }

    function colorHeader(types) {
        const color1 = types && 'var(--'+types[0]+')'
        const color2 = types && 'var(--'+types[1]+')'
        const styleHeader = 
            types&&
            (types[1]?
                {backgroundColor: color2} : 
                {backgroundColor: color1, filter: 'brightness(1.1)'})
        return styleHeader
    }

    return(
        <>
            <section 
                className='card' 
                style={{backgroundColor: colorSection(types)}}
            >
                <header 
                    className='header-card' 
                    style={colorHeader(types)}
                >
                    {num && 
                        <h3 className='id'>
                            #{num}
                        </h3>
                    }
                    {nombre && 
                        <h3 className='name'>{nombre}</h3>
                    }
                </header>
                    {url && 
                        <img 
                            className='img' 
                            src={url}
                            alt={'Imagen del pokemon numero: '+id} 
                        />
                    }
                <footer className='type-pokemon'>
                    <Types 
                        cardType={cardType}
                        key={'t'+num} 
                        types={types}
                    />
                </footer>
            </section>
        </>
        
    )
}