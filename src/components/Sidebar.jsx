import React from "react";
import { Sidebar, Button } from "flowbite-react";
import { Label, Select } from "flowbite-react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import SelectBaseMaps from "./SelectBasemaps";
import SelectLayers from "./SelectLayers";
import SelectTools from "./SelectTools";
import ToggleListItem from "./ToggleListItem";

import SidebarImg from "../assets/images/sidebar.png"

export default function SidebarPage({ isOpen, setIsOpen, basemapUrl, setBasemapUrl, setToggles, toggles, is3D, setIs3D }) {
    return(
        <aside id="default-sidebar" className={`fixed top-0 left-0 h-screen w-64 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
            } `} aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-5 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <ul className="space-y-2 font-medium">
                    <li className="p-0 flex justify-start bg-white">
                        <img src={SidebarImg}
                            alt="sidenar"
                            className="w-full object-contain h-15" />
                    </li>
                    <li className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                            className="size-6 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                            <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z" clipRule="evenodd" />
                        </svg>
                        <span className="ms-3">BaseMaps</span>
                    </li>
                    <li className="flex items-center ml-10 text-gray-900 rounded-lg dark:text-white">
                        <SelectBaseMaps value={basemapUrl} onChange={setBasemapUrl} />
                    </li>
                    <li>
                        <SelectLayers toggles={toggles} setToggles={setToggles} />
                    </li>
                    <li>
                        <SelectTools/>
                    </li>
                    <li>
                        <ToggleListItem
                            id="3d-maps"
                            label="3D Maps"
                            toggles={{ "3d-maps": is3D }}
                            setToggles={() => setIs3D((prev) => !prev)}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 
                                            9.75 9.75-4.365 9.75-9.75 
                                            9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 
                                            1.313-1.312h4.874c.725 0 1.313.588 
                                            1.313 1.313v4.874c0 .725-.588 1.313-1.313 
                                            1.313H9.564a1.312 1.312 0 0 
                                            1-1.313-1.313V 9.564Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                        />
                    </li>
                    <li className="">
                        <button disabled className=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white  group">
                            <span className="flex-1 whitespace-nowrap">Legend</span>
                        </button>
                    </li>
                    <div className="dark:bg-white bg-gray-900 p-3 rounded-sm">
                        <ul className="text-sm font-medium ">
                            <li className="mb-1 flex items-center">   
                                <span className="inline-block w-10 h-1 bg-[#3399FF] me-2"></span> Batas Kecamatan
                            </li>
                            <li className="mb-1 flex items-center">   
                                <span className="inline-block w-10 h-1 bg-[#000000] me-2"></span> Batas Kecamatan
                            </li>
                            <li className="mb-1 flex items-center">
                                <span className="inline-block w-4 h-4 bg-[#FFC971] me-2"></span> Skor 1 - 5    
                            </li>
                            <li className="mb-1 flex items-center">
                                <span className="inline-block w-4 h-4 bg-[#FFB627] me-2"></span> Skor 6 - 20    
                            </li>
                            <li className="mb-1 flex items-center">
                                <span className="inline-block w-4 h-4 bg-[#FF9505] me-2"></span> Skor 21 - 50    
                            </li>
                            <li className="mb-1 flex items-center">
                                <span className="inline-block w-4 h-4 bg-[#E2711D] me-2"></span> Skor 51 - 100    
                            </li>
                            <li className="mb-1 flex items-center">
                                <img src="https://maps.google.com/mapfiles/ms/icons/orange-dot.png" alt=""
                                    className="w-4 h-4 me-2" />
                                Kantor Damkar    
                            </li>
                            <li className="mb-1 flex items-center">
                                <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt=""
                                    className="w-4 h-4 me-2" />
                                Rumah Sakit    
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>
        </aside>
    );
}