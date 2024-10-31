import { Flex, Image, Text } from "@chakra-ui/react"
import { PokemonSprite } from "../../../models/pokemon-model"
import { useSearchParams } from "react-router-dom"

type Props = {
    evolutionChain: {
        id: number
        pokemon_v2_pokemonspecies: {
            name: string
            pokemon_v2_pokemons: {
                id: number
                pokemon_v2_pokemonsprites: PokemonSprite[]
            }[]
        }[]
    }
}

export default function EvolutionLine({ evolutionChain }: Props) {

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <Flex
            direction="column"
            mt={{
                base: 2,
                md: 0
            }}
        >
            <Text
                fontWeight={"bold"}
                fontSize={"xl"}
            >
                Linha evolutiva
            </Text>
            <Flex
                gap={4}
                mt={2}
                flexWrap={"wrap"}
            >
                {evolutionChain.pokemon_v2_pokemonspecies.map((species) => (
                    <Flex
                        key={species.pokemon_v2_pokemons[0].id}
                        direction="column"
                        alignItems="center"
                        justifyContent={"center"}
                        onClick={() => {
                            searchParams.set('name', species.name)
                            setSearchParams(searchParams)
                        }}
                        cursor={"pointer"}
                        _hover={{
                            opacity: 0.8
                        }}
                    >
                        <Image
                            src={species.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                            alt={species.name}
                            boxSize="100px"
                            objectFit={"contain"}
                        />
                        <Text
                            fontWeight={species.name === searchParams.get('name') ? "bold" : "normal"}
                            textTransform={"capitalize"}
                            textAlign={"center"}
                        >
                            {species.name}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}