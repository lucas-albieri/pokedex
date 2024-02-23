import { Box, Flex, Text } from "@chakra-ui/react"
import { Layout } from "../../components/layout"
import pikachu from "../../assets/videos/tepig.mp4"
import { Link } from "react-router-dom"

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
            >
                <Box
                    position={"absolute"}
                    top={0}
                    left={0}
                    marginTop="0px"
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
                    marginTop={"130px"}
                    zIndex={2}
                    alignItems={"center"}
                >
                    <Text
                        color={"#fdfdfd"}
                        fontSize={"8xl"}
                        fontWeight={900}
                        textTransform={"uppercase"}
                        letterSpacing='0.03em'
                        textAlign='center'
                        textShadow=' 5px 5px 0px #6d5ef3 '
                    >
                        Pokedex
                    </Text>
                    <Text
                        color={"#fdfdfd"}
                        fontSize={"8xl"}
                        fontWeight={900}
                        textTransform={"uppercase"}
                        letterSpacing='0.03em'
                        textAlign='center'
                        textShadow=' 5px 5px 0px #6d5ef3 '
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
                            fontSize={"lg"}
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