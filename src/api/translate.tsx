import axios from "axios"
import { useEffect, useState } from "react";
import Swal from "sweetalert2"
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

type Props = {
    text: string;
}

export default function TranslateComponent({ text }: Props) {
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const translateText = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://lingva.ml/api/v1/en/pt/${encodeURIComponent(text)}`
                );
                setTranslatedText(response.data.translation);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            } finally {
                setLoading(false);
            }
        };

        if (text) translateText();
    }, [text])

    return (
        <>
            {loading ? (
                <>
                    <Box
                        position="relative"
                        aria-busy="true"
                        userSelect="none"
                    >
                        <Text>
                            {text}
                        </Text>
                        <Box
                            pos="absolute"
                            inset="0"
                            bg="rgba(255, 255, 255, 0.8)"
                        >
                            <Center h="full">
                                <Spinner color="purple.500" />
                            </Center>
                        </Box>
                    </Box>
                </>
            ) : (
                <Text
                >
                    {translatedText}
                </Text>
            )}
        </>
    )

}; 
