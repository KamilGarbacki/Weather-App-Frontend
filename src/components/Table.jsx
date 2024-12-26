import {Box, Table, Tbody, Td, Th, Tr} from "@chakra-ui/react";
import React from "react";
import formatDate from "../shared/formatDate.js";
import getWeatherIcon from "../shared/getWeatherIcon.jsx";


export default function TableComponent({ data }) {
    const headersMap = [
        { key: "generatedEnergies", name: "Energy Generated (kWh):" },
        { key: "minTemps", name: "Lowest Temperature of the Day (℃):" },
        { key: "maxTemps", name: "Highest Temperature of the Day (℃):" },
        { key: "weatherCodes", name: "Weather: " },
        { key: "dates", name: "Date:" },
    ];

    const iconStyle = { fontSize: "1.5rem" };

    return (
        <Box
            overflowX="auto"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            boxShadow="2xl"
            h="100%"
            w="80%"
            fontSize={18}
        >
            <Table
                variant="striped"
                size="md">
                <Tbody>
                    {headersMap.map(({ key, name }, index) => (
                        <Tr key={index}>
                            <Th>{name}</Th>
                            {data[key].map((value, idx) => (
                                <Td key={idx} style={{ textAlign: "center" }}>
                                    {key === "dates" ? formatDate(value)
                                        : key === "generatedEnergies" ? value.toFixed(2)
                                            : key === "weatherCodes" ? getWeatherIcon(value, iconStyle)
                                                : value
                                    }
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};