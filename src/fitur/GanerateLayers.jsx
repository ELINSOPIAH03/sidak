import React, { useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Fill } from "ol/style";
export default function GenerateLayers({ map, url, toggle, style, onFeatureClick }) {
    useEffect(() => {
        if (!map) return;

        const layer = new VectorLayer({
            source: new VectorSource({
                url,
                format: new GeoJSON(),
            }),
            style: style || new Style({
                stroke: new Stroke({ color: "#3399FF", width: 1.5 }),
                fill: new Fill({ color: "rgba(51,153,255,0.3)" }),
            }),
            visible: toggle || false,
        });

        map.addLayer(layer);

        const handleClick = (evt) => {
            let found = false;
            map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
                if (feature && layer === layer) {
                    const props = { ...feature.getProperties() };
                    delete props.geometry;
                    delete props.LCODE;
                    delete props.SHAPE_Leng;
                    delete props.SHAPE_Area;

                    onFeatureClick && onFeatureClick(props, evt.pixel);
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
        const thisLayer = layers.find(l => l.getSource()?.getUrl?.() === url);
        if (thisLayer) thisLayer.setVisible(toggle);
    }, [toggle, map, url]);

    return null;
}