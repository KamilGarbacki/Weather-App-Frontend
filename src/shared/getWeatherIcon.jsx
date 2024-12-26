import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faCloudSun,
    faSmog,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faCloudShowersWater,
    faCloudBolt,
} from "@fortawesome/free-solid-svg-icons";

const getWeatherIcon = (code, iconStyle) => {
    // const iconStyle = { fontSize: "1.5rem" };

    const iconMap = new Map([
        [0, faSun],
        [[1, 2, 3], faCloudSun],
        [[45, 48], faSmog],
        [[51, 53, 55, 56, 57], faCloudRain],
        [[61, 63, 65, 66, 67], faCloudShowersHeavy],
        [[71, 73, 75, 77, 85, 86], faSnowflake],
        [[80, 81, 82], faCloudShowersWater],
        [[95, 96, 99], faCloudBolt],
    ]);

    for (const [key, icon] of iconMap) {
        if (Array.isArray(key) ? key.includes(code) : key === code) {
            return <FontAwesomeIcon icon={icon} style={iconStyle} />;
        }
    }

    return null;
};

export default getWeatherIcon;