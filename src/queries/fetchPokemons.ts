// import { } from "@tanstack/react-query";
// import axios from "axios";
// import { FetchPokemonsVariables, PokemonModel } from "../models/pokemon-model";

import { gql } from "@apollo/client";

// export type FetchPokemonsProps = {
//     limit: number;
//     offset: number;
//     name: string;
// }

// export const fetchPokemons = async ({ queryKey }: { queryKey: [string, FetchPokemonsVariables] }): Promise<PokemonModel[]> => {

//     const [, { limit, offset, name }] = queryKey;

//     const query = `
//             query samplePokeAPIquery($limit: Int!, $offset: Int!, $_name: String!) {
//                 pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_ilike: $_name}}) {
//                 name
//                 id
//                 pokemon_v2_pokemonsprites {
//                     sprites
//                 }
//                 pokemon_v2_pokemontypes{
//                     id
//                     pokemon_v2_type{
//                     name
//                     }
//                 }
//                 }
//             }
//     `

//     const _variables = {
//         limit,
//         offset,
//         _name: name
//     }

//     const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
//         params: {
//             query,
//             variables: JSON.stringify(_variables)
//         }

//     });
//     return response.data.data.pokemon_v2_pokemon as PokemonModel[]
// }


export const fetchPokemons = gql`
  query samplePokeAPIquery($limit: Int!, $offset: Int!) {
  pokemon_v2_pokemon(
    limit: $limit, offset: $offset, 
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