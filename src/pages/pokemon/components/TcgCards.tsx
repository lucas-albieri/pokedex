import { Box, Flex, Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { fetchTcgCards, TcgCard } from "../../../queries/fetchTcgCards"

const MotionBox = motion(Box)

type Props = {
    name: string
    accentColor: string
}

export default function TcgCards({ name, accentColor }: Props) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["tcg-cards", name],
        queryFn: () => fetchTcgCards(name),
        enabled: !!name,
    })

    if (isError) return null

    if (!isLoading && (!data || data.length === 0)) return null

    return (
        <Box
            mt={{ base: 6, md: 12 }}
            pt={{ base: 6, md: 10 }}
            borderTop={"1px solid"}
            borderColor={"gray.200"}
        >
            <Flex
                alignItems={"center"}
                gap={3}
                mb={{ base: 4, md: 6 }}
            >
                <Box
                    w={"6px"}
                    h={{ base: "24px", md: "32px" }}
                    borderRadius={"full"}
                    bgColor={accentColor}
                />
                <Box>
                    <Text
                        fontSize={{ base: "xl", md: "3xl" }}
                        fontWeight={"bold"}
                        lineHeight={1.1}
                    >
                        Cartas do TCG
                    </Text>
                    <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color={"gray.500"}
                    >
                        Estampas ilustradas oficiais de{" "}
                        <Box as={"span"} textTransform={"capitalize"}>
                            {name}
                        </Box>
                    </Text>
                </Box>
            </Flex>

            {isLoading ? (
                <SimpleGrid
                    columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
                    gap={{ base: 3, md: 5 }}
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            borderRadius={12}
                            w={"100%"}
                            sx={{ aspectRatio: "63 / 88" }}
                            startColor={"gray.100"}
                            endColor={"gray.300"}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid
                    columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
                    gap={{ base: 3, md: 5 }}
                >
                    {data?.map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            accentColor={accentColor}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    )
}

function CardItem({ card, accentColor }: { card: TcgCard; accentColor: string }) {
    return (
        <MotionBox
            as={"a"}
            href={card.images.large}
            target={"_blank"}
            rel={"noopener noreferrer"}
            display={"block"}
            borderRadius={12}
            overflow={"hidden"}
            cursor={"pointer"}
            initial={{ y: 0 }}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                filter: `drop-shadow(0 8px 16px ${accentColor}55)`,
            }}
        >
            <Image
                src={card.images.small}
                alt={`Carta ${card.name} - ${card.set.name}`}
                w={"100%"}
                loading={"lazy"}
                borderRadius={12}
            />
        </MotionBox>
    )
}
