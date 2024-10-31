import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { Layout } from "../../components/layout"
import pikachu from "../../assets/videos/tepig.mp4"
import { Link } from "react-router-dom"
import bgImage from "../../assets/images/mini-pikachu.png"

export const Home = () => {
    return (
        <Layout
            padding={false}
        >
            <Box
                overflow={"hidden"}
                height={"100vh"}
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                position={"relative"}
            // bgImage={`url(${bgImage})`}
            // bgPosition={"top"}
            // bgSize={"cover"}
            // bgBlendMode={"multiply"}
            >
                <Box
                    position={"absolute"}
                    top={0}
                    left={0}
                    width={"100%"}
                    height={"100vh"}
                    marginTop="30px"
                    display={{
                        base: "block",
                        md: "none"
                    }}
                >
                    <Image
                        src={bgImage}
                        alt={"Pikachu"}
                        width={"100%"}
                        height={"100%"}
                        objectFit={"cover"}
                        filter={"blur(2px) brightness(0.4)"}
                    />
                </Box>
                <Box
                    position={"absolute"}
                    top={0}
                    left={0}
                    marginTop="0px"
                    display={{
                        base: "none",
                        md: "block"
                    }}
                >

                    <video
                        autoPlay={true}
                        muted
                    >
                        <source
                            src={pikachu}

                        />
                    </video>
                </Box>
                <Flex
                    flexDir={"column"}
                    marginTop={{
                        base: "80px",
                        md: "130px"
                    }}
                    zIndex={2}
                    alignItems={"center"}
                >
                    <Text
                        color={"#fdfdfd"}
                        fontSize={{
                            base: "5xl",
                            lg: "8xl"
                        }}
                        fontWeight={900}
                        textTransform={"uppercase"}
                        letterSpacing='0.03em'
                        lineHeight={1}
                        textAlign='center'
                        textShadow={{
                            base: ' 3px 3px 0px #ff4242 ',
                            md: ' 5px 5px 0px #ff4242 '
                        }}
                    >
                        Pokedex
                    </Text>
                    <Text
                        color={"#fdfdfd"}
                        fontSize={{
                            base: "4xl",
                            md: "5xl",
                            lg: "8xl"
                        }}
                        fontWeight={900}
                        textTransform={"uppercase"}
                        letterSpacing='0.03em'
                        textAlign='center'
                        textShadow={{
                            base: ' 3px 3px 0px #6d5ef3 ',
                            md: ' 5px 5px 0px #6d5ef3 '
                        }}
                    >
                        Generations
                    </Text>
                    <Link
                        to={"pokemons"}
                    >
                        <Text
                            color="white"
                            textAlign={"center"}
                            borderBottom={"solid 2px"}
                            fontWeight={500}
                            pb={1}
                            fontSize={{
                                base: "md",
                                md: "lg"
                            }}
                            mt={{
                                base: 4,
                                md: 0
                            }}
                        // textTransform={"uppercase"}
                        >
                            Ver Pokemons ▶
                        </Text>
                    </Link>
                </Flex>
            </Box>
        </Layout>
    )
}