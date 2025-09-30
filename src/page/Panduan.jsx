import React from 'react';
import LayoutPages from "../layout/LayoutPages";
export default function Panduan() {
    return (
        <LayoutPages>
            <div className="w-full bg-gray-50 text-gray-900 p-10">
                <h6 className='text-[20px] md:text-[24px] font-semibold'>Panduan Penggunaan Aplikasi</h6>
                <h3 className='text-[18px] md:text-[20px] font-semibold mt-3'>Tentang Aplikasi</h3>
                <p>
                    Aplikasi ini digunakan untuk mengetahui tingkat kejadian kebakaran di Kabupaten dan Kota Bogor, serta melihat apakah infrastruktur pendukungnya sudah merata.
                    Data yang digunakan merupakan data periode 2019–2024 (5 tahun terakhir).
                </p>
                <h3 className='text-[18px] md:text-[20px] font-semibold mt-3'>Fitur Aplikasi</h3>
                <ol className='list-decimal ps-5 font-semibold'>
                    <li>Base Maps</li>
                    <p className='font-normal mb-2'>
                        Fitur ini digunakan untuk mengganti latar peta dengan berbagai tema, mulai dari Google Street hingga Wize, sesuai kebutuhan dan selera.
                    </p>
                    <li>Layers</li>
                    <p className='font-normal mb-2'>
                        Aplikasi menyediakan beberapa layer, yaitu:
                        <ul className='list-disc ps-5'>
                            <li>Batas Administrasi Kabupaten dan Kota Bogor</li>
                            <li>Skor Kejadian Kebakaran</li>
                            <li>Kantor Pemadam Kebakaran (Damkar)</li>
                            <li>Rumah Sakit</li>
                        </ul>
                    </p>
                    <li>Tools</li>
                    <p className='font-normal mb-2'>
                        Terdapat beberapa alat bantu (tools), antara lain:
                        <ul className='list-disc ps-5'>
                            <li>Kejadian</li>
                            <p className="">Fitur ini membantu mencari rumah sakit dan kantor damkar terdekat berdasarkan titik kejadian yang ditentukan.</p>
                            <li>Pusatkan</li>
                            <p className=''>Fitur ini mengembalikan tampilan peta ke posisi awal.</p>
                        </ul>
                    </p>
                    <li>3D Maps</li>
                    <p className="font-normal mb-2">
                        Fitur ini menampilkan peta dalam mode 3D. Jika tidak berfungsi, kemungkinan API belum diperbarui karena keterbatasan penggunaan API gratis
                    </p>
                </ol>
                <h3 className='text-[18px] md:text-[20px] font-semibold mt-3'>Kontak</h3>
                <p className="font-normal">
                    Jika ada kritik saran bisa menghubungi:
                    <ul className='list-disc ps-5'>
                        <li>Email: <a href="mailto:elinsopiah526@gmail.com" className='text-blue-600'>elinsopiah526@gmail.com</a></li>
                        <li>Instagram: <a href="https://www.instagram.com/@_.arifaah" target="_blank" rel="noopener noreferrer" className='text-blue-600'>@_.arifaah</a></li>
                        <li>GitHub: <a href="https://github.com/elinsopiah03" className='text-blue-600'>ELINSOPIAH03</a></li>
                        <li>LinkedIn: <a href="https://www.linkedin.com/in/elin-sopiah/" target="_blank" rel="noopener noreferrer" className='text-blue-600'>Elin Sopiah</a></li>
                    </ul>
                </p>
            </div>
        </LayoutPages>
    );
}