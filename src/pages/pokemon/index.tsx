import { useQuery } from "@apollo/client";
import { Layout } from "../../components/layout"
import { useSearchParams } from "react-router-dom";
import { Box, Flex, Grid, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { PokemonModel } from "../../models/pokemon-model";
import { fetchPokemonById } from "../../queries/fetchPokemonById";
import { getTypeTranslations, typeColors, TypeEnum } from "../../enuns/TypeEnum";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { BarChart } from "./components/BarChart";
import { Loading } from "./components/Loading";
import { hexToRgba } from "../../functions/hexToRgba";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const PokemonPage = () => {

    const [searchParams] = useSearchParams();

    const pokemonParams = useQuery(fetchPokemonById,
        {
            variables: {
                name: searchParams.get('name') ?? '%%',
                // name: "charizard",
            },
        });

    const pokemon = pokemonParams.data?.pokemon_v2_pokemon[0] as PokemonModel

    return (
        <Layout
        >
            {
                pokemonParams.loading ? <Loading />
                    : <Stack
                        w={"100%"}
                        bgColor={"white"}
                        px={14}
                        py={4}
                        borderRadius={8}
                        border={"2px solid"}
                        borderColor={hexToRgba(typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors], 1)}
                        boxShadow={`
                                        0 0 20px ${typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]},
                                        0 0 10px ${typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]},
                                        0 0 10px ${typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]},
                                        0 0 10px ${typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]},
                                        0 0 40px ${typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]};`
                        }
                    >
                        <Flex
                            alignItems={"center"}
                            gap={4}
                            justifyContent={"center"}
                        >
                            <Text
                                fontSize={"5xl"}
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
                            gap={20}
                            justifyContent={"center"}
                        >
                            <Box
                                w={"50%"}
                                display={"flex"}
                                mt={2}
                                flexDir={"column"}
                                gap={10}
                            >
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    bg={
                                        hexToRgba(typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors], 0.1)
                                    }
                                    borderRadius={8}
                                >
                                    <Image
                                        src={pokemon?.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                                        alt={pokemon?.name}
                                        w={"60%"}
                                    />
                                </Box>

                                <Box
                                    bgColor={"gray.700"}
                                    borderRadius={8}
                                    py={2}
                                    px={20}
                                >
                                    <BarChart
                                        values={pokemon?.pokemon_v2_pokemonstats?.map(stat => stat.base_stat) ?? [0, 0, 0, 0, 0, 0]}
                                    />
                                </Box>
                            </Box>

                            <Box
                                w={"35%"}
                                display={"flex"}
                                flexDir={"column"}
                                py={10}
                            >
                                <Text
                                    fontSize={"xl"}
                                >
                                    {pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text ?? "Sem descrição"}
                                </Text>
                                <Grid
                                    templateColumns={"repeat(2, 1fr)"}
                                    gap={4}
                                    mt={4}
                                    bgColor={"gray.700"}
                                    color={"white"}
                                    p={4}
                                    borderRadius={8}
                                >
                                    <PokemonInfos
                                        label="Altura"
                                        value={`${pokemon?.height} m`}
                                    />
                                    <PokemonInfos
                                        label="Peso"
                                        value={`${pokemon?.weight} kg`}
                                    />
                                    <PokemonInfos
                                        label="Habilidade"
                                        value={pokemon.pokemon_v2_pokemonabilities?.map(ability => ability.pokemon_v2_ability.name).join(" - ") ?? "Sem habilidades"}
                                    />
                                    <PokemonInfos
                                        label="Genero"
                                        value={pokemon?.pokemon_v2_pokemonspecy?.gender_rate === 1 ? "F e M" : "N/A"}
                                    />
                                </Grid>

                                {/* tipos  */}

                                <Box
                                    mt={4}
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
                                                    px={8}
                                                    borderRadius={8}
                                                    key={type.id}
                                                >
                                                    {getTypeTranslations(type.pokemon_v2_type.name as TypeEnum)}
                                                </Box>
                                            ))
                                        }
                                    </Flex>
                                </Box>

                                {/* fortes contra  */}
                                <Box
                                    mt={4}
                                >
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"xl"}
                                    >
                                        Forte contra
                                    </Text>
                                    <Flex
                                        gap={2}
                                        mt={2}
                                    >
                                        {
                                            pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemon_v2_typeefficacies.map((type) => (

                                                <Box
                                                    bgColor={typeColors[type.pokemonV2TypeByTargetTypeId.name as keyof typeof typeColors]}
                                                    color={"white"}
                                                    py={1}
                                                    fontWeight={500}
                                                    px={8}
                                                    borderRadius={8}
                                                    key={type.pokemonV2TypeByTargetTypeId.name}
                                                >
                                                    {getTypeTranslations(type.pokemonV2TypeByTargetTypeId.name as TypeEnum)}
                                                </Box>
                                            ))
                                        }
                                    </Flex>
                                </Box>
                            </Box>
                        </Flex>
                    </Stack>
            }

        </Layout>
    )
}

type Props = {
    label: string
    value: string

}
export function PokemonInfos({ label, value }: Props) {
    return (
        <Box>
            <Text
                fontSize={"lg"}
            >
                {label}
            </Text>
            <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
            >
                {value}
            </Text>
        </Box>
    )
}
