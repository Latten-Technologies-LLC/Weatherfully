import React, { useEffect, useState } from 'react'

// Layout
import { Layout } from '../layouts/Layout'
import { render } from '@testing-library/react';

export default function Home() 
{
    // Get current location and state
    const [location, setLocation] = useState(false);
    const [locationStatus, setLocationStatus] = useState(null);

    // Location data
    const [locationData, setLocationData] = useState(null);

    // Openweather API
    const ow_api_key = "3589a3029b300dee11a1b7ec98ce6fb0";
    const ow_api_url = "https://api.openweathermap.org/data/2.5";
    const ow_icon_url = "https://openweathermap.org/img/w";
                    
    // Weather data
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null); 
    
    // Get weather data
    const getWeatherData = async (lat, lon) => {
        const response = await fetch(`${ow_api_url}/weather?lat=${lat}&lon=${lon}&appid=${ow_api_key}&units=metric`);
        const data = await response.json();
        setWeatherData(data);
    }
    
    // Get forecast data
    const getForecastData = async (lat, lon) => {
        const response = await fetch(`${ow_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${ow_api_key}&units=metric`);
        const data = await response.json();
        setForecastData(data);
        console.log(data.city.name)
    }
    
    // Get all of the weather data
    const callWeatherData = (data) => {
        // Get logitude and latitude
        const lat = data.coords.latitude;
        const lon = data.coords.longitude;

        // Use effect
        getWeatherData(lat, lon);
        getForecastData(lat, lon);

    }

    const getCurrentDate = () => {
        const date = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const currentDate = `${day}, ${month} ${date.getDate()}, ${year}`;
        return currentDate;
    }

    // Get current location
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationStatus('Geolocation is not supported by your browser');
        } else {
            setLocationStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(true);
                setLocationData(position);
                setLocationStatus(null);
    
                // Get weather data
    
            }, () => {
                setLocationStatus('Unable to retrieve your location');
            });
        }
    }

    // Use effect
    useEffect(() => {
        getCurrentLocation();

        // Get weather data
        if (location){
            callWeatherData(locationData);
        }
    }, [location]);

    // Render home page if location is not null
    if (location && weatherData != null && forecastData != null) 
    {
        // Great lets get some consts
        const weatherIcon = weatherData.weather[0].icon;
        const weatherDescription = weatherData.weather[0].description;
        const weatherName = weatherData.weather[0].main;

        const weatherTemp = Math.round(weatherData.main.temp * 100) / 100;
        const weatherTempMin = Math.round(weatherData.main.temp_min * 100) / 100;
        const weatherTempMax = weatherData.main.temp_max;
        const weatherHumidity = weatherData.main.humidity;
        const weatherWindSpeed = weatherData.wind.speed;
        const weatherWindDirection = weatherData.wind.deg;
        const weatherFeelsLike = weatherData.main.feels_like;

        // Forecast data
        const forecastList = forecastData.list;
        const forecastCity = forecastData.city.name;
        const forecastCountry = forecastData.city.country;

        // Decide icon based on weather
        const getWeatherIcon = (desc) => {
            switch (desc) {
                case 'clear sky':
                    return 'fa-solid fa-sun';
                case 'few clouds':
                    return 'fa-solid fa-cloud-sun';
                case 'scattered clouds':
                    return 'fa-solid fa-cloud';
                case 'broken clouds':
                    return 'fa-solid fa-cloud';
                case 'shower rain':
                    return 'fa-solid fa-cloud-rain';
                case 'rain':
                    return 'fa-solid fa-cloud-showers-heavy';
                case 'thunderstorm':
                    return 'fa-solid fa-bolt';
                case 'snow':
                    return 'fa-solid fa-snowflake';
                case 'mist':
                    return 'fa-solid fa-smog';
                default:
                    return 'fa-solid fa-cloud';
            }
        }

        const icon = getWeatherIcon(weatherDescription);

        // Display 10 hour forecast
        const display10HourForecast = () => {
            if (forecastData != null) {
                const forecastList = forecastData.list;
                const forecastCity = forecastData.city.name;
                const forecastCountry = forecastData.city.country;
                const forecastListLength = forecastList.length;

                forecastList.map((item, index) => {
                    if (index < 10) {
                        const forecastIcon = getWeatherIcon(item.weather[0].description);
                        const forecastTemp = Math.round(item.main.temp * 100) / 100;
                        const forecastTempMin = Math.round(item.main.temp_min * 100) / 100;
                        const forecastTempMax = Math.round(item.main.temp_max * 100) / 100;
                        const forecastHumidity = item.main.humidity;
                        const forecastWindSpeed = item.wind.speed;
                        const forecastWindDirection = item.wind.deg;
                        const forecastFeelsLike = Math.round(item.main.feels_like * 100) / 100;
                        const forecastDate = new Date(item.dt * 1000);
                        const forecastDay = forecastDate.getDay();
                        const forecastTime = forecastDate.getHours();

                        return (
                            <div className="forecast-item col-6 col-md-3" key={index}>
                                <div className="forecast-item-head">
                                    <h5>{forecastDay} {forecastTime}:00</h5>
                                </div>
                                <div className="forecast-item-body">
                                    <div className="forecast-item-body-icon">
                                        <h1 className='weather-icon'><i className={forecastIcon}></i></h1>
                                    </div>
                                    <div className="forecast-item-body-info">
                                        <h1>{forecastTemp}<sup>&deg;C</sup></h1>
                                        <h5>Min: {forecastTempMin}<sup>&deg;C</sup></h5>
                                        <h5>Max: {forecastTempMax}<sup>&deg;C</sup></h5>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                });
            }
        }

        return (
            <Layout>
                <div className='page-home container'>
                    <div className="page-home-head row">
                        <div className="home-head-left col-6 ">
                            <h3>{getCurrentDate()}</h3>
                        </div>
                        <div className="home-head-right col-6">
                            <h3>{forecastCity}, {forecastCountry}</h3>
                        </div>
                    </div>
                    <div className="page-home-body row">
                        <div className="home-body-left col-6">
                            <div className="home-body-left-weather-icon">
                                <h1 className='weather-icon'><i className={icon}></i></h1>
                            </div>
                            <div className="home-body-left-weather-info">
                                <h1>{weatherTemp}<sup>&deg;C</sup></h1>
                                <h5>Min: {weatherTempMin}<sup>&deg;C</sup> | Max: {weatherTempMax}<sup>&deg;C</sup></h5>
                            </div>
                            <div className="home-body-left-weather-description">
                                <h2>{weatherName}</h2>
                                <h5>{weatherDescription.toUpperCase()}</h5>
                            </div>
                        </div>
                        <div className="home-body-right col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="home-body-right-weather-info row">
                            <div className="home-body-right-weather-info-item col-6">
                                    <h3>Feels Like</h3>
                                    <h2>{weatherFeelsLike}<sup>o</sup></h2>
                                </div>
                                <div className="home-body-right-weather-info-item col-6">
                                    <h3>Humidity</h3>
                                    <h2>{weatherHumidity}%</h2>
                                </div>
                                <div className="home-body-right-weather-info-item col-6">
                                    <h3>Wind Speed</h3>
                                    <h2>{weatherWindSpeed} km/h</h2>
                                </div>
                                <div className="home-body-right-weather-info-item col-6">
                                    <h3>Wind Direction</h3>
                                    <h2>{weatherWindDirection}<sup>o</sup></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 12 hour forecast */}
                    <div className="page-home-forecast row">
                        <div className="home-forecast col-12">
                            <div className="home-forecast-title">
                                <h2>6 Hour Forecast</h2>
                            </div>
                            <div className="home-forecast-body row gx-3">
                                    {forecastList.map((item, index) => {
                                        if (index < 6) {
                                            const forecastIcon = getWeatherIcon(item.weather[0].description);
                                            const forecastTemp = Math.round(item.main.temp * 100) / 100;
                                            const forecastTempMin = Math.round(item.main.temp_min * 100) / 100;
                                            const forecastTempMax = Math.round(item.main.temp_max * 100) / 100;
                                            const forecastHumidity = item.main.humidity;
                                            const forecastWindSpeed = item.wind.speed;
                                            const forecastWindDirection = item.wind.deg;
                                            const forecastFeelsLike = Math.round(item.main.feels_like * 100) / 100;
                                            const forecastDate = new Date(item.dt * 1000);
                                            const forecastDay = forecastDate.getDay();
                                            const forecastTime = forecastDate.getHours();

                                            // Convert forecast time to 12 hour
                                            let forecastTime12 = forecastTime;
                                            let forecastTime12Period = 'AM';
                                            if (forecastTime12 > 12) {
                                                forecastTime12 = forecastTime12 - 12;
                                                forecastTime12Period = 'PM';
                                            }

                                            return (
                                                <div className="forecast-item col-lg-2 col-md-2 col-sm-6 col-xs-6" key={index}>
                                                    <div className="forecast-item-body">
                                                        <div className="forecast-item-body-icon">
                                                            <h1 className='weather-time'>{forecastTime12}{forecastTime12Period}</h1>
                                                            <h1 className='weather-icon'><i className={forecastIcon}></i></h1>
                                                        </div>
                                                        <div className="forecast-item-body-info">
                                                            <h1>{forecastTemp}<sup>&deg;</sup></h1>
                                                            <h5>{item.weather[0].description.toUpperCase()}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    } else {
        return(<div>{locationStatus}</div>)
    }
}
