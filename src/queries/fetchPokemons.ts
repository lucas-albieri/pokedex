// import { } from "@tanstack/react-query";
// import axios from "axios";
// import { FetchPokemonsVariables, PokemonModel } from "../models/pokemon-model";

import { gql } from "@apollo/client";

export const fetchPokemons = gql`
  query samplePokeAPIquery($limit: Int!, $offset: Int!, $_name: String!) {
  pokemon_v2_pokemon(
    limit: $limit, offset: $offset, 
    where: {
      name: {_like: $_name}
    }
  )
   {
    name
    id
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemontypes {
      id
      pokemon_v2_type {
        name
      }
    }
  }
}
`;