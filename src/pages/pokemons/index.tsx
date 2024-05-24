import { Box, Flex, Grid, GridItem, Image, Input, Stack, Text } from "@chakra-ui/react"
import { Layout } from "../../components/layout"
import wpp from "../../assets/images/wpp1.png"
import { SearchIcon } from "@chakra-ui/icons"
import { PokemonCard } from "./components/pokemonCard"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { fetchPokemons } from "../../queries/fetchPokemons"

export const PokemonsPage = () => {

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const allPokemonsOfLimit = useQuery(fetchPokemons,
        {
            variables: {
                limit: limit,
                offset: offset,
                _name: '%%',
                id: 0,
            }
        });

    const pokemons = allPokemonsOfLimit.data?.pokemon_v2_pokemon


    if (allPokemonsOfLimit.loading) return <Text>Carregando...</Text>

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
                    bgColor={"gray.100"}
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
                            pokemons?.map((pokemon: any) => {
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