import axios from "axios";

export const getWeatherReport = async (latitude, longitude) => {
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/weather/report/${latitude}/${longitude}`,
        );
    }catch(e){
        throw e;
    }
}

export const getReportSummary = async (latitude, longitude) => {
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/weather/summary/${latitude}/${longitude}`,
        );
    }catch(e){
        throw e;
    }
}