import { useEffect, useState } from 'react';
import './App.css';

function App () {

  const [pokemon, setPokemon] = useState(null);
  const [typeOne, setTypeOne] = useState();
  const [typeSecond, setTypeSecond] = useState();
  const [numberPkdx, setNumberPkdx] = useState();

  const handleChange = (e, id = null) => {
    let pokemonName = '';
    if(e) {
      e.preventDefault();
      pokemonName = e.target.value.trim().toLowerCase();
    } else if (id !== null) {
      pokemonName = id.toString();
    }
    if (pokemonName === '') {
      setPokemon(null);
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        return response.json();
      })
      .then(data => {
        setPokemon(data);
        setNumberPkdx(data.id);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (pokemon) {
      console.log(`Nombre: ${pokemon.name}`);
      console.log(`Altura: ${pokemon.height}`);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemon && pokemon.types[0]) {
      fetch(pokemon.types[0].type.url)
        .then(response => response.json())
        .then(data => {
          setTypeOne(data);
          console.log(typeOne.sprites["generation-vi"]["x-y"]);
        });
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemon && pokemon.types[1]) {
      fetch(pokemon.types[1].type.url)
        .then(response => response.json())
        .then(data => {
          setTypeSecond(data);
          console.log(typeSecond.sprites["generation-vi"]["x-y"]);
        });
    }
    setTypeSecond(null);
  }, [pokemon]);

  const nextPokemon = () => {
    if (pokemon) {
      console.log(pokemon.id);
      const nextId = pokemon.id + 1;
      handleChange(null, nextId);
    }
  }

  const prevPokemon = () => {
    if (pokemon) {
      const prevId = pokemon.id - 1;
      handleChange(null, prevId);
    }
  }

  return (
    <>
      <h1>React Poke</h1>
      <form className="pokemon-form">
        <label htmlFor="pokemon">Buscar Pokémon:</label>
        <input type="text" id="pokemon" name="pokemon" placeholder="Ingrese el nombre del Pokémon" onChange={handleChange}/>
      </form>

      <button className="pokemon-button" onClick={prevPokemon}>Previo</button>
      <button className="pokemon-button" onClick={nextPokemon}>Siguiente</button>

      <div className="pokemon-info">
        {pokemon!=null && (
          <>
            <p>Nombre: {pokemon.name}</p>
            <p>Nº Pokedex: {numberPkdx}</p>
            <div className="pokemon-types">
            {typeOne && (
              <img className="type-icon" src={typeOne.sprites["generation-vi"]["x-y"].name_icon} alt={typeOne.name} />
            )}
            {typeSecond && (
              <img className="type-icon" src={typeSecond.sprites["generation-vi"]["x-y"].name_icon} alt={typeSecond.name} />
            )}
            </div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </>
        )}
      </div>
    </>
  )
  }

export default App;
