/* eslint-disable react/prop-types */
import styles from './Pokemon.module.css';

function Pokemon ({ pokemon, typeOne, typeSecond, numberPkdx }) {
    return (
        <div className={styles.pokemonInfo}>
        {pokemon!=null && (
          <>
            <p>Nombre: {pokemon.name}</p>
            <p>Nº Pokedex: {numberPkdx}</p>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className={styles.pokemonTypes}>
            {typeOne && (
              <img className={styles.typeIcon} src={typeOne.sprites["generation-ix"]["scarlet-violet"].name_icon} alt={typeOne.name} />
            )}
            {typeSecond && (
              <img className={styles.typeIcon} src={typeSecond.sprites["generation-ix"]["scarlet-violet"].name_icon} alt={typeSecond.name} />
            )}
            </div>
          </>
        )}
      </div>
    );
}

export default Pokemon;