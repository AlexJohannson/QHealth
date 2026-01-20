import {useEffect, useState} from "react";
import './Weather.css';

function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function loadWeather() {
            try {
                const res = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=auto:ip&aqi=no`
                );
                const data = await res.json();
                setWeather(data);
            } catch (err) {
                console.error("Weather error:", err);
            }
        }

        loadWeather();
    }, []);

    if (!weather) return <div className={'loading-weather'}>Loading weather...</div>;

    return (
        <div className={'weather-container'}>
            <div className={'weather-icon-div'}>
                <img
                    className='weather-icon'
                    src={weather.current.condition.icon}
                    alt="weather icon"
                />
            </div>
            <div className={'weather-information-div'}>
                <span>City: {weather.location.name}</span>
                <span>Temp: {Math.round(weather.current.temp_c)}°C</span>
                <span>Conditions: {weather.current.condition.text}</span>
            </div>
        </div>
    );
}

export {Weather};