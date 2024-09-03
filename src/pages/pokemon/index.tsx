import { useQuery } from "@apollo/client";
import { Layout } from "../../components/layout"
import { useSearchParams } from "react-router-dom";
import { Box, Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { PokemonModel } from "../../models/pokemon-model";
import { fetchPokemonById } from "../../queries/fetchPokemonById";

export const PokemonPage = () => {

    const [searchParams] = useSearchParams();

    const pokemonParams = useQuery(fetchPokemonById,
        {
            variables: {
                // name: searchParams.get('name') ?? '%%',
                name: "charizard" ?? '%%',

            },

        });

    const pokemon = pokemonParams.data?.pokemon_v2_pokemon[0] as PokemonModel

    console.log(pokemonParams)

    return (
        <Layout
        >
            {
                pokemonParams.loading ? <Box
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    py={40}
                    gap={10}
                >
                    <Spinner
                        w={24}
                        h={24}
                        color="purple.500"
                    />
                    <Text
                        color={"gray.200"}
                    >
                        Pesquisando Pokemon...
                    </Text>
                </Box>
                    : <Stack
                        w={"100%"}
                        bgColor={"white"}
                        px={4}
                        py={4}
                        borderRadius={8}
                    >
                        <Flex
                            alignItems={"center"}
                            gap={4}
                            justifyContent={"center"}
                        >
                            <Text
                                fontSize={"4xl"}
                                fontWeight={"bold"}
                                textTransform={"capitalize"}
                            >
                                {pokemon?.name}
                            </Text>
                            <Text
                                fontSize={"2xl"}
                            >
                                #{pokemon?.id}
                            </Text>
                        </Flex>
                        <Flex
                            alignItems={"flex-start"}
                            gap={4}
                            justifyContent={"center"}
                        >
                            <Box
                                w={"50%"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                mt={4}
                            >
                                <Image
                                    src={pokemon?.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                                    alt={pokemon?.name}
                                    w={"60%"}
                                />
                            </Box>

                            <Box
                                w={"40%"}
                                display={"flex"}
                                py={10}
                            >
                                <Text
                                    fontSize={"xl"}
                                >
                                    {pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text ?? "Sem descrição"}
                                </Text>
                            </Box>
                        </Flex>
                    </Stack>
            }

        </Layout>
    )
}

