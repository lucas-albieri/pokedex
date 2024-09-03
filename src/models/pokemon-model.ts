// import { TypeEnum } from "../enuns/TypeEnum"

export interface PokemonType {
    id: number;
    pokemon_v2_type: {
        name: string;
    };
}

export interface PokemonSprite {
    sprites: {
        front_default: string
        other: {
            "official-artwork": {
                front_default: string
                front_shiny: string
                back_default: string
            },
            "dream-world": {
                front_default: string
            },
            "home": {
                front_default: string
            },
            showdown: {
                front_default: string
                front_shiny: string
            }
        }
    }
}
export interface PokemonAbility {
    pokemon_v2_ability: {
        name: string
    }
}

export interface PokemonStat {
    pokemon_v2_stat: {
        name: string
    }
    base_stat: number
}

export interface PokemonSpecies {
    pokemon_v2_pokemonspeciesflavortexts: {
        flavor_text: string
    }[]
}

export type PokemonModel = {
    name: string
    id: number
    pokemon_v2_pokemontypes: PokemonType[]
    pokemon_v2_pokemonsprites: PokemonSprite[]
    pokemon_v2_pokemonabilities?: PokemonAbility[]
    pokemon_v2_pokemonstats?: PokemonStat[]
    pokemon_v2_pokemonspecy?: PokemonSpecies
}

export interface FetchPokemonsVariables {
    limit: number;
    offset: number;
    name: string;
}