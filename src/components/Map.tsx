"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), { ssr: false });

export default function Map({ data }: { data: any[] }) {
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        import("leaflet").then((leaflet) => {
            setL(leaflet);
        });
    }, []);

    if (!L) return <p>Загрузка карты...</p>;

    const icon = L.divIcon({
        html: `<div style="display: flex; justify-content: center; align-items: center; 
                            width: 30px; height: 30px; background: green; border-radius: 50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M2 21h19v-2H2v2zm18-5V3h-2v13h2zm-4 0V3h-2v13h2zm-4 0V3h-2v13h2zm-4 0V3H6v13h2z"/>
                    </svg>
                </div>`,
        className: "custom-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });

    return (
        <MapContainer center={[55.751244, 37.618423]} zoom={10} className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MarkerClusterGroup>
                {data.map((item, index) => (
                    <Marker key={index} position={[item.Cells.geoData.coordinates[1], item.Cells.geoData.coordinates[0]]} icon={icon}>
                        <Popup>
                            <h3 className="text-lg font-bold text-green-700">{item.Cells.Name}</h3>
                            <p className="text-sm text-gray-600">{item.Cells.OperatingCompany}</p>
                            <p className="mt-2 text-gray-800"><strong>Тип:</strong> {item.Cells.TypeObject}</p>
                            <p className="text-gray-800"><strong>Адрес:</strong> {item.Cells.Address}</p>
                            <p className="text-gray-800"><strong>Посадочных мест:</strong> {item.Cells.SeatsCount}</p>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
