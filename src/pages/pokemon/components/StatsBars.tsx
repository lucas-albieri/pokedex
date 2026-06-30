import { Box, Flex, Text } from "@chakra-ui/react"
import { hexToRgba } from "../../../functions/hexToRgba"

type Props = {
    values: number[]
    accentColor: string
}

const STAT_LABELS = [
    "HP",
    "Ataque",
    "Defesa",
    "Atq. Esp.",
    "Def. Esp.",
    "Velocidade",
]

const MAX_STAT = 255

export const StatsBars = ({ values, accentColor }: Props) => {

    const total = values.reduce((acc, value) => acc + value, 0)

    return (
        <Box
            w={"100%"}
            border={"1px solid"}
            borderColor={"gray.200"}
            borderRadius={12}
            p={{
                base: 4,
                md: 6
            }}
        >
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={4}
            >
                <Text
                    fontWeight={"bold"}
                    fontSize={"xl"}
                >
                    Status base
                </Text>
                <Flex
                    alignItems={"baseline"}
                    gap={1}
                >
                    <Text
                        fontSize={"xs"}
                        color={"gray.500"}
                    >
                        Total
                    </Text>
                    <Text
                        fontWeight={"bold"}
                        fontSize={"lg"}
                        color={accentColor}
                    >
                        {total}
                    </Text>
                </Flex>
            </Flex>

            <Flex
                flexDir={"column"}
                gap={3}
            >
                {values.map((value, index) => (
                    <Flex
                        key={STAT_LABELS[index]}
                        alignItems={"center"}
                        gap={3}
                    >
                        <Text
                            fontSize={"sm"}
                            fontWeight={500}
                            color={"gray.600"}
                            w={"90px"}
                            flexShrink={0}
                        >
                            {STAT_LABELS[index]}
                        </Text>
                        <Text
                            fontSize={"sm"}
                            fontWeight={"bold"}
                            color={"gray.800"}
                            w={"32px"}
                            flexShrink={0}
                            textAlign={"right"}
                        >
                            {value}
                        </Text>
                        <Box
                            flex={1}
                            h={"8px"}
                            borderRadius={"full"}
                            bgColor={hexToRgba(accentColor, 0.12)}
                            overflow={"hidden"}
                        >
                            <Box
                                h={"100%"}
                                borderRadius={"full"}
                                bgColor={accentColor}
                                w={`${Math.min((value / MAX_STAT) * 100, 100)}%`}
                                transition={"width 0.6s ease-in-out"}
                            />
                        </Box>
                    </Flex>
                ))}
            </Flex>
        </Box>
    )
}
