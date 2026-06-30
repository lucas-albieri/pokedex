import { Box, Flex, Text } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { getTypeTranslations, typeColors, TypeEnum } from "../../../enuns/TypeEnum"
import { hexToRgba } from "../../../functions/hexToRgba"
import { PokemonModel } from "../../../models/pokemon-model"

type Props = {
    pokemon: PokemonModel
    accentColor: string
}

export function PokemonHero({ pokemon, accentColor }: Props) {

    const species = pokemon?.pokemon_v2_pokemonspecy
    const genus = species?.pokemon_v2_pokemonspeciesnames?.[0]?.genus
    const isLegendary = species?.is_legendary
    const isMythical = species?.is_mythical

    return (
        <Box
            pos={"relative"}
            overflow={"hidden"}
            borderRadius={16}
            bg={`linear-gradient(135deg, ${hexToRgba(accentColor, 0.18)}, ${hexToRgba(accentColor, 0.04)})`}
            border={"1px solid"}
            borderColor={hexToRgba(accentColor, 0.25)}
            px={{ base: 5, md: 8 }}
            py={{ base: 4, md: 5 }}
        >
            {/* número em marca d'água */}
            <Text
                pos={"absolute"}
                right={{ base: 3, md: 6 }}
                top={"50%"}
                transform={"translateY(-50%)"}
                fontSize={{ base: "5xl", md: "8xl" }}
                fontWeight={900}
                lineHeight={1}
                color={hexToRgba(accentColor, 0.14)}
                userSelect={"none"}
                zIndex={0}
            >
                #{pokemon?.id}
            </Text>

            <Flex pos={"relative"} zIndex={1} flexDir={"column"} gap={3}>
                <Link
                    to={"/pokemons"}
                    style={{ color: "#1a1a1a", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", width: "fit-content" }}
                >
                    <ChevronLeftIcon w={6} h={6} />
                    Voltar
                </Link>

                <Flex alignItems={"baseline"} gap={3} flexWrap={"wrap"}>
                    <Text
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight={"bold"}
                        textTransform={"capitalize"}
                        lineHeight={1.1}
                    >
                        {pokemon?.name}
                    </Text>
                    <Text fontSize={{ base: "lg", md: "2xl" }} color={"gray.500"} fontWeight={600}>
                        #{pokemon?.id}
                    </Text>

                    {(isLegendary || isMythical) && (
                        <Box
                            bg={accentColor}
                            color={"white"}
                            fontSize={"xs"}
                            fontWeight={"bold"}
                            textTransform={"uppercase"}
                            letterSpacing={"0.05em"}
                            px={3}
                            py={1}
                            borderRadius={"full"}
                        >
                            {isMythical ? "Mítico" : "Lendário"}
                        </Box>
                    )}
                </Flex>

                {genus && (
                    <Text fontSize={{ base: "sm", md: "md" }} color={"gray.600"} mt={-1}>
                        {genus}
                    </Text>
                )}

                <Flex gap={2} flexWrap={"wrap"}>
                    {pokemon?.pokemon_v2_pokemontypes?.map((type) => (
                        <Box
                            key={type.id}
                            bgColor={typeColors[type.pokemon_v2_type.name as keyof typeof typeColors]}
                            color={"white"}
                            py={1}
                            px={5}
                            borderRadius={"full"}
                            fontWeight={600}
                            fontSize={{ base: "sm", md: "md" }}
                        >
                            {getTypeTranslations(type.pokemon_v2_type.name as TypeEnum)}
                        </Box>
                    ))}
                </Flex>
            </Flex>
        </Box>
    )
}
