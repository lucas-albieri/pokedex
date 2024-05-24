import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { typeColors } from "../../../enuns/TypeEnum"
import { PokemonModel } from "../../../models/pokemon-model"

type Props = {
    pokemon: PokemonModel

}

export const PokemonCard = ({ pokemon }: Props) => {
    return (
        <Box
            py={3}
            gap={10}
            borderRadius={"md"}
            // bgColor={typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors]}
            bgColor={"white"}
            cursor={"pointer"}
            transition={"all 0.2s"}
            // filter={"brightness(0.9)"}
            boxShadow={"md"}
            _hover={{
                border: "3px solid",
                borderColor: typeColors[pokemon?.pokemon_v2_pokemontypes[0].pokemon_v2_type.name as keyof typeof typeColors],
                filter: "brightness(1)",

            }}
        >
            <Flex
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Flex
                    gap={2}
                    alignItems={"center"}
                    fontWeight={600}
                >
                    <Text
                        color={"gray.900"}
                        textTransform={"capitalize"}
                        fontSize={"lg"}
                    >
                        {pokemon.name}
                    </Text>
                    <Text
                        color={"gray.900"}
                    >
                        #{pokemon.id}
                    </Text>
                </Flex>
            </Flex>

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"full"}
            >
                <Image
                    src={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    w={"50%"}
                    _hover={{
                        transition: "transform 0.5s",
                        transform: "scale(1.2)"
                    }}
                />
            </Box>
            <Box
                display={"flex"}
                gap={2}
                mt={4}
                justifyContent={"center"}
            >
                {
                    pokemon.pokemon_v2_pokemontypes?.map((type, index) => (
                        <Text
                            key={index}
                            color={"white"}
                            bgColor={typeColors[type.pokemon_v2_type.name as keyof typeof typeColors]}
                            px={1}
                            borderRadius={"md"}
                        >
                            {type.pokemon_v2_type.name}
                        </Text>
                    ))
                }
            </Box>

        </Box>
    )
}