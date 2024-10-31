import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { TypeEnum, getTypeTranslations, typeColors } from "../../../enuns/TypeEnum"
import { PokemonModel } from "../../../models/pokemon-model"

type Props = {
    pokemon: PokemonModel

}

export const PokemonCard = ({ pokemon }: Props) => {
    return (
        <Box
            gap={10}
            borderRadius={"md"}
            cursor={"pointer"}
            transition={"all 0.2s"}
            _hover={{
                border: "3px solid",
                borderColor: typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors],
            }}
        >
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={"#F2F2F2"}
                py={2}
                w={"full"}
                h={"100%"}
            >
                <Image
                    src={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    w={"70%"}
                    filter={"brightness(0.92)"}
                    _hover={{
                        transition: "transform 0.5s",
                        transform: "scale(1.1)",
                        filter: "brightness(1)"
                    }}
                />
            </Box>
            <Box
                display={"flex"}
                flexDir={"column"}
                gap={1}
                mt={2}
                pb={3}
            >
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={{
                        base: 1,
                        md: 3
                    }}
                >
                    <Text
                        color={"gray.900"}
                        textTransform={"capitalize"}
                        fontSize={"lg"}
                        fontWeight={600}
                    >
                        {pokemon.name}
                    </Text>
                    <Text
                        fontSize={{
                            base: "xs",
                            md: "sm"
                        }}
                        color={"gray.500"}
                    >
                        #{pokemon.id}
                    </Text>
                </Flex>
                <Flex
                    gap={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {
                        pokemon.pokemon_v2_pokemontypes?.map((type, index) => (
                            <Text
                                key={index}
                                color={"white"}
                                bgColor={typeColors[type.pokemon_v2_type.name as keyof typeof typeColors]}
                                px={2}
                                fontSize={{
                                    base: "xs",
                                    md: "sm"
                                }}
                                borderRadius={"md"}
                            >
                                {getTypeTranslations(type.pokemon_v2_type.name as TypeEnum)}
                            </Text>
                        ))
                    }
                </Flex>
            </Box>

        </Box>
    )
}