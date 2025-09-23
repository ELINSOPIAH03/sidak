import React from "react";

export default function Popup({ content, position, visible }) {
    if (!visible) return null;

    const style = {
        left: `${position[0]}px`,
        top: `${position[1]}px`,
        transform: "translate(-50%, -100%)",
        position: "absolute",
    };

    return (
        <div
            className="z-10 inline-block relative w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
            style={style}
        >
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Info Bidang
                </h3>
            </div>
            <div className="px-3 py-2">{content}</div>
            <div data-popper-arrow className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full mb-[4px]"></div>
        </div>
    );
}
