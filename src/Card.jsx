import { useEffect, useState } from "react";

const DATA_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

export function Card({id}) {
    const num = id;
    const [nombre, setNombre] = useState()
    const [url, setUrl] = useState()
    
    useEffect(()=>{
        fetch(`${DATA_POKEMON}${num}`)
        .then(res=>res.json())
        .then(data=> {
            setNombre(firstInMayusc(data.species.name))
            setUrl(data.sprites.front_default)
        })
    },[])

    const firstInMayusc = (str) => {
        return str.charAt(0).toUpperCase().concat(str.substring(1,str.length))
    }

    return(
        <>
            {num&&<h3>{num}</h3>}
            {nombre&&<h3>{nombre}</h3>}
            {url&&<img src={url} alt={'Imagen del pokemon numero: '+id} />}
        </>
    )
}