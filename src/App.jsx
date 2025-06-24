import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Pokemon from './components/Pokemon';

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
      <Form handleChange={handleChange} prevPokemon={prevPokemon} nextPokemon={nextPokemon} />
      <Pokemon pokemon={pokemon} typeOne={typeOne} typeSecond={typeSecond} numberPkdx={numberPkdx} />
    </>
  )
  }

export default App;
