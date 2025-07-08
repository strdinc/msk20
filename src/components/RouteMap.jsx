import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TextRoute({ destinationCoords, apiKey }) {
    const [useManualStart, setUseManualStart] = useState(false);
    const [manualStart, setManualStart] = useState('');
    const [routeSteps, setRouteSteps] = useState([]);
    const [error, setError] = useState('');

    const fetchRoute = async (startCoords) => {
        if (
            !startCoords || !Array.isArray(startCoords) ||
            !destinationCoords || !Array.isArray(destinationCoords)
        ) {
            setError('Координаты не заданы');
            setRouteSteps([]);
            return;
        }

        const payload = {
            points: [
                { type: 'stop', lon: startCoords[0], lat: startCoords[1] },
                { type: 'stop', lon: destinationCoords[0], lat: destinationCoords[1] },
            ],
            route_mode: 'fastest',
            transport: 'pedestrian',
            output: 'detailed',
        };

        console.log('📡 Отправляем запрос маршрута:', JSON.stringify(payload, null, 2));

        try {
            const response = await axios.post(
                `https://routing.api.2gis.com/routing/7.0.0/global?key=${apiKey}`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('✅ Ответ API:', response.data);

            const maneuvers = response.data.result?.[0]?.maneuvers || [];
            if (maneuvers.length === 0) {
                setError('Маршрут не найден');
                setRouteSteps([]);
                return;
            }

            setRouteSteps(maneuvers);
            setError('');
        } catch (err) {
            console.error('❌ Ошибка при запросе маршрута:', err);
            setError('Не удалось получить маршрут.');
            setRouteSteps([]);
        }
    };

    const geocodeManualStart = async () => {
        if (!manualStart.trim()) {
            setError('Введите адрес');
            return;
        }

        try {
            setError('');
            const response = await axios.get(
                'https://catalog.api.2gis.com/3.0/items/geocode',
                {
                    params: {
                        key: apiKey,
                        q: manualStart,
                    },
                }
            );

            const point = response.data.result.items?.[0]?.point;
            if (point) {
                fetchRoute([point.lon, point.lat]);
            } else {
                setError('Адрес не найден');
                setRouteSteps([]);
            }
        } catch (e) {
            setError('Ошибка геокодирования');
            setRouteSteps([]);
        }
    };

    const detectGeolocation = () => {
        if (!navigator.geolocation) {
            setError('Геолокация не поддерживается');
            setRouteSteps([]);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = [position.coords.longitude, position.coords.latitude];
                fetchRoute([37.582143, 55.753413]);
            },
            () => {
                setError('Не удалось определить местоположение');
                setRouteSteps([]);
            }
        );
    };

    useEffect(() => {
        if (useManualStart) {
            if (manualStart.trim()) {
                geocodeManualStart();
            } else {
                setRouteSteps([]);
                setError('');
            }
        } else {
            detectGeolocation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manualStart, useManualStart, destinationCoords]);

    return (
        <div style={{marginTop: 20}}>
            <label style={{display: 'block', marginBottom: 8}}>
                <input
                    type="checkbox"
                    checked={useManualStart}
                    onChange={() => setUseManualStart(v => !v)}
                />
                &nbsp; Ввести начальную точку вручную
            </label>

            {useManualStart && (
                <input
                    type="text"
                    value={manualStart}
                    onChange={e => setManualStart(e.target.value)}
                    placeholder="Например, Арбат 1"
                    style={{width: '100%', padding: 8, marginBottom: 12}}
                />
            )}

            {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}

            <ul style={{listStyle: 'none', padding: 0}}>
                {routeSteps.length > 0 ? (
                    routeSteps.map((step, idx) => {
                        const title = step.comment?.toLowerCase() === 'start'
                            ? 'Старт маршрута'
                            : step.comment?.toLowerCase() === 'finish'
                                ? 'Финиш'
                                : step.comment;

                        return (
                            <li key={idx} style={{marginBottom: 12, fontSize: 16}}>
                                <strong style={{color: '#1976d2'}}>{title}</strong>
                                {step.outcoming_path_comment && step.comment !== step.outcoming_path_comment && (
                                    <p style={{margin: '4px 0 0 0', color: '#555'}}>
                                        ({step.outcoming_path_comment})
                                    </p>
                                )}
                            </li>
                        );
                    })
                ) : (
                    <li>Маршрут пока не построен</li>
                )}
            </ul>

        </div>
    );
}
