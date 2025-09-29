import React from "react";

const EmergencyPopup = ({ content, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div
            className="z-50 absolute bottom-4 right-4 shadow-lg rounded-lg p-4 border border-gray-300 w-80 text-sm text-gray-500 transition-opacity duration-300 bg-white  opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">Tangkap Darurat</h4>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>
            </div>
            {content}
        </div>
    );
};

export default EmergencyPopup;
