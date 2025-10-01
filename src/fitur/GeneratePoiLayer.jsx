import React, { useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Icon } from "ol/style";

// import markerIcon from "../assets/icons/marker.svg";

export default function GeneratePoiLayer({ map, url, iconUrl, toggle, onFeatureClick, poiLayers }) {
    useEffect(() => {
        if (!map) return;

        const layer = new VectorLayer({
            source: new VectorSource({
                url,
                format: new GeoJSON(),
            }),
            style: new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: iconUrl || "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    // src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scale: 1, // bisa dikecilin/besarin
                }),
            }),
            zIndex: 10,
            visible: toggle || false,
        });

        poiLayers.current.push(layer);

        map.addLayer(layer);

        const handleClick = (evt) => {
            let found = false;
            poiLayers.current.forEach((l) => {
                map.forEachFeatureAtPixel(
                    evt.pixel,
                    (feature, layerFound) => {
                        if (feature && layerFound === l) {
                            const props = { ...feature.getProperties() };
                            delete props.geometry;

                            let filteredProps = {};

                            if (l.getSource().getUrl().includes("POI_RS")) {
                                filteredProps = {
                                    Nama: props.Nama || "-",
                                    Alamat: props.Alamat || "-",
                                    Tipe: props.Tipe || "-",
                                    Kepemilikan: props.Kepemilikan || "-",
                                };
                            } else if (l.getSource().getUrl().includes("POI_DAMKAR")) {
                                filteredProps = {
                                    Nama: props.name || "-",
                                    Alamat: props.alamat || "-",
                                };
                            }

                            onFeatureClick && onFeatureClick(filteredProps, evt.pixel);
                            found = true;
                        }
                    },
                    { hitTolerance: 15 }
                );
            });

            if (!found) onFeatureClick && onFeatureClick(null, null);
        };

        map.on("singleclick", handleClick);

        return () => {
            map.removeLayer(layer);
            poiLayers.current = poiLayers.current.filter(l => l !== layer);
            map.un("singleclick", handleClick);
        };
    }, [map, url, toggle]);

    useEffect(() => {
        if (!map) return;
        const layers = map.getLayers().getArray();
        const thisLayer = layers.find((l) => l.getSource()?.getUrl?.() === url);
        if (thisLayer) thisLayer.setVisible(toggle);
    }, [toggle, map, url]);

    return null;
}
