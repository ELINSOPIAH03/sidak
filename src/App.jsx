import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from "./page/Index";
function App() {
  const [basemapUrl, setBasemapUrl] = useState("https://tile.openstreetmap.org/{z}/{x}/{y}.png");

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Index basemapUrl={basemapUrl} setBasemapUrl={setBasemapUrl} />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
