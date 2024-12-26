import {
    Box, Button,
    Flex,
    Text, useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import WeatherWidget from "./WeatherWidget.jsx";

export default function NavigationBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} boxShadow="sm">
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Text fontSize="lg" fontWeight="bold" color="green.500">Weather App by Kamil Garbacki</Text>
                    <Button onClick={toggleColorMode} size="sm" colorScheme="green">
                        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                    </Button>
                </Flex>
            </Box>
            <WeatherWidget/>
        </>
    )
}