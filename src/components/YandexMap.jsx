import React, { useEffect, useRef, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

export default function YandexMap({ coords }) {
    const isMobile = useIsMobile();
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (window.ymaps) {
            setIsReady(true);
            return;
        }

        if (!document.getElementById('ymaps-script')) {
            const script = document.createElement('script');
            script.id = 'ymaps-script';
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=51d7688b-a7f2-4be1-af83-9a8e7325c37c&lang=ru_RU';
            script.async = true;
            script.onload = () => setIsReady(true);
            document.body.appendChild(script);
        } else {
            const checkReady = () => {
                if (window.ymaps) setIsReady(true);
                else setTimeout(checkReady, 100);
            };
            checkReady();
        }
    }, []);

    useEffect(() => {
        if (!isReady || !mapRef.current) return;

        if (mapInstanceRef.current) {
            mapInstanceRef.current.destroy();
            mapInstanceRef.current = null;
        }

        window.ymaps.ready(() => {
            const map = new window.ymaps.Map(mapRef.current, {
                center: coords,
                zoom: isMobile ? 16 : 18,
                controls: [],
            });

            const placemark = new window.ymaps.Placemark(coords, {
                hintContent: 'Мы здесь!',
                balloonContent: 'Добро пожаловать!',
            });

            map.geoObjects.add(placemark);
            mapInstanceRef.current = map;

            // 🧠 Наблюдаем за ресайзом контейнера
            const observer = new ResizeObserver(() => {
                map.container.fitToViewport();
            });
            observer.observe(mapRef.current);

            // 👇 На случай анимаций
            setTimeout(() => {
                map.container.fitToViewport();
            }, 500);

            // Чистим
            return () => {
                observer.disconnect();
                map.destroy();
            };
        });
    }, [isReady, coords]);

    return (
        <div
            ref={mapRef}
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
            }}
        />
    );
}
