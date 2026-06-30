import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { hexToRgba } from "../../../functions/hexToRgba"

type Props = {
    name: string
    artwork: string
    shiny?: string
    accentColor: string
}

export function PokemonArtwork({ name, artwork, shiny, accentColor }: Props) {

    const [isShiny, setIsShiny] = useState(false)
    const hasShiny = !!shiny

    const currentImage = isShiny && hasShiny ? shiny : artwork

    return (
        <Box
            pos={"relative"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={`radial-gradient(circle at 50% 35%, ${hexToRgba(accentColor, 0.22)}, ${hexToRgba(accentColor, 0.05)})`}
            borderRadius={16}
            overflow={"hidden"}
            py={4}
        >
            {/* marca d'água de pokébola */}
            <Box
                pos={"absolute"}
                top={"-10%"}
                right={"-10%"}
                w={"70%"}
                h={"70%"}
                opacity={0.12}
                pointerEvents={"none"}
            >
                <PokeballWatermark color={accentColor} />
            </Box>

            <Image
                src={currentImage}
                alt={isShiny ? `${name} shiny` : name}
                w={{
                    base: "70%",
                    md: "65%"
                }}
                zIndex={1}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.04)" }}
            />

            {hasShiny && (
                <Flex
                    zIndex={1}
                    mt={2}
                    bg={"whiteAlpha.800"}
                    borderRadius={"full"}
                    p={1}
                    gap={1}
                    boxShadow={"sm"}
                >
                    <ToggleButton
                        active={!isShiny}
                        accentColor={accentColor}
                        onClick={() => setIsShiny(false)}
                    >
                        Normal
                    </ToggleButton>
                    <ToggleButton
                        active={isShiny}
                        accentColor={accentColor}
                        onClick={() => setIsShiny(true)}
                    >
                        Shiny
                    </ToggleButton>
                </Flex>
            )}
        </Box>
    )
}

function ToggleButton({
    active,
    accentColor,
    onClick,
    children,
}: {
    active: boolean
    accentColor: string
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <Box
            as={"button"}
            onClick={onClick}
            px={4}
            py={1}
            borderRadius={"full"}
            fontSize={"xs"}
            fontWeight={"bold"}
            transition={"all 0.2s"}
            bg={active ? accentColor : "transparent"}
            color={active ? "white" : "gray.600"}
            _hover={{ bg: active ? accentColor : "blackAlpha.100" }}
        >
            {children}
        </Box>
    )
}

function PokeballWatermark({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="6" />
            <path d="M4 50 H38" stroke={color} strokeWidth="6" />
            <path d="M62 50 H96" stroke={color} strokeWidth="6" />
            <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="6" fill="white" />
        </svg>
    )
}
