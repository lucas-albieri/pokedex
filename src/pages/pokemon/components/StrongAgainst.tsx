import { Box, Flex, Text } from "@chakra-ui/react";
import { getTypeTranslations, typeColors, TypeEnum } from "../../../enuns/TypeEnum";

type Props = {
    pokemon_v2_typeefficacies: {
        damage_factor: number;
        pokemonV2TypeByTargetTypeId: {
            name: string;
        };
    }[]
}

export default function StrongAgainst({ pokemon_v2_typeefficacies }: Props) {

    return (
        <Box
            mt={{
                base: 2,
                md: 0
            }}
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
                flexWrap={"wrap"}
            >
                {
                    pokemon_v2_typeefficacies.map((type) => <Box
                        bgColor={typeColors[type.pokemonV2TypeByTargetTypeId.name as keyof typeof typeColors]}
                        color={"white"}
                        py={1}
                        fontWeight={500}
                        px={{
                            base: 4,
                            md: 8
                        }}
                        borderRadius={8}
                        fontSize={{
                            base: "sm",
                            md: "md"
                        }}
                        key={type.pokemonV2TypeByTargetTypeId.name}
                    >
                        {getTypeTranslations(type.pokemonV2TypeByTargetTypeId.name as TypeEnum)}
                    </Box>
                    )
                }
            </Flex>
        </Box>

    )

}