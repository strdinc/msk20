import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Простое сопоставление кодов погоды с описанием (на русском)
const weatherCodeMap = {
    0: 'Ясно',
    1: 'Переменная облачность',
    2: 'Облачно',
    3: 'Пасмурно',
    45: 'Туман',
    61: 'Небольшой дождь',
    63: 'Дождь',
    80: 'Ливень',
    95: 'Гроза',
};

const Weather = ({ lat, lon }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // URL для Open-Meteo API с добавлением precipitation_probability
    const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m,precipitation_probability&timezone=Europe%2FMoscow`;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get(WEATHER_URL);
                const { current, hourly } = response.data;

                // Текущая погода
                setCurrentWeather({
                    temperature: current.temperature_2m,
                    weathercode: current.weathercode,
                    description: weatherCodeMap[current.weathercode] || 'Неизвестно',
                });

                // Почасовой прогноз (берем первые 24 часа)
                const hourlyData = hourly.time.slice(0, 24).map((time, index) => ({
                    time: new Date(time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                    temp: hourly.temperature_2m[index],
                    precipitation: hourly.precipitation_probability[index],
                }));
                setHourlyWeather(hourlyData);
            } catch (err) {
                setError('Ошибка при загрузке данных о погоде');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lon]);

    // Данные для графика
    const chartData = {
        labels: hourlyWeather.map(data => data.time),
        datasets: [
            {
                label: 'Температура (°C)',
                data: hourlyWeather.map(data => data.temp),
                fill: false,
                borderColor: '#36A2EB',
                backgroundColor: '#36A2EB',
                yAxisID: 'y-temp',
                tension: 0.4,
            },
            {
                label: 'Вероятность осадков (%)',
                data: hourlyWeather.map(data => data.precipitation),
                fill: false,
                borderColor: '#FF6384',
                backgroundColor: '#FF6384',
                yAxisID: 'y-precipitation',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            'y-temp': {
                type: 'linear',
                display: true,
                position: 'left',
                title: { display: true, text: 'Температура (°C)' },
            },
            'y-precipitation': {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: 'Вероятность осадков (%)' },
                grid: { drawOnChartArea: false }, // Убираем сетку для второй оси
                suggestedMax: 100, // Максимум 100% для вероятности осадков
            },
            x: { title: { display: true, text: 'Время' } },
        },
    };

    if (loading) return <div className="text-center text-gray-500">Загрузка погоды...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
            {/* Текущая погода */}
            {currentWeather && (
                <div className="flex items-center mb-4">
                    <div>
                        <p className="text-sm capitalize">{currentWeather.description}</p>
                        <p className="text-xl">{Math.round(currentWeather.temperature)}°C</p>
                    </div>
                </div>
            )}

            {/* График погоды */}
            {hourlyWeather.length > 0 && (
                <div>
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default Weather;