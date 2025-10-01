import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke } from "ol/style";
import { useEffect } from "react";

export default function GenerateLayers({ map, url, toggle, style, onFeatureClick, poiLayers }) {
    useEffect(() => {
        if (!map || !toggle) return;

        const vectorSource = new VectorSource({
            url,
            format: new GeoJSON(),
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: style || new Style({
                stroke: new Stroke({ color: "#3399FF", width: 1.5 }),
                fill: new Fill({ color: "rgba(51,153,255,0.3)" }),
            }),
            zIndex: 1,
        });

        map.addLayer(vectorLayer);

        const handleClick = (evt) => {
            let poiClicked = false;

            poiLayers?.current.forEach((poiLayer) => {
                if (!poiLayer.getVisible()) return;

                map.forEachFeatureAtPixel(evt.pixel, (feature, layerFound) => {
                    if (feature && layerFound === poiLayer) {
                        poiClicked = true;
                    }
                }, { hitTolerance: 10 });
            });

            if (poiClicked) return;

            map.forEachFeatureAtPixel(evt.pixel, (feature, layerFound) => {
                if (feature && layerFound === vectorLayer) {
                    const props = { ...feature.getProperties() };
                    delete props.geometry;
                    delete props.LCODE;
                    delete props.SHAPE_Leng;
                    delete props.SHAPE_Area;

                    onFeatureClick && onFeatureClick(props, evt.pixel);
                }
            }, { hitTolerance: 5 });
        };

        map.on("singleclick", handleClick);

        const onZoom = () => vectorLayer.setStyle(vectorLayer.getStyle());
        map.getView().on("change:resolution", onZoom);

        return () => {
            map.getView().un("change:resolution", onZoom);
            map.un("singleclick", handleClick);
            map.removeLayer(vectorLayer);
        };
    }, [map, toggle, url, style, onFeatureClick, poiLayers]);

    return null;
}
