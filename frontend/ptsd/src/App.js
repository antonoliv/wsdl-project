import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './Homepage';
import Map from './Map';

import logo from './logo.svg';
import './App.css';
import TouristicPlace from "./TouristicPlace";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/touristic_place/:id" element={<TouristicPlace />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
