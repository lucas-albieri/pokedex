import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Collapse, Flex, IconButton, Image, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import github from '../assets/images/github.png'
import masterball from '../assets/images/masterball.png'

export const Navbar = () => {

    const { isOpen, onToggle } = useDisclosure()
    const [isScrolled, setIsScrolled] = useState(false);

    const onScroll = () => {
        if (window.scrollY >= 66) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }

    useEffect(() => {
        onScroll()
        window.addEventListener("scroll", onScroll)
    }, [])

    return (
        <Box
            zIndex={4}
            w={"100%"}
        >
            <Flex
                backgroundColor={isScrolled ? "#0f0f0f" : "#fff"}
                position={"fixed"}
                w="100%"
                top={0}
                left={0}
                zIndex={3}
                transition="all .4s ease-in-out"
                py={{
                    base: 2,
                    md: isScrolled ? 5 : 4
                }}
                px={{
                    base: 2,
                    md: 60
                }}
                align={'center'}
                borderBottom={isScrolled ? "1px solid #efebf5" : "2px solid #efebf5"}
            >
                <Flex
                    flex={{
                        base: 1,
                    }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        bgColor={"gray.800"}
                        color={"white"}
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon
                            w={3}
                            h={3}
                        /> : <HamburgerIcon
                            w={5}
                            h={5}
                        />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    justifyContent={{
                        base: 'center',
                        md: 'center'
                    }}
                    alignItems={"center"}
                    w={"100%"}
                    gap={{
                        base: 6,
                        md: 0
                    }}
                >
                    <Flex
                        w={{
                            base: "auto",
                            md: "25%"
                        }}
                        align={"center"}
                        justify={"center"}
                        cursor={"pointer"}
                        onClick={() => window.location.href = '/'}
                    >
                        <Image
                            src={masterball}
                            w={{
                                base: "40px",
                                md: "50px"
                            }}
                        />
                        <Text
                            display={{ base: 'flex', }}
                            fontSize={{
                                base: "sm",
                                md: "xl"
                            }}
                            fontWeight={"bold"}
                            color={"#0f0f0f"}
                            ml={{
                                base: 3,
                                md: 0
                            }}
                        >
                            Pokedex Generations
                        </Text>

                    </Flex>

                    <Flex
                        display={{ base: 'none', md: 'flex' }}
                        alignItems={"center"}
                        w={"50%"}
                        justifyContent={"center"}
                    >
                        <DesktopNav />
                    </Flex>

                    <Flex
                        w={{
                            base: "auto",
                            md: "25%"
                        }}
                        justify={"flex-end"}
                    >
                        <Image
                            src={github}
                            w={{
                                base: "20px",
                                md: "30px"
                            }}
                            objectFit={"contain"}
                            cursor={"pointer"}
                            onClick={() => window.open('https://github.com/lucas-albieri/pokedex')}
                        />
                    </Flex>

                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Pokemons',
        href: '/pokemons'
    },
    // {
    //     label: 'GitHub',
    //     href: 'https://github.com/lucas-albieri/pokedex'
    // },

]


const DesktopNav = () => {

    const navigate = useNavigate()

    return (
        <Stack
            direction={'row'}
            // spacing={4}
            w={'100%'}
            align={'center'}
            justify={'center'}

        >
            {
                NAV_ITEMS.map((navItem) => (
                    <Box
                        key={navItem.label}
                        p={2}
                        cursor={"pointer"}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={"gray.800"}
                        _hover={{
                            color: "gray.900",
                            borderBottom: "solid 1px",
                            borderColor: "black"
                        }}
                        onClick={() => {
                            if (navItem.href) {
                                navigate(navItem.href)
                            }
                        }}
                    >
                        {navItem.label}
                    </Box>
                ))
            }
        </Stack >
    )
}


const MobileNav = () => {
    return (
        <Stack
            bg={'gray.50'}
            p={6}
            display={{ md: 'none' }
            }>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, href }: NavItem) => {
    const { onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>

                <Text
                    fontWeight={600}
                    color={'gray.800'}
                    fontSize={'sm'}
                >
                    {label}
                </Text>
            </Box>
        </Stack>
    )
}

interface NavItem {
    label: string
    href?: string
}

