import { Select } from "flowbite-react";

export default function SelectBaseMaps({ value, onChange }) {
    const basemaps = [
        {
            name: "GoogleStreet",
            title: "Google Street",
            url: "https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        },
        {
            name: "GoogleSatellite",
            title: "Google Satellite",
            url: "https://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        },
        {
            name: "OSMStandard",
            title: "OSM Standard",
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        },
        {
            name: "MTStreet",
            title: "MapTiler Street",
            url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=xxx",
        },
    ];

    return (
        <Select
            id="basemap-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
        >
            {basemaps.map((bm) => (
                <option key={bm.name} value={bm.url}>
                    {bm.title}
                </option>
            ))}
        </Select>
    );
}
