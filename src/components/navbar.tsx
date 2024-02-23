import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Collapse, Flex, IconButton, Image, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"


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
            zIndex={2}
        >
            <Flex
                backgroundColor={isScrolled ? "white" : "transparent"}
                padding={isScrolled ? "1.2rem 12rem" : "2rem 12rem"}
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
                borderBottom={isScrolled ? "1px solid #efebf5" : "none"}
            >
                <Flex
                    flex={{
                        base: 1,
                    }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{
                        base: 'center',
                        md: 'start'
                    }}
                    align={"center"}
                >
                    <Image
                        src="https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_640.png"
                        w={"3%"}
                    />

                    <Flex
                        display={{ base: 'none', md: 'flex' }}
                        ml={10}
                    >
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                >
                    <Button
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'indigo.400'}
                        transition={"1s "}
                        _hover={{
                            bg: 'indigo.700',
                        }}>
                        Qual é o Pokemon do dia?
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Pokemons',
    },
    {
        label: 'Teste',
    },
    {
        label: 'GitHub',
    },
    {
        label: 'Teste',
    },
]


const DesktopNav = () => {
    return (
        <Stack
            direction={'row'}
            spacing={4}
        >
            {NAV_ITEMS.map((navItem) => (
                <Box
                    key={navItem.label}
                    p={2}
                    cursor={"pointer"}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={"gray.100"}
                    _hover={{
                        color: "white",
                        pb: -2,
                        borderBottom: "solid 1px",
                        borderColor: "white"
                    }}
                >
                    {navItem.label}

                </Box>
            ))}
        </Stack>
    )
}


const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure()

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
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
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

