// import { TypeEnum } from "../enuns/TypeEnum"

export interface PokemonType {
    id: number;
    pokemon_v2_type: {
        name: string;
    };
}

export interface PokemonSprite {
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
}

export type PokemonModel = {
    name: string
    id: number
    pokemon_v2_pokemontypes: PokemonType[]
    pokemon_v2_pokemonsprites: PokemonSprite[]
}

export interface FetchPokemonsVariables {
    limit: number;
    offset: number;
    name: string;
}