import { gql } from "@apollo/client";

export const fetchPokemonById = gql`
 query GetPokemonInfo($name: String!) {
  pokemon_v2_pokemon(where: { name: { _like: $name } }) {
    id
    name
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
        pokemon_v2_typenames {
          name
        }
        pokemon_v2_typeefficacies(where: { damage_factor: { _gt: 100 } }) {
          damage_factor
          pokemonV2TypeByTargetTypeId {
            name
          }
        }
      }
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
        pokemon_v2_abilitynames {
          name
        }
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonstats {
      pokemon_v2_stat {
        name
        pokemon_v2_statnames {
          name
        }
      }
      base_stat
    }
    pokemon_v2_pokemonspecy {
      pokemon_v2_pokemonspeciesflavortexts(limit: 1) {
        flavor_text
      }
      gender_rate
    }
  }
}
`;