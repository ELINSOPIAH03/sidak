import React from "react";

export default function ToggleListItem({ id, label, icon, toggles, setToggles }) {
    const handleToggle = () => {
        setToggles((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div className="flex items-center">
                {icon && (
                    <span className="size-6 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        {icon}
                    </span>
                )}
                <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
            </div>

            <button
                onClick={handleToggle}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${toggles[id] ? "bg-blue-500" : "bg-gray-300"
                    }`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${toggles[id] ? "translate-x-6" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}
