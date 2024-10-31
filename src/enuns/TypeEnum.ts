export enum TypeEnum {
    fire = "fire",
    water = "water",
    grass = "grass",
    bug = "bug",
    normal = "normal",
    poison = "poison",
    electric = "electric",
    ground = "ground",
    fairy = "fairy",
    fighting = "fighting",
    psychic = "psychic",
    rock = "rock",
    ghost = "ghost",
    ice = "ice",
    dragon = "dragon",
    flying = "flying",
    steel = "steel",
    dark = "dark"
}

export const typeColors = {
    [TypeEnum.fire]: "#FF7D0A",
    [TypeEnum.water]: "#6390F0",
    [TypeEnum.grass]: "#78C850",
    [TypeEnum.bug]: "#A8B820",
    [TypeEnum.normal]: "#A8A878",
    [TypeEnum.poison]: "#A040A0",
    [TypeEnum.electric]: "#F8D030",
    [TypeEnum.ground]: "#E0C068",
    [TypeEnum.fairy]: "#EE99AC",
    [TypeEnum.fighting]: "#C03028",
    [TypeEnum.psychic]: "#F85888",
    [TypeEnum.rock]: "#B8A038",
    [TypeEnum.ghost]: "#705898",
    [TypeEnum.ice]: "#98D8D8",
    [TypeEnum.dragon]: "#5555c4",
    [TypeEnum.flying]: "#A890F0",
    [TypeEnum.steel]: "#B8B8D0",
    [TypeEnum.dark]: "#2a2c4a"
}

export function getTypeTranslations(type: TypeEnum) {
    switch (type) {
        case TypeEnum.fire:
            return "Fogo"
        case TypeEnum.water:
            return "Água"
        case TypeEnum.grass:
            return "Planta"
        case TypeEnum.bug:
            return "Inseto"
        case TypeEnum.normal:
            return "Normal"
        case TypeEnum.poison:
            return "Venenoso"
        case TypeEnum.electric:
            return "Elétrico"
        case TypeEnum.ground:
            return "Terra"
        case TypeEnum.fairy:
            return "Fada"
        case TypeEnum.fighting:
            return "Lutador"
        case TypeEnum.psychic:
            return "Psíquico"
        case TypeEnum.rock:
            return "Pedra"
        case TypeEnum.ghost:
            return "Fantasma"
        case TypeEnum.ice:
            return "Gelo"
        case TypeEnum.dragon:
            return "Dragão"
        case TypeEnum.flying:
            return "Voador"
        case TypeEnum.steel:
            return "Aço"
        case TypeEnum.dark:
            return "Noturno"
    }
} 