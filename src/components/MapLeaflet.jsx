import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default function MapLeaflet({ coords }) {
    return (
        <MapContainer
            center={coords}
            zoom={17}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ height: '100%', width: '100%'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={coords}>
                <Popup>Мы здесь!</Popup>
            </Marker>
        </MapContainer>
    );
}
