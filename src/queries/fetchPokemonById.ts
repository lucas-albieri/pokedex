import { gql } from "@apollo/client";

export const fetchPokemonById = gql`
  query GetPokemonInfo($name: String!) {
    pokemon_v2_pokemon(where: { name: { _like: $name } }) {
      id
      name
      height
      weight
      base_experience
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
        is_hidden
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
        capture_rate
        base_happiness
        is_legendary
        is_mythical
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 9 } }, limit: 1) {
          genus
        }
        pokemon_v2_pokemonegggroups {
          pokemon_v2_egggroup {
            name
          }
        }

        # Evolução superior
        pokemon_v2_evolutionchain {
          id
          pokemon_v2_pokemonspecies {
            name
            pokemon_v2_pokemons {
              id
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
      }
    }
  }
`;
