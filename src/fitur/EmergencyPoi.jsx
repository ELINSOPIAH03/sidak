import { useEffect } from "react";
import { Draw, Modify } from "ol/interaction";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";

// Haversine distance
function haversineDistance(coord1, coord2) {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371e3; // meter
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function findNearest(currentCoord, places) {
    let nearest = null;
    let minDistance = Infinity;

    places.forEach((p) => {
        const distance = haversineDistance(currentCoord, p.coord);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { ...p, distance };
        }
    });

    return nearest;
}

export default function EmergencyPoi({ 
    map, 
    active, 
    rsList, 
    damkarList,
    onFeatureClick,
    }) {

    useEffect(() => {
        if (!map || !active) return;

        const poiSource = new VectorSource();
        const poiLayer = new VectorLayer({
            source: poiSource,
            style: new Style({
                image: new Icon({
                    src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scale: 1.2,
                }),
            }),
            zIndex: 10,
        });

        const nearestRsSource = new VectorSource();
        const nearestDamkarSource = new VectorSource();

        const nearestRsLayer = new VectorLayer({
            source: nearestRsSource,
            style: new Style({
                image: new Icon({
                    src: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scale: 1.2,
                }),
            }),
            zIndex: 10,
        });

        const nearestDamkarLayer = new VectorLayer({
            source: nearestDamkarSource,
            style: new Style({
                image: new Icon({
                    src: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
                    scale: 1.2,
                }),
            }),
            zIndex: 10,
        });

        map.addLayer(poiLayer);
        map.addLayer(nearestRsLayer);
        map.addLayer(nearestDamkarLayer);

        const draw = new Draw({
            source: poiSource,
            type: "Point",
        });
        const modify = new Modify({ source: poiSource });

        map.addInteraction(draw);
        map.addInteraction(modify);

        /* const handleMapClick = (evt) => {
            map.forEachFeatureAtPixel(evt.pixel, (feature) => {
                const info = feature.get("info"); 
                const fType = feature.get("type"); 
                if (info) {
                    const coord3857 = feature.getGeometry().getCoordinates(); 
                    if (onFeatureClick) {
                        onFeatureClick({ [fType]: info }, coord3857);
                    }
                }
            });
        };
        map.on("singleclick", handleMapClick); */

        draw.on("drawstart", () => {
            poiSource.clear();
            nearestRsSource.clear();
            nearestDamkarSource.clear();
        });

        draw.on("drawend", (evt) => {
            const lonLat = evt.feature
                .getGeometry()
                .clone()
                .transform("EPSG:3857", "EPSG:4326")
                .getCoordinates();

            let nearestRS = null;
            let nearestDamkar = null;
            let rsFeature = null;
            let damkarFeature = null;

            // RS terdekat
            if (Array.isArray(rsList) && rsList.length > 0) {
                nearestRS = findNearest(lonLat, rsList);
                if (nearestRS) {
                    rsFeature = new Feature({
                        geometry: new Point(fromLonLat(nearestRS.coord)), 
                    });
                    rsFeature.set("type", "rs");
                    rsFeature.set("info", nearestRS);
                    nearestRsSource.addFeature(rsFeature);
                    // console.log("RS terdekat:", nearestRS);
                }
            }

            // Damkar terdekat
            if (Array.isArray(damkarList) && damkarList.length > 0) {
                nearestDamkar = findNearest(lonLat, damkarList);
                if (nearestDamkar) {
                    damkarFeature = new Feature({
                        geometry: new Point(fromLonLat(nearestDamkar.coord)),
                    });
                    damkarFeature.set("type", "damkar");
                    damkarFeature.set("info", nearestDamkar);
                    nearestDamkarSource.addFeature(damkarFeature);
                    // console.log("Damkar terdekat:", nearestDamkar);
                }
            }

            const both = [];
            if (nearestRS) both.push({ type: "rs", data: nearestRS, feature: rsFeature });
            if (nearestDamkar) both.push({ type: "damkar", data: nearestDamkar, feature: damkarFeature });

            if (both.length > 0) {
                let anchor = both[0];
                if (both.length === 2 && both[1].data.distance < both[0].data.distance) {
                    anchor = both[1];
                }
                const dataForPopup = { rs: nearestRS || null, damkar: nearestDamkar || null };
                if (onFeatureClick && anchor.feature) {
                    onFeatureClick(dataForPopup, anchor.feature.getGeometry().getCoordinates()); 
                }
            }
        });

        return () => {
            map.removeLayer(poiLayer);
            map.removeLayer(nearestRsLayer);
            map.removeLayer(nearestDamkarLayer);
            map.removeInteraction(draw);
            map.removeInteraction(modify);
        };
    }, [map, active, rsList, damkarList]);

    return null;
}