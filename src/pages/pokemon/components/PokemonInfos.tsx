import { Flex, Image, Text } from "@chakra-ui/react"
import male from '../../../assets/images/male.png'
import female from '../../../assets/images/femea.png'

type Props = {
    label: string
    value: string

}
export function PokemonInfos({ label, value }: Props) {


    console.log(label, value)
    return (
        <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            flexWrap={"wrap"}
        >
            <Text
                fontSize={"md"}
            >
                {label}
            </Text>
            {
                value === "F e M" ? <MaleAndFemale /> : <Text
                    fontSize={"lg"}
                    fontWeight={"bold"}
                    textTransform={"capitalize"}
                >
                    {value}
                </Text>
            }

        </Flex>
    )
}


function MaleAndFemale() {
    return (
        <Flex
            flexDirection={"row"}
            flexWrap={"wrap"}
            gap={2}
            w={"100%"}
        >
            <Image
                src={male}
                w={"12%"}
            />
            <Image
                src={female}
                w={"12%"}

            />
        </Flex>
    )
}