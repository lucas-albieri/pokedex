import { TypeEnum } from "../enuns/TypeEnum"

export type PokemonModel = {
    name: string
    type: TypeEnum
    image?: string
    id: number
    // base_experience: number
    // height: number
    // weight: number
    // abilities: string[]
    // stats: {
    //     hp: number
    //     attack: number
    //     defense: number
    //     special_attack: number
    //     special_defense: number
    //     speed: number
    // }
    // types: string[]
    // moves: string[]
    sprites?: {
        back_default: string
        back_shiny: string
        front_default: string
        front_shiny: string
    }
}