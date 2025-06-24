/* eslint-disable react/prop-types */

import styles from './Form.module.css';

function Form ({ handleChange, prevPokemon, nextPokemon }) {
    return (
        <>
        <form className={styles.pokemonForm}>
            <label htmlFor="pokemon">Buscar Pokémon:</label>
            <input type="text" id="pokemon" name="pokemon" placeholder="Ingrese el nombre del Pokémon" onChange={handleChange}/>
        </form>

        <button className={styles.pokemonButton} onClick={prevPokemon}>Previo</button>
        <button className={styles.pokemonButton} onClick={nextPokemon}>Siguiente</button>
        </>
    );
}

export default Form;