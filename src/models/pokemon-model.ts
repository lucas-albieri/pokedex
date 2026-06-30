
export interface PokemonType {
    id: number;
    pokemon_v2_type: {
        name: string;
        pokemon_v2_typeefficacies: {
            damage_factor: number;
            pokemonV2TypeByTargetTypeId: {
                name: string;
            };
        }[];
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
    is_hidden?: boolean
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
    gender_rate: number
    capture_rate?: number
    base_happiness?: number
    is_legendary?: boolean
    is_mythical?: boolean
    pokemon_v2_pokemonspeciesnames?: {
        genus: string
    }[]
    pokemon_v2_pokemonegggroups?: {
        pokemon_v2_egggroup: {
            name: string
        }
    }[]
    pokemon_v2_evolutionchain: {
        id: number
        pokemon_v2_pokemonspecies: {
            name: string
            pokemon_v2_pokemons: {
                id: number
                pokemon_v2_pokemonsprites: PokemonSprite
            }[]
        }[]
    }
}

export type PokemonModel = {
    pokemon_v2_type: PokemonType[]
    name: string
    id: number
    height: number
    weight: number
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
