import React, { useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Icon } from "ol/style";

// import markerIcon from "../assets/icons/marker.svg";

export default function GeneratePoiLayer({ map, url, toggle, onFeatureClick }) {
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
                    src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scale: 1, // bisa dikecilin/besarin
                }),
            }),
            visible: toggle || false,
        });

        map.addLayer(layer);

        const handleClick = (evt) => {
            let found = false;
            map.forEachFeatureAtPixel(evt.pixel, (feature, l) => {
                if (feature && l === layer) {
                    const props = { ...feature.getProperties() };
                    delete props.geometry;

                    const filteredProps = {
                        Nama: props.name,
                        Alamat: props.alamat,
                    };

                    onFeatureClick && onFeatureClick(filteredProps, evt.pixel);
                    found = true;
                }
            });
            if (!found) {
                onFeatureClick && onFeatureClick(null, null);
            }
        };

        map.on("singleclick", handleClick);

        return () => {
            map.removeLayer(layer);
            map.un("singleclick", handleClick);
        };
    }, [map, url]);

    useEffect(() => {
        if (!map) return;
        const layers = map.getLayers().getArray();
        const thisLayer = layers.find((l) => l.getSource()?.getUrl?.() === url);
        if (thisLayer) thisLayer.setVisible(toggle);
    }, [toggle, map, url]);

    return null;
}
