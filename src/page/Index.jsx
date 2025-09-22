import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import LayoutPages from "../layout/LayoutPages";
import GenerateLayers from "../fitur/GanerateLayers";
import GenerateScoreLayer from "../fitur/GenerateScoreLayer";

export default function Index({ basemapUrl, setBasemapUrl }){
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    const [toggles, setToggles] = useState([
        { id: 1, name: "Adminstrasi Kabupaten", isOn: false, url: "/json/ADM_KAB.geojson", type: "normal" },
        { id: 2, name: "Administrasi Kota", isOn: false, url: "/json/ADM_KOTA.geojson", type: "normal" },
        { id: 3, name: "Sekor Kabupaten", isOn: false, url: "/json/ADM_KAB.geojson", type: "score" },
        { id: 4, name: "Sekor Kota", isOn: false, url: "/json/ADM_KOTA.geojson", type: "score" },
        { id: 5, name: "Kantor Damkar", isOn: false, url: "", type: "normal" },
        { id: 6, name: "Rumah Sakit", isOn: false, url: "", type: "normal" },
        { id: 7, name: "Puskesmas", isOn: false, url: "", type: "normal" },
    ]);

    useEffect(() => {
        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: basemapUrl ? new XYZ({ url: basemapUrl }) : new OSM(),
                }),
            ],
            view: new View({
                projection: "EPSG:3857",
                center: fromLonLat([106.71667, -6.58333]),
                zoom: 10.5,
            }),
        });

        setMap(initialMap);
        return () => initialMap.setTarget(null);
    }, []);

    useEffect(() => {
        if (!map) return;
        map.getLayers().setAt(
            0,
            new TileLayer({
                source: basemapUrl ? new XYZ({ url: basemapUrl }) : new OSM(),
            })
        );
    }, [basemapUrl, map]);
    return(
        <LayoutPages 
            basemapUrl={basemapUrl}
            setBasemapUrl={setBasemapUrl}
            toggles={toggles}
            setToggles={setToggles}>
            <div
                ref={mapRef}
                className="w-full h-[85vh]"
            />
            
            {toggles.map((t) => {
                if (!t.isOn || !t.url) return null;

                if (t.type === "score") {
                    return <GenerateScoreLayer key={t.id} map={map} url={t.url} toggle={t.isOn} />;
                }

                return <GenerateLayers key={t.id} map={map} url={t.url} toggle={t.isOn} />;
            })}

        </LayoutPages>
    );
}