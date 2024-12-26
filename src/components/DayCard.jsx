import {
    Heading,
    Box,
    Flex,
    Text,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBatteryThreeQuarters,
    faTemperatureArrowUp,
    faTemperatureArrowDown,
    faCalendarDays
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import getWeatherIcon from "../shared/getWeatherIcon.jsx";
import formatDate from "../shared/formatDate.js";

export default function DayCard({ data }) {
    const iconStyle = { fontSize: "2rem", marginRight: "1rem", marginLeft: "1rem" };

    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            w="80%"
            bg={useColorModeValue("gray.50", "gray.700")}
            boxShadow="sm"
        >
            <Box
                w="full"
                bg={useColorModeValue("white", "gray.800")}
                boxShadow="2xl"
                rounded="md"
                overflow="hidden"
            >
                <Box>
                    <Text
                        textAlign="center"
                        mt={4}
                        mb={6}
                        fontSize="4xl"
                        fontWeight="bold"
                        color="green.500"
                    >
                        Today:
                    </Text>
                    <Flex justify="center">
                        {getWeatherIcon(data.weatherCodes[0], { fontSize: "7rem" })}
                    </Flex>
                    <Heading
                        fontSize="2xl"
                        fontWeight={600}
                        fontFamily="body"
                        textAlign="center"
                        m={3}
                    >
                        <FontAwesomeIcon icon={faCalendarDays} style={iconStyle} />
                        {formatDate(data.dates[0])}
                    </Heading>
                </Box>

                <Box px={6} py={4}>
                    <Flex
                        wrap="wrap"
                        spacing={4}
                        fontSize="lg"
                        fontWeight={500}
                        fontFamily="body"
                        align="stretch"
                        justifyContent="space-between"
                    >
                        <Text
                            m={1}
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            backgroundColor="gray.50"
                            boxShadow="2xl"
                            _dark={{ backgroundColor: "gray.700" }}
                            fontSize={20}
                        >
                            Highest Temperature
                            <FontAwesomeIcon icon={faTemperatureArrowUp} style={iconStyle} />
                            {data.maxTemps[0]}°C
                        </Text>
                        <Text
                            m={1}
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            backgroundColor="gray.50"
                            boxShadow="2xl"
                            _dark={{ backgroundColor: "gray.700" }}
                            fontSize={20}
                        >
                            Lowest Temperature
                            <FontAwesomeIcon icon={faTemperatureArrowDown} style={iconStyle} />
                            {data.minTemps[0]}°C
                        </Text>
                        <Text
                            m={1}
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            backgroundColor="gray.50"
                            boxShadow="2xl"
                            _dark={{ backgroundColor: "gray.700" }}
                            fontSize={20}
                        >
                            Solar Energy Generated
                            <FontAwesomeIcon icon={faBatteryThreeQuarters} style={iconStyle} />
                            {data.generatedEnergies[0].toFixed(2)} kWh
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}