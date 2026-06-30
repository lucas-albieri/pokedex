import {
    Box,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    SimpleGrid,
    Skeleton,
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useState } from "react"
import { fetchTcgCards, TcgCard } from "../../../queries/fetchTcgCards"

type Props = {
    name: string
    accentColor: string
}

export default function TcgCards({ name, accentColor }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedCard, setSelectedCard] = useState<TcgCard | null>(null)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["tcg-cards", name],
        queryFn: () => fetchTcgCards(name),
        enabled: !!name,
    })

    function handleSelectCard(card: TcgCard) {
        setSelectedCard(card)
        onOpen()
    }

    if (isError) return null

    if (!isLoading && (!data || data.length === 0)) return null

    return (
        <Box
            mt={{ base: 6, md: 2 }}
            pt={{ base: 6, md: 8 }}
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
                    columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    gap={{ base: 3, md: 5 }}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
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
                    columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    gap={{ base: 3, md: 5 }}
                >
                    {data?.map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            accentColor={accentColor}
                            onClick={() => handleSelectCard(card)}
                        />
                    ))}
                </SimpleGrid>
            )}

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={{ base: "xs", sm: "sm", md: "md" }}
                motionPreset={"scale"}
            >
                <ModalOverlay bg={"blackAlpha.800"} backdropFilter={"blur(6px)"} />
                <ModalContent
                    bg={"transparent"}
                    boxShadow={"none"}
                    overflow={"visible"}
                >
                    <ModalCloseButton
                        color={"white"}
                        bg={"blackAlpha.600"}
                        borderRadius={"full"}
                        top={-10}
                        right={0}
                        _hover={{ bg: "blackAlpha.800" }}
                    />
                    <ModalBody p={0}>
                        {selectedCard && (
                            <Box>
                                <Image
                                    src={selectedCard.images.large}
                                    alt={`Carta ${selectedCard.name} - ${selectedCard.set.name}`}
                                    w={"100%"}
                                    borderRadius={16}
                                    style={{
                                        filter: `drop-shadow(0 12px 32px ${accentColor}99)`,
                                    }}
                                />
                                <Text
                                    mt={4}
                                    textAlign={"center"}
                                    color={"white"}
                                    fontSize={"sm"}
                                    fontWeight={"medium"}
                                >
                                    {selectedCard.set.name}
                                </Text>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

function CardItem({
    card,
    accentColor,
    onClick,
}: {
    card: TcgCard
    accentColor: string
    onClick: () => void
}) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
        >
            <Box
                onClick={onClick}
                borderRadius={12}
                overflow="hidden"
                cursor="pointer"
                style={{
                    filter: `drop-shadow(0 8px 16px ${accentColor}55)`,
                }}
            >
                <Image
                    src={card.images.small}
                    alt={`Carta ${card.name} - ${card.set.name}`}
                    w="100%"
                    loading="lazy"
                    borderRadius={12}
                />
            </Box>
        </motion.div>
    )
}
