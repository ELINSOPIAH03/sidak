import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke, Text } from "ol/style";
import { useEffect } from "react";

export default function GenerateScoreLayer({ map, url, toggle, onFeatureClick }) {
    useEffect(() => {
        if (!map || !toggle) return;

        const vectorSource = new VectorSource({
            url,
            format: new GeoJSON(),
        });

        const getColorByScore = (score) => {
            if (score >= 1 && score <= 5) return "#FFC971";
            if (score >= 6 && score <= 20) return "#FFB627";
            if (score > 20 && score <= 50) return "#FF9505";
            if (score > 50 && score <= 100) return "#E2711D";
            if (score > 100) return "#CC5803";
            return "#FFC97105";
        };


        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: (feature) => {
                const score = feature.get("SEKOR") || 0;
                const zoom = map.getView().getZoom();
                return new Style({
                    fill: new Fill({
                        color: getColorByScore(score),
                    }),
                    stroke: new Stroke({
                        color: "#FF6600",
                        width: 2,
                    }),
                    text: zoom >= 10.5 ? new Text({
                        text: score.toString(),
                        font: "100 12px Arial",
                        fill: new Fill({ color: "#000" }),
                    }) : null,
                });
            },
        });

        map.addLayer(vectorLayer);

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

        const onZoom = () => vectorLayer.setStyle(vectorLayer.getStyle());
        map.getView().on("change:resolution", onZoom);

        return () => {
            map.getView().un("change:resolution", onZoom);
            map.un("singleclick", handleClick);
            map.removeLayer(vectorLayer);
        };
    }, [map, toggle, url, onFeatureClick]);

    return null;
}
