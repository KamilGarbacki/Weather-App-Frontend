import {Box, Divider, VStack, Text} from "@chakra-ui/react";
import {
    faTemperatureArrowUp,
    faTemperatureArrowDown,
    faSun,
    faGauge,
    faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";


export default function FooterComponent({ data }) {
    const iconStyle = { fontSize: "1rem", marginRight: "0.5rem", marginLeft: "0.5rem" };

    const averagePressure = data.averageWeeklyPressure.toFixed(2);
    const averageSunExposure = (data.averageSunExposure / 3600).toFixed(2);

    const weekSummary = data.weekWithPrecipitation ? "Week with precipitation" : "Week without precipitation";

    return (
        <Box
            as="footer"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            backgroundColor="gray.50"
            mt={4}
            boxShadow="sm"
            _dark={{ backgroundColor: "gray.700" }}
        >
            <VStack
                spacing={3}
                align="stretch"
                fontSize={18}
            >
                <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="green.500"
                >
                    Week Summary:
                </Text>
                <Divider />
                <Text>Highest temperature: <FontAwesomeIcon icon={faTemperatureArrowUp} style={iconStyle} /> {data.maxWeeklyTemp}°C</Text>
                <Text>Lowest temperature: <FontAwesomeIcon icon={faTemperatureArrowDown} style={iconStyle} /> {data.minWeeklyTemp}°C</Text>
                <Text>Average Surface Pressure: <FontAwesomeIcon icon={faGauge} style={iconStyle} /> {averagePressure} hPa</Text>
                <Text>Average Sunlight Exposure: <FontAwesomeIcon icon={faSun} style={iconStyle} /> {averageSunExposure + ((averageSunExposure > 1) ? " hours" : " hour")} </Text>
                <Text>Week Summary: <FontAwesomeIcon icon={faClipboardList} style={iconStyle} /> {weekSummary}</Text>
            </VStack>
        </Box>
    );
}