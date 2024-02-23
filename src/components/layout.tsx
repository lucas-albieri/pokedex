import { Box, Stack } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Navbar } from "./navbar"

type Props = {
    children: ReactNode
    padding?: boolean
}

export const Layout = ({ children, padding }: Props) => {
    return (
        <Box
            w={"100%"}
        >
            <Navbar />
            <Stack
                w={"100%"}
                px={{
                    base: 2,
                    md: padding ? 60 : 0
                }}
            >
                {children}
            </Stack>

        </Box>
    )
}