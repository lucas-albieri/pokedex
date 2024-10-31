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
                    base: padding ? 2 : 0,
                    lg: padding ? 30 : 0,
                    xl: padding ? 60 : 0
                }}
                pt={{
                    base: padding ? 16 : 0,
                    md: padding ? 24 : 0
                }}
                pb={padding ? 10 : 0}
            >
                {children}
            </Stack>

        </Stack>
    )
}