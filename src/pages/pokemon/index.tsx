import { useQuery } from "@apollo/client";
import { Layout } from "../../components/layout"
import { useSearchParams } from "react-router-dom";
import { Box, Flex, Grid, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { PokemonModel } from "../../models/pokemon-model";
import { fetchPokemonById } from "../../queries/fetchPokemonById";
import { getTypeTranslations, typeColors, TypeEnum } from "../../enuns/TypeEnum";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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

    type ChartProps = {
        values: number[]
    }
    const RadarChart = ({ values }: ChartProps) => {
        const data = {
            labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
            datasets: [
                {
                    label: 'Base Stats',
                    data: [values[0], values[1], values[2], values[3], values[4], values[5]],
                    backgroundColor: 'rgba(67, 162, 252, 0.2)',  // Cor de preenchimento
                    borderColor: 'rgb(67, 162, 252)',  // Cor da borda
                    borderWidth: 3,  // Largura da borda
                },
            ],
        };

        const options = {
            scales: {
                r: {
                    grid: {
                        color: '#fff', // Cor das linhas do grid
                    },
                    angleLines: {
                        color: '#fff', // Cor das linhas dos ângulos
                    },
                    ticks: {
                        backdropColor: 'transparent', // Remove o fundo dos rótulos
                        color: '#fff', // Cor dos rótulos
                    },
                    pointLabels: {
                        color: '#fff', // Cor das labels dos eixos
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff', // Cor do texto da legenda
                    },
                },
                tooltip: {
                    titleColor: '#000', // Cor do título do tooltip
                    bodyColor: '#000', // Cor do corpo do tooltip
                    backgroundColor: '#fff', // Cor de fundo do tooltip
                    borderColor: '#fff', // Borda branca
                },
            },
            maintainAspectRatio: false,
        };

        return <Radar data={data} options={options} />;
    };

    console.log(pokemon?.pokemon_v2_pokemonstats?.map(stat => stat.base_stat))

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
                                mt={4}
                                flexDir={"column"}
                            >
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <Image
                                        src={pokemon?.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                                        alt={pokemon?.name}
                                        w={"60%"}
                                    />
                                </Box>
                                Status
                                <Box
                                    h={"450px"}
                                    bgColor={"gray.700"}
                                    borderRadius={8}
                                    py={2}
                                >
                                    <RadarChart
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
                                            pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemon_v2_typeefficacies.map((type, index) => (

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
