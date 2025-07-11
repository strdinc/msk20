// Компонент Card.jsx
import './Card.css';

import './Card.css';
import YandexMap from './YandexMap.jsx';
import Weather from './WeatherBlock.jsx';
import useIsMobile from '../hooks/useIsMobile';


export default function Card({
                                 background, title, description, address, metroStation, type, importance,
                                 coords, isOpen, onToggle
                             }) {
    const isMobile = useIsMobile();

    return (
        <>
            <div
                className="cardNmap"
                style={{
                    width: isMobile ? '100%' : isOpen ? '1748px' : '400px',
                    height: isMobile ? (isOpen ? 'auto' : 'auto') : '492px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    transition: isMobile ? 'height 0.5s ease' : 'width 0.5s ease',
                }}
            >
                {/* Карточка слева / сверху */}
                <button
                    type="button"
                    className="btn"
                    onClick={onToggle}
                    style={{
                        width: isMobile ? '100%' : '385px',
                        transition: 'width 0.5s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        flexShrink: 0,
                    }}
                >
                    <div className="card" style={{width: '100%'}}>
                        <img src={background} className="background" alt="background"/>
                        <div className="attributes">
                            <div className="titleNdescription">
                                <div className="title geologica-semibold">{title}</div>
                                <div className="description geologica-medium">{description}</div>
                            </div>
                            <div className="addressNmetro">
                                <div className="address geologica-light">{address}</div>
                                <div className="metroStation geologica-light">{metroStation}</div>
                            </div>
                            <div className="tags">
                                <div className="type geologica-regular">{type}</div>
                                <div className="importance geologica-regular">{importance}</div>
                            </div>
                        </div>
                    </div>
                </button>

                {/* Карта справа (десктоп) или снизу (мобила) */}
                <div
                    className="map-wrapper"
                    style={{
                        height: isMobile ? (isOpen ? '442px' : '0px') : '100%',
                        width: isMobile ? '100%' : isOpen ? 'calc(1748px - 385px - 20px)' : '0px',
                        marginLeft: isMobile ? 0 : '20px',
                        marginBottom: isMobile ? '30px' : 0,
                        overflow: 'hidden',
                        transition: 'height 0.5s ease, width 0.5s ease',
                        flexShrink: 0,
                    }}
                >
                    <div className="map-content" style={{height: isMobile ? '100%' : '476px', width: '100%'}}>
                        {isOpen && <YandexMap coords={coords}/>}
                    </div>
                </div>
            </div>
            {isOpen && <Weather lat={coords[0]} lon={coords[1]} />}

        </>


    );
}