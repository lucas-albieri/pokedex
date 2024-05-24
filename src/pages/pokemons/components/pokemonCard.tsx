import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { TypeEnum, typeColors } from "../../../enuns/TypeEnum"
import { PokemonModel } from "../../../models/pokemon-model"

type Props = {
    pokemon: PokemonModel

}

export const PokemonCard = ({ pokemon }: Props) => {
    return (
        <Box
            px={12}
            py={4}
            borderRadius={"md"}
            bgColor={typeColors[pokemon.type]}
        >
            <Flex>
                <Flex
                    gap={2}
                >
                    <Text
                        color={"white"}
                    >
                        {pokemon.name}
                    </Text>
                    <Text
                        color={"white"}
                    >
                        #{pokemon.id}
                    </Text>
                </Flex>
            </Flex>

            <Box
                display={"flex"}
                justifyContent={"flex-end"}
            >
                <Image
                    src={pokemon.sprites?.front_default}
                    alt={pokemon.name}
                    w={"100%"}
                />
            </Box>

        </Box>
    )
}