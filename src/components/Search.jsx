import React, {useState} from 'react';
import { fromLonLat } from "ol/proj";

export default function Search({map}) {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query || !map) return;

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    query
                )}&format=json&limit=1&addressdetails=1`
            );
            const data = await res.json();

            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);

                map.getView().animate({
                    center: fromLonLat([lon, lat]),
                    zoom: 14,
                    duration: 1000,
                });
            } else {
                setShowModal(true);
            }
        } catch (err) {
            console.error("Error fetch geocode:", err);
            setShowModal(true);
        }
    };

    return (
        <>
            <div className='absolute top-2 end-4 z-5 w-full max-w-xs'>
                <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input 
                            type="search" 
                            id="default-search" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Cari Lokasi..." 
                            required />
                        <button type="submit" 
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <button type="button" onClick={() => setShowModal(false)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lokasi tidak ditemukan!</h3>
                                <button onClick={() => setShowModal(false)} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );  
}