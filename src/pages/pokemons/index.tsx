import { Box, Button, Center, Flex, Grid, GridItem, Image, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { Layout } from "../../components/layout"
import wpp from "../../assets/images/wpp.jpg"
import { SearchIcon } from "@chakra-ui/icons"
import { PokemonCard } from "./components/pokemonCard"
import { ChangeEvent, useCallback, useState } from "react"
import { useQuery } from "@apollo/client"
import { fetchPokemons } from "../../queries/fetchPokemons"
import debounce from 'lodash.debounce';

export const PokemonsPage = () => {

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [name, setName] = useState('%%' as string)
    const [inputValue, setInputValue] = useState<string>('');
    const allPokemonsOfLimit = useQuery(fetchPokemons,
        {
            variables: {
                limit: limit,
                offset: offset,
                _name: name ?? '%%',
            }
        });

    const pokemons = allPokemonsOfLimit.data?.pokemon_v2_pokemon

    const debouncedSave = useCallback(
        debounce((nextValue: string) => setName(nextValue), 1000),
        []
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === '') {
            setInputValue("")
            setName("%%")
            return
        }
        setInputValue(value);
        debouncedSave(value);
    };

    return (
        <Layout>
            <Image
                src={wpp}
                position={"absolute"}
                h={"100vh"}
                w={"100%"}
                top={0}
                left={0}
                style={{
                    filter: "blur(1)"
                }}
            />
            <Stack
                zIndex={2}
            >
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
                                onChange={handleChange}
                                value={inputValue}

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
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={14}
                    bgColor={"white"}
                    borderRadius={"md"}
                    px={6}
                    py={8}
                >
                    {
                        allPokemonsOfLimit.loading ? <Box
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
                            />
                            <Text>
                                Procurando mais pokemons...
                            </Text>
                        </Box> :
                            <>
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
                                {
                                    name === '%%' && <Center
                                        gap={8}
                                    >
                                        <Button
                                            variant={"outline"}

                                            colorScheme="indigo"
                                            display={offset === 0 ? "none" : "block"}
                                            onClick={() => {
                                                setOffset(offset - 20)
                                                setLimit(limit)
                                            }}
                                        >
                                            20 Pokemons Anteriores
                                        </Button>
                                        <Button
                                            colorScheme="indigo"
                                            onClick={() => {
                                                setOffset(offset + 20)
                                                setLimit(limit)
                                            }}
                                        >
                                            Próximos 20 Pokemons
                                        </Button>

                                    </Center>
                                }

                            </>
                    }
                </Flex>
            </Stack>
        </Layout>
    )
} 