import React from "react";
import { Sidebar, Button } from "flowbite-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar({ isOpen, setIsOpen }){
    return(
        <div className="w-full bg-gray-50 dark:bg-gray-800 flex p-4 justify-between">
            <button data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="w-6 h-6" />
            </button>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 sm:hidden"
                />
            )}
        </div>
    );
}