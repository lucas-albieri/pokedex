import { extendTheme, StyleFunctionProps } from "@chakra-ui/react"
import { colors } from "./colors"

export const theme = extendTheme({
    components: {
        fonts: {
            heading: "Rubik",
            body: "Rubik",
        },
        Button: {
            variants: {
                solid: (props: StyleFunctionProps) => ({
                    _hover: {
                        opacity: 0.7,
                        bg: props.colorMode
                    }
                }),
            },
        },
    },
    colors,
})