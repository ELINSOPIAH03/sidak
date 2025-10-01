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
import GeneratePoiLayer from "../fitur/GeneratePoiLayer";
import EmergencyPoi from "../fitur/EmergencyPoi";
import EmergencyPopup from "../components/EmergencyPopup";
import Popup from "../components/Popup";
import Search from "../components/Search";

import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumNavigation from "cesium-navigation-es6";
import OLCesium from "ol-cesium";
window.Cesium = Cesium;

export default function Index({ basemapUrl, setBasemapUrl}) {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [is3D, setIs3D] = useState(false);
    const ol3dRef = useRef(null);

    const [drawActive, setDrawActive] = useState(false);
    const [rsList, setRsList] = useState([]);
    const [damkarList, setDamkarList] = useState([]);
    const [isEmergencyOn, setIsEmergencyOn] = useState(false);

    
    const handleEmergency = (state) => {
        setIsEmergencyOn(state);
        setDrawActive(state);
    };

    const [toggles, setToggles] = useState([
        { id: 1, name: "Adminstrasi Kab", isOn: false, url: "/json/ADM_KAB.geojson", type: "normal" },
        { id: 2, name: "Administrasi Kota", isOn: false, url: "/json/ADM_KOTA.geojson", type: "normal" },
        { id: 3, name: "Sekor Kabupaten", isOn: false, url: "/json/ADM_KAB.geojson", type: "score" },
        { id: 4, name: "Sekor Kota", isOn: false, url: "/json/ADM_KOTA.geojson", type: "score" },
        { id: 5, name: "Kantor Damkar", isOn: false, url: "/json/POI_DAMKAR.geojson", type: "poi" },
        { id: 6, name: "Rumah Sakit", isOn: false, url: "/json/POI_RS.geojson", type: "poi" },
        // { id: 7, name: "Puskesmas", isOn: false, url: "", type: "normal" },
    ]);
    
    const [popupData, setPopupData] = useState({
        content: null,
        position: [0, 0],
        visible: false,
    });

    const [emergencyPopup, setEmergencyPopup] = useState({
        content: null,
        visible: false,
    });

    useEffect(() => {
        // fetch RS
        fetch("/json/POI_RS.geojson")
            .then((res) => res.json())
            .then((data) => {
                setRsList(
                    data.features.map((f) => ({
                        name: f.properties.Nama,
                        alamat: f.properties.Alamat,
                        coord: f.geometry.coordinates,
                    }))
                );
            });

        // fetch DAMKAR
        fetch("/json/POI_DAMKAR.geojson")
            .then((res) => res.json())
            .then((data) => {
                setDamkarList(
                    data.features.map((f) => ({
                        name: f.properties.name,
                        alamat: f.properties.alamat,
                        coord: f.geometry.coordinates,
                    }))
                );
            });
    }, []);

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

    useEffect(() => {
        if (!map) return;

        if (!ol3dRef.current) {
            Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMGZhZmE1YS03ZGFiLTQxMTEtYTc5ZC04NWY4ZjA0YmUzNzciLCJpZCI6MzQ0NzExLCJpYXQiOjE3NTg4NTczMDN9.sNGfEVMtPPSk8kEnrjt-cBOmSiRB6F7GISY0qVPxkJg";

            ol3dRef.current = new OLCesium({
                map,
                sceneOptions: { scene3DOnly: true },
            });

            const scene = ol3dRef.current.getCesiumScene();

            (async () => {
                // set terrain
                scene.terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(1);

                // add tileset 3D (contoh: NYC)
                const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
                scene.primitives.add(tileset);

                // zoom ke tileset
                scene.camera.flyToBoundingSphere(tileset.boundingSphere);
            })();

            // enable camera controls
            const controller = scene.screenSpaceCameraController;
            controller.enableZoom = true;
            controller.enableTilt = true;
            controller.enableRotate = true;
            controller.enableLook = true;
            controller.enableCollisionDetection = false;

            scene.globe.depthTestAgainstTerrain = true;
        }

        ol3dRef.current.setEnabled(is3D);

        if (is3D) {
            map.getInteractions().forEach(i => i.setActive(false));
        } else {
            map.getInteractions().forEach(i => i.setActive(true));
        }
    }, [map, is3D]);

    const handleSearch = (location) => {
        if (!map) return;
        const { lat, lng } = location;

        map.getView().animate({
            center: fromLonLat([lng, lat]),
            zoom: 14,
            duration: 2000,
        });
    };

    const initialCenter = fromLonLat([106.71667, -6.58333]);
    const initialZoom = 10.5;

    const handleReset = () => {
        if (!map) return;        
        map.getView().animate({
            center: initialCenter,
            zoom: initialZoom,
            rotation: 0,
            duration: 1000, 
        });
    };

    const handleEmergencyClick = (data) => {
        if (!data) {
            setEmergencyPopup({ content: null, visible: false });
            return;
        }

        const { rs, damkar } = data;

        const content = (
            <div>
                <h4 className="font-bold mb-2">Lokasi Terdekat</h4>
                {rs && (
                    <div className="mb-2">
                        <p><strong>Rumah Sakit:</strong> {rs.name}</p>
                        <p>{rs.alamat}</p>
                        <p>Jarak: {(rs.distance / 1000).toFixed(2)} km</p>
                    </div>
                )}
                {damkar && (
                    <div>
                        <p><strong>Damkar:</strong> {damkar.name}</p>
                        <p>{damkar.alamat}</p>
                        <p>Jarak: {(damkar.distance / 1000).toFixed(2)} km</p>
                    </div>
                )}
            </div>
        );

        setEmergencyPopup({
            content,
            visible: true,
        });
    };


    return (
        <LayoutPages
            basemapUrl={basemapUrl}
            setBasemapUrl={setBasemapUrl}
            toggles={toggles}
            setToggles={setToggles}
            is3D={is3D}
            setIs3D={setIs3D}
            onReset={handleReset}
            onEmergency={handleEmergency}
            isEmergencyOn={isEmergencyOn}>
            <div
                ref={mapRef}
                className="w-full h-[85vh] relative"
            >
            
            <Search map={map} onSearch={handleSearch} />
            
            <EmergencyPoi
                map={map}
                active={drawActive}
                rsList={rsList}
                damkarList={damkarList}
                onFeatureClick={handleEmergencyClick}
            />
            
            <Popup
                content={popupData.content}
                position={popupData.position}
                visible={popupData.visible}
            />

            <EmergencyPopup
                content={emergencyPopup.content}
                visible={emergencyPopup.visible}
                onClose={() => setEmergencyPopup({ content: null, visible: false })}
            />

            </div>

            {toggles.map((t) => {
                if (!t.isOn || !t.url) return null;

                if (t.type === "score") {
                    return <GenerateScoreLayer
                            key={t.id}
                            map={map}
                            url={t.url}
                            toggle={t.isOn}
                            onFeatureClick={(props, coord) => {
                                if (props) {
                                    const content = Object.entries(props)
                                        .map(([key, value]) => (
                                            <p key={key}>
                                                <strong>{key}:</strong> {value.toString()}
                                            </p>
                                        ));

                                    setPopupData({
                                        content,
                                        position: coord,
                                        visible: true,
                                    });
                                } else {
                                    setPopupData({
                                        content: null,
                                        position: [0, 0],
                                        visible: false,
                                    });
                                }
                            }}
                        />;
                }

                if (t.type === "poi") {
                    let iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";

                    if (t.name === "Kantor Damkar") {
                        iconUrl = "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
                    } else if (t.name === "Rumah Sakit") {
                        iconUrl = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
                    }

                    return (
                        <GeneratePoiLayer
                            key={t.id}
                            map={map}
                            url={t.url}
                            toggle={t.isOn}
                            iconUrl={iconUrl}
                            onFeatureClick={(props, coord) => {
                                if (props) {
                                    const content = Object.entries(props).map(([key, value]) => (
                                        <p key={key}>
                                            <strong>{key}:</strong> {value.toString()}
                                        </p>
                                    ));
                                    setPopupData({ content, position: coord, visible: true });
                                } else {
                                    setPopupData({ content: null, position: [0, 0], visible: false });
                                }
                            }}
                        />
                    );
                }

                return <GenerateLayers 
                        key={t.id} 
                        map={map} 
                        url={t.url} 
                        toggle={t.isOn} 
                        onFeatureClick={(props, coord) => {
                            if (props) {
                                const content = Object.entries(props)
                                    .map(([key, value]) => (
                                        <p key={key}>
                                            <strong>{key}:</strong> {value.toString()}
                                        </p>
                                    ));

                                setPopupData({
                                    content,
                                    position: coord,
                                    visible: true,
                                });
                            } else {
                                // klik di luar shape
                                setPopupData({
                                    content: null,
                                    position: [0, 0],
                                    visible: false,
                                });
                            }
                        }}
                    />;
            })}

        </LayoutPages>
    );
}