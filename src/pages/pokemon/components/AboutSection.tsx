import { Box, Flex, Grid, Image, SimpleGrid, Text } from "@chakra-ui/react"
import male from "../../../assets/images/male.png"
import female from "../../../assets/images/femea.png"
import { hexToRgba } from "../../../functions/hexToRgba"
import { PokemonModel } from "../../../models/pokemon-model"

type Props = {
    pokemon: PokemonModel
    accentColor: string
}

const EGG_GROUP_LABELS: Record<string, string> = {
    monster: "Monstro",
    water1: "Água 1",
    water2: "Água 2",
    water3: "Água 3",
    bug: "Inseto",
    flying: "Voador",
    ground: "Campo",
    fairy: "Fada",
    plant: "Planta",
    humanshape: "Humanoide",
    mineral: "Mineral",
    indeterminate: "Amorfo",
    ditto: "Ditto",
    dragon: "Dragão",
    "no-eggs": "Sem ovos",
}

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function AboutSection({ pokemon, accentColor }: Props) {

    const species = pokemon?.pokemon_v2_pokemonspecy
    const genderRate = species?.gender_rate ?? -1

    const tiles = [
        { label: "Altura", value: `${(pokemon.height / 10).toFixed(1)} m` },
        { label: "Peso", value: `${(pokemon.weight / 10).toFixed(1)} kg` },
        { label: "Exp. base", value: pokemon.base_experience ? `${pokemon.base_experience}` : "—" },
        { label: "Captura", value: species?.capture_rate != null ? `${species.capture_rate}` : "—" },
        { label: "Felicidade", value: species?.base_happiness != null ? `${species.base_happiness}` : "—" },
    ]

    const eggGroups = species?.pokemon_v2_pokemonegggroups?.map(
        (group) => EGG_GROUP_LABELS[group.pokemon_v2_egggroup.name] ?? capitalize(group.pokemon_v2_egggroup.name)
    ) ?? []

    return (
        <Flex flexDir={"column"} gap={5}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
                Sobre
            </Text>

            {/* tiles numéricos */}
            <SimpleGrid columns={{ base: 2, sm: 3 }} gap={3}>
                {tiles.map((tile) => (
                    <Box
                        key={tile.label}
                        bg={hexToRgba(accentColor, 0.08)}
                        border={"1px solid"}
                        borderColor={hexToRgba(accentColor, 0.2)}
                        borderRadius={12}
                        px={3}
                        py={3}
                        textAlign={"center"}
                    >
                        <Text fontSize={"xs"} color={"gray.500"} fontWeight={500}>
                            {tile.label}
                        </Text>
                        <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.800"}>
                            {tile.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* habilidades, gênero e grupos de ovo */}
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                <InfoRow label={"Habilidades"}>
                    <Flex gap={2} flexWrap={"wrap"}>
                        {pokemon.pokemon_v2_pokemonabilities?.map((ability) => (
                            <Box
                                key={ability.pokemon_v2_ability.name}
                                bg={"gray.100"}
                                borderRadius={"full"}
                                px={3}
                                py={1}
                                fontSize={"sm"}
                                fontWeight={500}
                                textTransform={"capitalize"}
                                color={"gray.700"}
                            >
                                {ability.pokemon_v2_ability.name.replace("-", " ")}
                                {ability.is_hidden && (
                                    <Box as={"span"} ml={1} fontSize={"xs"} color={accentColor} fontWeight={"bold"}>
                                        (oculta)
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Flex>
                </InfoRow>

                <InfoRow label={"Gênero"}>
                    {genderRate === -1 ? (
                        <Text fontSize={"sm"} fontWeight={500} color={"gray.700"}>
                            Sem gênero
                        </Text>
                    ) : (
                        <Flex gap={3} alignItems={"center"}>
                            {genderRate < 8 && <Image src={male} alt={"Macho"} h={"22px"} />}
                            {genderRate > 0 && <Image src={female} alt={"Fêmea"} h={"22px"} />}
                        </Flex>
                    )}
                </InfoRow>

                {eggGroups.length > 0 && (
                    <InfoRow label={"Grupos de ovo"}>
                        <Flex gap={2} flexWrap={"wrap"}>
                            {eggGroups.map((group) => (
                                <Box
                                    key={group}
                                    bg={"gray.100"}
                                    borderRadius={"full"}
                                    px={3}
                                    py={1}
                                    fontSize={"sm"}
                                    fontWeight={500}
                                    color={"gray.700"}
                                >
                                    {group}
                                </Box>
                            ))}
                        </Flex>
                    </InfoRow>
                )}
            </Grid>
        </Flex>
    )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <Flex flexDir={"column"} gap={2}>
            <Text fontSize={"xs"} color={"gray.500"} fontWeight={600} textTransform={"uppercase"} letterSpacing={"0.05em"}>
                {label}
            </Text>
            {children}
        </Flex>
    )
}
