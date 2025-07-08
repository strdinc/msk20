import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const getWeatherDescription = (code) => {
    if (code === 0) return 'Ясно ☀️';
    if (code >= 1 && code <= 3) return 'Облачно ⛅';
    if (code === 45 || code === 48) return 'Туман 🌫';
    if (code >= 51 && code <= 57) return 'Морось 🌧';
    if (code >= 61 && code <= 67) return 'Дождь 🌧';
    if (code >= 71 && code <= 77) return 'Снег 🌨';
    if (code >= 80 && code <= 82) return 'Ливень 🌧🌧';
    if (code >= 85 && code <= 86) return 'Снегопад ❄️';
    if (code === 95) return 'Гроза ⚡';
    if (code >= 96 && code <= 99) return 'Гроза с градом ⛈';
    return 'Неизвестно';
};


const WeatherBlock = ({ coords }) => {
    const [current, setCurrent] = useState(null);
    const [hourly, setHourly] = useState([]);
    const [precipNow, setPrecipNow] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!coords || coords.length !== 2) return;
        const [latitude, longitude] = coords;

        const fetchWeather = async () => {
            try {
                const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
                    params: {
                        latitude,
                        longitude,
                        hourly: 'temperature_2m,precipitation',
                        current_weather: true,
                        timezone: 'auto'
                    }
                });

                const { current_weather, hourly: hourlyData } = res.data;

                // найдём осадки по времени current_weather
                const index = hourlyData.time.findIndex(t => t === current_weather.time);
                const precipitation = index !== -1 ? hourlyData.precipitation[index] : null;

                setCurrent(current_weather);
                setPrecipNow(precipitation);

                const today = new Date().toISOString().slice(0, 10);
                const hourlyToday = hourlyData.time
                    .map((t, i) => ({
                        time: t,
                        temp: hourlyData.temperature_2m[i],
                        precip: hourlyData.precipitation[i]
                    }))
                    .filter(h => h.time.startsWith(today));

                setHourly(hourlyToday);
            } catch (e) {
                setError('Не удалось загрузить погоду');
                console.error(e);
            }
        };

        fetchWeather();
    }, [coords?.[0], coords?.[1]]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (!current || hourly.length === 0) return <div>Загрузка информации о погоде…</div>;

    return (
        <div className="p-4 bg-white rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-3">Сейчас</h2>
            <p>🌡 Температура: <b>{current.temperature}°C</b></p>
            <p>🌤 Состояние: <b>{getWeatherDescription(current.weathercode)}</b></p>


            <h3 className="text-lg font-semibold mt-4 mb-2">Прогноз по часам</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={hourly.map(h => ({
                    time: h.time.slice(11, 16),
                    temp: h.temp
                }))}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip formatter={v => `${v}°C`} />
                    <Line type="monotone" dataKey="temp" stroke="#007bff" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherBlock;
