import { Box, Flex, Grid, GridItem, Image, Input, Stack, Text } from "@chakra-ui/react"
import { Layout } from "../../components/layout"
import wpp from "../../assets/images/wpp1.png"
import { SearchIcon } from "@chakra-ui/icons"
import { PokemonCard } from "./components/pokemonCard"
import { PokemonModel } from "../../models/pokemon-model"

export const PokemonsPage = () => {

    const test = [
        {
            name: "Charizard",
            type: "fire",
            id: 6,
            sprites: {
                back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
                back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png",
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
                front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png"
            }
        },
        {
            name: "Bulbasaur",
            type: "grass",
            id: 1,
            sprites: {
                back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
                back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
            }
        },
        {
            name: "Squirtle",
            type: "water",
            id: 7,
            sprites: {
                back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png",
                back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/7.png",
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
                front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png"
            }
        },
        {
            name: "Pikachu",
            type: "electric",
            id: 25,
            sprites: {
                back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
                back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
                front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
            }
        },
        {
            name: "Gengar",
            type: "ghost",
            id: 94,
            sprites: {
                back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png",
                back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png",
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
                front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png"
            }
        },
        {
            name: "Mewtwo",
            type: "psychic",
            id: 150,
            sprites: {
                back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png",
                back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/150.png",
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
                front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png"
            }
        }
    ] as PokemonModel[]

    return (
        <Layout>
            <Image
                src={wpp}
                position={"absolute"}
                top={0}
                left={0}
                style={{
                    filter: "blur(1)"
                }}
            />
            <Stack
                zIndex={2}
            >
                {/* <Box
                    bgColor={"white"}
                >
                    <Text
                        fontSize={"4xl"}
                        fontWeight={600}
                        color={"gray.900"}
                    >
                        Pokedex
                    </Text>
                </Box> */}
                <Flex
                    flexDir={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={20}
                    bgColor={"white"}
                    borderRadius={"md"}
                    color={"gray.800"}
                    px={6}
                    py={8}
                    w={"full"}
                >
                    <Box
                        display={"flex"}
                        flexDir={"column"}
                        gap={2}
                    >
                        <Text
                            fontSize={"3xl"}
                            fontWeight={700}
                        >
                            Nome ou Número
                        </Text>
                        <Flex
                            alignItems={"center"}
                            gap={3}
                        >
                            <Input
                                placeholder="Ex: Charizard"
                            />
                            <Box
                                bgColor={"indigo.500"}
                                p={2}
                                px={3}
                                borderRadius={"md"}
                                cursor={"pointer"}
                            >
                                <SearchIcon
                                    color={"white"}
                                />
                            </Box>

                        </Flex>

                        <Text
                            fontWeight={400}
                            color={"gray.700"}
                        >
                            Utilze a busca detalhada para especificar as suas informações
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        w={"30%"}

                    >
                        <Text
                            bgColor="indigo.500"
                            borderRadius={"md"}
                            px={4}
                            py={3}
                            fontSize={"lg"}
                            color={"white"}
                        >
                            Realize a busca pelo nome ou número do seu pokemon da Pokedex Nacional
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    flexDir={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={20}
                    bgColor={"white"}
                    borderRadius={"md"}
                    color={"gray.800"}
                    px={6}
                    py={8}
                    w={"full"}
                >
                    <Grid
                        gap={8}
                        templateColumns='repeat(5, 1fr)'
                    >
                        {
                            test.map((pokemon: any) => {
                                return (
                                    <GridItem
                                        key={pokemon.name}
                                        colSpan={1}
                                        rowSpan={1}
                                    >
                                        <PokemonCard
                                            pokemon={pokemon}
                                        />
                                    </GridItem>
                                )
                            })
                        }
                    </Grid>

                </Flex>
            </Stack>
        </Layout>
    )
} 