import './Search.css'
import { Types } from './Types.jsx'
import { useState, useEffect } from 'react'

const URL_ALL_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=901&offset=0'
const URL_POKEMON_TYPE = 'https://pokeapi.co/api/v2/type/'
const generationsArg = [1,152,252,387,495,650,722,810,1000]
const generationsId = [1,2,3,4,5,6,7,8] 

export function Search({searchRender,initialsRender}){

    const [allPokemon, setAllPokemon] = useState()
    const [pokemonsOfType, setPokemonsOfType] = useState()
    const [allTypes, setAllTypes] = useState()
    const [input, setInput] = useState()
    const [type, setType] = useState()
    const [show, setShow] = useState(false)
    const [generation, setGeneration] = useState()
    const [genSelected, setGenSelected] = useState()

    useEffect(()=>{
        fetch(URL_ALL_POKEMON)
        .then(res=>res.json())
        .then(data=>
            setAllPokemon(data.results.map(d=>d.name)))
        .catch(error=>console.log(error))
    },[])

    useEffect(()=>{
        fetch(URL_POKEMON_TYPE)
        .then(res=>res.json())
        .then(data=>setAllTypes(data.results.map(d=>d.name).slice(0,-2)))
        .catch(error=>console.log(error))
    },[])

    useEffect(()=>{
            fetch(URL_POKEMON_TYPE+type)
            .then(res=>res.json())
            .then(data=>
                setPokemonsOfType(data.pokemon
                    .map(d=> parseInt(d.pokemon.url
                        .split('/').slice(-2,-1)[0]))
                        .filter(p=>p<=901)))
            .catch(error=>console.log(error))
    },[type])


    //envia los pokemons seleccionados por tipo al App.jsx
    // también filtra los pokemons de dicho tipo viendo que 
    //aparezcan en allPokemons(lista de los primeros 1000)
    useEffect(()=>{
        if(pokemonsOfType&&generation){
            searchRender(pokemonsOfType.filter(p=>generation.includes(p)))
        } else if(pokemonsOfType){
            searchRender(pokemonsOfType)
        } else if(generation){
            searchRender(generation)
        }
    },[pokemonsOfType,generation])

    function handleInputChange (event) {
        setInput(event.target.value.toLowerCase())
    }

    function clickOption (event){
        setInput(event.target.value)
        event.target.parentNode.style.display='none'
        searchRender([event.target.value])
    }

    function initials(){
        setInput('')
        initialsRender()
        genBorderWhite()
        setGeneration()
        setPokemonsOfType()
        setGenSelected()
    }

    function cardType(t){
        setType(t)
    }

    function showButtons(){
        setShow(!show)
    }

    function selectGeneration(g,event){
        let start = generationsArg[g-1]
        let end = generationsArg[g]
        let arr = [];
        for(let i=start; i<=end; i++){
            arr.push(i);
        }
        setGeneration(arr)
        if(genSelected){
            genBorderWhite()
        }
        event.target.style.border='2px solid var(--fighting)'
        setGenSelected(event.target)
    }

    const resetGenerations = () => {
        setGeneration(Array.from(Array(901 - 1 + 1).keys(), num => num + 1))
        genBorderWhite()
    }

    const genBorderWhite = () =>{
        genSelected.style.border='2px solid #fff'
    }

    return(
        <header className='search-component'>
            <section className='search-bar'>
                <aside className='search-logo'>
                    <img
                        className='logo-pokedex' 
                        src='https://i.postimg.cc/9MZLVn40/pokedex-logo.png' 
                        alt='Logo de la pokedex'
                    />
                    
                </aside>
                <form className='search-form'>
                        <div className='lupa'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                        </div>
                        <input 
                            className='search-input'
                            type='text'
                            placeholder='Escriba el nombre de un pokemon...'
                            value={input}
                            onChange={handleInputChange}
                            list='nombres'
                        >  
                        </input>
                        <div 
                            onClick={initials}
                            className='refresh'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                            </svg>
                        </div>
                        { input &&
                            <datalist 
                                id='nombres'
                            >
                                {allPokemon&&
                                    allPokemon
                                        .filter(p=>p.includes(input))
                                        .map(p=><option 
                                                    value={p}
                                                    onClick={clickOption}
                                                >{p}
                                                </option>)
                                }
                            </datalist>
                        }
                </form>
            </section>
            {show &&
                <section className='all-types'>
                    <Types 
                        types={allTypes}
                        cardType={cardType}
                    />
                </section>                
            }
            {
                show && 
                <section className='generations'>
                    {generationsId.map(g=>{
                        return (
                                <h3
                                    className='generation-button'
                                    onClick={(event)=>selectGeneration(g,event)}
                                >{'GENERATION '+g}</h3>
                        )
                    })}
                    <h3 
                        className='generation-button'
                        onClick={resetGenerations}
                    >ALL GENERATIONS
                    </h3>
                </section>
            }
            <div 
                className='arrow-button'
                onClick={showButtons}
            >
            { show ||                
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-fold-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 11v8l3 -3m-6 0l3 3" />
                <line x1="9" y1="7" x2="10" y2="7" />
                <line x1="14" y1="7" x2="15" y2="7" />
                <line x1="19" y1="7" x2="20" y2="7" />
                <line x1="4" y1="7" x2="5" y2="7" />
              </svg>
            }
            { show && 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-fold-up" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 13v-8l-3 3m6 0l-3 -3" />
                <line x1="9" y1="17" x2="10" y2="17" />
                <line x1="14" y1="17" x2="15" y2="17" />
                <line x1="19" y1="17" x2="20" y2="17" />
                <line x1="4" y1="17" x2="5" y2="17" />
              </svg>
            }
            </div>
        </header>
        
    )
}