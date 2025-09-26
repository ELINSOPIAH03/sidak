import React, { useState } from "react";
import { Sidebar, Button } from "flowbite-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Navbar from "../components/Navbar";
import SidebarPage from "../components/Sidebar";
import Footer from "../components/Footer";

export default function LayoutPages({ children, basemapUrl, setBasemapUrl, toggles, setToggles, is3D, setIs3D }) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <div className="w-full">
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

                <SidebarPage
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    basemapUrl={basemapUrl}
                    setBasemapUrl={setBasemapUrl}
                    toggles={toggles} 
                    setToggles={setToggles}
                    is3D={is3D}
                    setIs3D={setIs3D}
                />

                <div className={`transition-all duration-300 ${isOpen ? "sm:ml-64" : "ml-0"}`}>
                    <div className="">
                        {children}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}