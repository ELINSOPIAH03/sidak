import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import LayoutPages from "../layout/LayoutPages";

export default function Index({ basemapUrl, setBasemapUrl }){
    const mapRef = useRef();
    const [map, setMap] = useState(null);


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
                center: fromLonLat([106.8272, -6.1754]),
                zoom: 10,
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
                source: new XYZ({ url: basemapUrl }),
            })
        );
    }, [basemapUrl, map]);
    return(
        <LayoutPages basemapUrl={basemapUrl} setBasemapUrl={setBasemapUrl}>
            <div
                ref={mapRef}
                className="w-full h-[85vh]"
            />
        </LayoutPages>
    );
}