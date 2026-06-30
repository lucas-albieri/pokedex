import { useQuery } from "@apollo/client";
import { Layout } from "../../components/layout"
import { Link, useSearchParams } from "react-router-dom";
import { Box, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { PokemonModel } from "../../models/pokemon-model";
import { fetchPokemonById } from "../../queries/fetchPokemonById";
import { getTypeTranslations, typeColors, TypeEnum } from "../../enuns/TypeEnum";
import { StatsBars } from "./components/StatsBars";
import { Loading } from "./components/Loading";
import { hexToRgba } from "../../functions/hexToRgba";
import { PokemonHero } from "./components/PokemonHero";
import { PokemonArtwork } from "./components/PokemonArtwork";
import StrongAgainst from "./components/StrongAgainst";
import EvolutionLine from "./components/EvolutionLine";
import TcgCards from "./components/TcgCards";
import bg from "../../assets/images/squirtle.png";
import { PokemonInfos } from "./components/PokemonInfos";
import TranslateComponent from "../../api/translate";

export const PokemonPage = () => {

    const [searchParams] = useSearchParams();

    const pokemonParams = useQuery(fetchPokemonById,
        {
            variables: {
                name: searchParams.get('name') ?? '%%',
            },
        });

    const pokemon = pokemonParams.data?.pokemon_v2_pokemon[0] as PokemonModel

    const accentColor = typeColors[pokemon?.pokemon_v2_pokemontypes?.[0]?.pokemon_v2_type?.name as keyof typeof typeColors]

    if (searchParams.get('name') === null) {
        return (
            <Layout
                padding={false}
            >
                <Flex
                    w={"100%"}
                    h={"100vh"}
                    overflowY={"hidden"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDir={"column"}
                    pos={"relative"}
                >

                    <Image
                        src={bg}
                        alt={"bg"}
                        w={"10%"}
                        objectPosition={"bottom"}
                    />
                    <Text
                        fontSize={"3xl"}
                        fontWeight={"bold"}
                        color={"gray.100"}
                        zIndex={2}
                    >
                        404 - Pokemon não encontrado :(
                    </Text>
                    <Link
                        to={"/"}
                        style={{
                            color: "white",
                            textDecoration: "underline",
                            marginTop: "5px",
                            zIndex: 2
                        }}
                    >
                        Voltar para a listagem
                    </Link>
                </Flex>
            </Layout>
        )
    }

    return (
        <Layout >
            {
                pokemonParams.loading ? <Loading />
                    : <Stack
                        w={"100%"}
                        bgColor={"white"}
                        px={{
                            base: 4,
                            md: 10
                        }}
                        py={{
                            base: 4,
                            md: 6
                        }}
                        gap={{
                            base: 5,
                            md: 8
                        }}
                        borderRadius={12}
                        border={"2px solid"}
                        borderColor={hexToRgba(accentColor, 1)}
                        boxShadow={`
                            0 0 20px ${accentColor},
                            0 0 10px ${accentColor},
                            0 0 40px ${accentColor};`
                        }
                    >

                        <PokemonHero
                            pokemon={pokemon}
                            accentColor={accentColor}
                        />

                        <Flex
                            alignItems={"flex-start"}
                            gap={{
                                base: 0,
                                md: 20
                            }}
                            justifyContent={"center"}
                            flexDir={{
                                base: "column",
                                md: "row"
                            }}
                        >
                            <Box
                                w={{
                                    base: "100%",
                                    md: "50%"
                                }}
                                display={"flex"}
                                mt={2}
                                flexDir={"column"}
                                gap={{
                                    base: 4,
                                    md: 10
                                }}
                            >
                                <PokemonArtwork
                                    name={pokemon?.name}
                                    artwork={pokemon?.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                                    shiny={pokemon?.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_shiny}
                                    accentColor={accentColor}
                                />

                                <StatsBars
                                    values={pokemon?.pokemon_v2_pokemonstats?.map(stat => stat.base_stat) ?? [0, 0, 0, 0, 0, 0]}
                                    accentColor={typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]}
                                />
                            </Box>

                            <Box
                                w={{
                                    base: "100%",
                                    md: "35%"
                                }}
                                display={"flex"}
                                flexDir={"column"}
                                gap={{
                                    base: 3,
                                    md: 6
                                }}
                                py={{
                                    base: 4,
                                    md: 10
                                }}
                            >
                                <Text
                                    fontSize={{
                                        base: "md",
                                        md: "xl"
                                    }}
                                >
                                    <TranslateComponent
                                        text={pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text ?? "Sem descrição"}
                                    />
                                    {/* {pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text ?? "Sem descrição"} */}
                                </Text>
                                <Grid
                                    templateColumns={"repeat(2, 1fr)"}
                                    gap={4}
                                    mt={4}
                                    bgColor={"gray.50"}
                                    border={"1px solid"}
                                    borderColor={"gray.200"}
                                    p={4}
                                    borderRadius={8}
                                >
                                    {[
                                        {
                                            label: "Altura",
                                            value: `${pokemon?.height} m`
                                        },
                                        {
                                            label: "Peso",
                                            value: `${pokemon?.weight} kg`
                                        },
                                        {
                                            label: "Habilidade",
                                            value: pokemon.pokemon_v2_pokemonabilities?.map(ability => ability.pokemon_v2_ability.name).join(" - ") ?? "Sem habilidades"
                                        },
                                        {
                                            label: "Gênero",
                                            value: pokemon?.pokemon_v2_pokemonspecy?.gender_rate === 1 ? "F e M" : "N/A"
                                        }
                                    ].map(info => (
                                        <PokemonInfos
                                            key={info.label}
                                            label={info.label}
                                            value={info.value}
                                        />
                                    ))}
                                </Grid>

                                {/* tipos  */}

                                <Box
                                >
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"xl"}
                                    >
                                        Tipos
                                    </Text>
                                    <Flex
                                        gap={2}
                                        mt={2}
                                    >
                                        {
                                            pokemon?.pokemon_v2_pokemontypes?.map(type => (
                                                <Box
                                                    bgColor={typeColors[type.pokemon_v2_type.name as keyof typeof typeColors]}
                                                    color={"white"}
                                                    py={1}
                                                    fontWeight={500}
                                                    px={{
                                                        base: 4,
                                                        md: 8
                                                    }}
                                                    borderRadius={8}
                                                    key={type.id}
                                                    fontSize={{
                                                        base: "sm",
                                                        md: "md"
                                                    }}
                                                >
                                                    {getTypeTranslations(type.pokemon_v2_type.name as TypeEnum)}
                                                </Box>
                                            ))
                                        }
                                    </Flex>
                                </Box>

                                {/* fortes contra  */}
                                <StrongAgainst
                                    pokemon_v2_typeefficacies={pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemon_v2_typeefficacies ?? []}
                                />

                            </Box>
                        </Flex>

                        {/* linha evolutiva */}
                        <EvolutionLine
                            evolutionChain={pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain as any}
                            accentColor={typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]}
                        />
                        {/* cartas do TCG */}
                        <TcgCards
                            name={pokemon?.name}
                            accentColor={typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]}
                        />
                    </Stack>
            }

        </Layout>
    )
}

