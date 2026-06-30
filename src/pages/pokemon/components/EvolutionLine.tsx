import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { PokemonSprite } from "../../../models/pokemon-model"
import { useSearchParams } from "react-router-dom"

type Props = {
    accentColor: string
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

export default function EvolutionLine({ evolutionChain, accentColor }: Props) {

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <Flex
            width={"100%"}
            direction="column"
            mt={{ base: 6, md: 0 }}
            pt={{ base: 6, md: 8 }}
            borderTop={"1px solid"}
            borderColor={"gray.200"}
        >
            <Flex
                gap={3}
            >
                <Box
                    w={"6px"}
                    h={{ base: "24px", md: "32px" }}
                    borderRadius={"full"}
                    bgColor={accentColor}
                    display={"flex"}
                />
                <Box
                >
                    <Text
                        fontSize={{ base: "xl", md: "3xl" }}
                        fontWeight={"bold"}
                        lineHeight={1.1}
                    >
                        Linha evolutiva
                    </Text>
                    <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color={"gray.500"}
                    >
                        Todas as suas formas evolutivas
                    </Text>
                </Box>
            </Flex>
            <Flex
                gap={4}
                mt={4}
                flexWrap={"wrap"}
                w={"100%"}
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
                            boxSize="150px"
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