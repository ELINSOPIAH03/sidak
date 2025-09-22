import React, { useState } from "react";

export default function SelectLayers({ toggles, setToggles }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (id) => {
        const newToggles = toggles.map((t) =>
            t.id === id ? { ...t, isOn: !t.isOn } : t
        );
        setToggles(newToggles);
    };

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                    <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                    <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                    <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Layer
                </span>
                <svg
                    className={`w-3 h-3 transform transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {/* Toggle Area */}
            {isOpen && (
                <ul className="pl-8 py-1 space-y-3">
                    {toggles.map((t) => (
                        <li key={t.id}>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleToggle(t.id)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${t.isOn ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${t.isOn ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                                <span className="text-sm text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {t.name}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
