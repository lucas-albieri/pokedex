import { Stack } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Navbar } from "./navbar"

type Props = {
    children: ReactNode
    padding?: boolean
}

export const Layout = ({ children, padding = true }: Props) => {
    return (
        <Stack
            w={"100%"}
            h={"100vh"}
            overflow={"hidden"}
            bgColor={"#1c1c1c"}
            pos={"relative"}
        >
            <Navbar />
            <Stack
                h={"100%"}
                overflowY={"auto"}
                w={"100%"}
                px={{
                    base: 2,
                    md: padding ? 60 : 0
                }}
                pt={padding ? 20 : 0}
            >
                {children}
            </Stack>

        </Stack>
    )
}