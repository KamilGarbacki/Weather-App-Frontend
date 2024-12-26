import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {Box, Text} from "@chakra-ui/react";


const SelectLocation = ({ setSelectedPosition }) => {
    useMapEvents({
        contextmenu: (e) => {
            setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
};

export default function MapComponent({ onLocationSelect, startingLocation }) {
    const [selectedPosition, setSelectedPosition] = useState(startingLocation);

    const handleLocationSelect = (position) => {
        setSelectedPosition(position);
        if (onLocationSelect) {
            onLocationSelect(position);
        }
    };

    if(startingLocation == null){
        startingLocation = [50.049267272112196, 19.966624213774303]
    }

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="2xl"
            overflow="hidden"
            h="60vh"
            w="80%"
        >
            <Text
                mb={3}
                fontSize={18}
            >
                Right-click on the map to select a new loacation
            </Text>
            <MapContainer
                center={startingLocation}
                zoom={13}
                style={{height: "90%", width: "100%"}}
                scrollWheelZoom={false}
                borderRadius="md"
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <SelectLocation setSelectedPosition={handleLocationSelect}/>
                {selectedPosition && (
                    <Marker position={selectedPosition}>
                        <Popup>
                            You are here :)
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </Box>
    );
};
