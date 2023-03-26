import { useState, useEffect } from 'react'

const DATA_POKEMON_NAME = 'https://pokeapi.co/api/v2/pokemon/'
const DATA_POKEMON_NAME_LIST = DATA_POKEMON_NAME + '?offset=0&limit=1281'

function App() {
  const [namesList, setNamesList] = useState()
  const [pokemonName, setPokemonName] = useState()
  const [imagenPokemon, setImagenPokemon] = useState()
  // Fetching de nombres de todos los pokemon

  useEffect(() => {
    fetch(DATA_POKEMON_NAME_LIST)
    .then(res => res.json())
    .then(data => {
      setNamesList(data.results.map(e=>{return e.name}))
    })
  },[])
  console.log(namesList)

  // Fetching de datos del pokemon seleccionado
  useEffect(() => {
    fetch(`${DATA_POKEMON_NAME}${pokemonName}`)
    .then(res => res.json())
    .then(data => {
      setImagenPokemon(data.sprites.front_default)
    })
    }
  ,[pokemonName])

  // Set del estado del nombre del pokemon y preventdefault para evitar que se recargue la página con el submit
  const handleSubmit = (event) =>  {
    console.log(event.target[0].value);
    setPokemonName(event.target[0].value)
    event.preventDefault();
  }
    return(
      <main>
        <form onSubmit={handleSubmit}>
          <label>Inserte nombre de pokemon
            <input type='text' name='name' value={pokemonName}></input>
          </label>
            <input type='submit' value='Submit'></input>
        </form>
        {imagenPokemon && 
          <img src={imagenPokemon} alt='Imagen del pokemon seleccionado'/>
        }              
      </main>
    )     
}

export default App
