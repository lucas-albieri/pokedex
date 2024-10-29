import { Flex, Spinner, Text } from "@chakra-ui/react";

export function Loading() {
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            gap={6}
        >
            <Spinner
                w={24}
                h={24}
                color="purple.500"
                speed="0.65s"
            />
            <Text
                color={"gray.200"}
            >
                Pesquisando Pokemon...
            </Text>
        </ Flex>
    )
}