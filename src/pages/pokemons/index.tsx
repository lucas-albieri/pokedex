import { Box, Button, Center, Flex, Grid, GridItem, Image, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { Layout } from "../../components/layout"
import wpp from "../../assets/images/wpp.jpg"
import { SearchIcon } from "@chakra-ui/icons"
import { PokemonCard } from "./components/pokemonCard"
import { ChangeEvent, useCallback, useState } from "react"
import { useQuery } from "@apollo/client"
import { fetchPokemons } from "../../queries/fetchPokemons"
import debounce from 'lodash.debounce';
import { useNavigate, useSearchParams, } from "react-router-dom"

export const PokemonsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const offset = searchParams.get('offset') ? Number(searchParams.get('offset')) : 0
    const navigate = useNavigate();
    const [limit, setLimit] = useState(20);
    const [name, setName] = useState('%%' as string)
    const [inputValue, setInputValue] = useState<string>('');
    const allPokemonsOfLimit = useQuery(fetchPokemons,
        {
            variables: {
                limit: limit,
                offset: offset,
                _name: name.toLocaleLowerCase() ?? '%%',
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

    if (pokemons?.length === 0) {
        setName("%%")
    }

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
                    flexDir={{
                        base: "column",
                        lg: "row"
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={{
                        base: 6,
                        lg: 20
                    }}
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
                            Nome do pokemon
                        </Text>
                        <Flex
                            alignItems={"center"}
                            gap={3}
                            pos={"relative"}
                        >
                            <Input
                                placeholder="Ex: Charizard"
                                onChange={handleChange}
                                value={inputValue}
                            />
                            <Box
                                px={3}
                                borderRadius={"md"}
                                pos={"absolute"}
                                right={0}
                            >
                                <SearchIcon
                                    color={"gray"}
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
                        w={{
                            base: "100%",
                            md: "50%",
                            lg: "30%"
                        }}
                    >
                        <Text
                            bgColor="indigo.500"
                            borderRadius={"md"}
                            px={{
                                base: 2,
                                lg: 4,
                            }}
                            py={3}
                            fontSize={{
                                base: "sm",
                                lg: "lg",
                            }}
                            color={"white"}
                        >
                            Realize a busca pelo nome do seu pokemon da Pokedex Nacional
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
                                    gap={{
                                        base: 2,
                                        md: 8
                                    }}
                                    templateColumns={{
                                        base: 'repeat(2, 1fr)',
                                        md: 'repeat(4, 1fr)',
                                        lg: 'repeat(5, 1fr)'
                                    }}
                                >
                                    {
                                        pokemons?.map((pokemon: any) => {
                                            return (
                                                <GridItem
                                                    key={pokemon.name}
                                                    colSpan={1}
                                                    rowSpan={1}
                                                    onClick={() => {
                                                        navigate(`/pokemon?name=${pokemon.name}`)
                                                    }}
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
                                        gap={{
                                            base: 2,
                                            md: 8
                                        }}
                                        w={"full"}
                                        flexDir={{
                                            base: "column",
                                            md: "row"
                                        }}
                                    >
                                        <Button
                                            variant={"outline"}
                                            w={{
                                                base: "full",
                                                md: "auto"
                                            }}
                                            colorScheme="indigo"
                                            display={offset === 0 ? "none" : "block"}
                                            onClick={() => {
                                                searchParams.set('offset', (offset - 20).toString())
                                                setSearchParams(searchParams)
                                                setLimit(limit)
                                            }}
                                        >
                                            20 Pokemons Anteriores
                                        </Button>
                                        <Button
                                            w={{
                                                base: "full",
                                                md: "auto"
                                            }}
                                            colorScheme="indigo"
                                            onClick={() => {
                                                searchParams.set('offset', (offset + 20).toString())
                                                setSearchParams(searchParams)
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