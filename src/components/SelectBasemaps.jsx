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
            url: "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=ruaIHZFS89lH0NlSL7QW",
        },
        {
            name: "MT-Satellite",
            title: "MTSatellite",
            url: "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=ruaIHZFS89lH0NlSL7QW",
        },
        {
            name: "OpenTopoMap",
            title: "OpenTopoMap",
            url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
        },
        {
            name: "Humantarian",
            title: "OSMHumantarian",
            url: "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        },
        {
            name: "Stamen",
            title: "StamenTerrain",
            url: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
        },
        {
            name: "Toner",
            title: "MTToner",
            url: "https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ruaIHZFS89lH0NlSL7QW",
        },
        {
            name: "ESRI-Standard",
            title: "ESRIStandard",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        },
        {
            name: "ESRI-Topo",
            title: "ESRITopo",
            url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        },
        {
            name: "ESRI-Satellite",
            title: "ESRISatellite",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        },
        {
            name: "Waze",
            title: "Waze",
            url: "https://worldtiles3.waze.com/tiles/{z}/{x}/{y}.png",
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
