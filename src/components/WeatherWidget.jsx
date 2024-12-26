import {useEffect, useState} from "react";
import {getReportSummary, getWeatherReport} from "../services/client.js";
import TableComponent from "./Table.jsx";
import {VStack, Spinner, Box} from "@chakra-ui/react";
import FooterComponent from "./Footer.jsx";
import MapComponent from "./Map.jsx";
import DayCard from "./DayCard.jsx";
import {errorNotification, successNotification} from "../services/notification.js";

export default function WeatherWidget(){
    const [tableData, setTableData] = useState(null);
    const [footerData, setFooterData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [geolocationAvailable, setGeolocationAvailable] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(true);

    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocationAvailable(true);
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    },
                (error) => {
                    setLoadingTable(false);
                    setLoadingFooter(false);
                    errorNotification("Could not access your location", "Please select your location manually");
                }
            )
        } else {
            errorNotification("Geolocation is not accessible in your device", "Please select your location manually");
            setLoadingTable(false);
            setLoadingFooter(false);
        }
    }, []);

    useEffect(() => {
        if (latitude !== null && longitude !== null && geolocationAvailable) {
            successNotification("Location accessed!", "Successfully accessed the location of your device!");
            setLoadingTable(true);
            setLoadingFooter(true);
            getWeatherReport(latitude, longitude)
                .then(result => {
                    setTableData(result.data);
                }).catch(err => {
                errorNotification(err.code, err.response.data.message);
                console.error(err)
            }).finally(() => {
                setLoadingTable(false);
            })


            getReportSummary(latitude, longitude)
                .then(result => {
                    setFooterData(result.data);
                })
                .catch(err => {
                    errorNotification(err.code, err.response.data.message);
                    console.error(err)
                })
                .finally(() => {
                    setLoadingFooter(false);
                })
        }
    }, [latitude, longitude]);

    if(loadingTable || loadingFooter){
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='green.500'
                    size='xl'
                />
            </Box>
        )
    }

    if (!geolocationAvailable) {
        return (
            <VStack spacing={4} align="stretch" p={4}>
                <VStack
                    alignItems="center"
                >
                    {tableData && <DayCard data={tableData} />}
                    <MapComponent startingLocation={null} onLocationSelect={(location)=>{
                        getWeatherReport(location[0], location[1])
                            .then(result => {
                                setTableData(result.data);
                            }).catch(err => {
                            errorNotification(err.code, err.response.data.message);
                            console.error(err)
                        })


                        getReportSummary(location[0], location[1])
                            .then(result => {
                                setFooterData(result.data);
                            })
                            .catch(err => {
                                errorNotification(err.code, err.response.data.message);
                                console.error(err)
                            })
                    }}/>
                    {tableData && <TableComponent data={tableData} />}
                </VStack>
                <VStack
                    spacing={4}
                    align="stretch"
                    p={4}
                >
                    {footerData && <FooterComponent data={footerData} />}
                </VStack>
            </VStack>
        );
    }

    return (
        <VStack
            spacing={4}
            align="stretch"
            p={4}
        >
            <VStack
                alignItems="center"
            >
                {tableData && <DayCard data={tableData} />}
                <MapComponent startingLocation={[latitude, longitude]} onLocationSelect={(location)=>{
                    getWeatherReport(location[0], location[1])
                        .then(result => {
                            setTableData(result.data);
                        }).catch(err => {
                        errorNotification(err.code, err.response.data.message);
                        console.error(err);
                    })


                    getReportSummary(location[0], location[1])
                        .then(result => {
                            setFooterData(result.data);
                        })
                        .catch(err => {
                            errorNotification(err.code, err.response.data.message);
                            console.error(err);
                        })
                }}/>
                {tableData && <TableComponent data={tableData} />}
            </VStack>
            <VStack
                spacing={4}
                align="stretch"
                p={4}
            >
                {footerData && <FooterComponent data={footerData} />}
            </VStack>
        </VStack>
    );

}