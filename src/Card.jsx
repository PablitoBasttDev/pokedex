import { useEffect, useState, useRef } from "react";
import { Types } from './Types.jsx'
import './Card.css'

const DATA_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

export function Card({id, cardType}) {
    
    const nameOrId = id;

    const [num, setNum] = useState()
    const [nombre, setNombre] = useState()
    const [url, setUrl] = useState()
    const [types, setTypes] = useState()
    const [urlShiny, setUrlShiny] = useState()
    const [shiny,setShiny] = useState(false)

    const accederId = useRef(null)
    
    useEffect(()=>{
        fetch(`${DATA_POKEMON}${nameOrId}`)
        .then(res=>res.json())
        .then(data=> {
            setNum(data.id)
            setNombre(firstInMayusc(data.species.name))
            setUrl(data.sprites.front_default)
            setUrlShiny(data.sprites.front_shiny)
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

    function isShiny(){
        setShiny(!shiny)
        shiny 
            ? accederId.current.classList.remove('shiny')
            : accederId.current.classList.add('shiny')
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
                        <h3 
                            className='id'
                            ref={accederId}
                        >
                            #{num}
                        </h3>
                    }
                    {nombre && 
                        <h3 className='name'>{nombre}</h3>
                    }
                </header>
                    {url && 
                        <img 
                            onClick={isShiny}
                            className='img' 
                            src={urlShiny? (shiny ? urlShiny : url) : url}
                            alt={'Imagen del pokemon numero: '+num} 
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