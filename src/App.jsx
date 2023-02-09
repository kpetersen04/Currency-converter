import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Currencies from "./pages/Currencies";
import HistoricalDataPage from "./pages/HistoricalDataPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/currencies" element={<Currencies />}></Route>
        <Route
          path="/currencies/historical-data"
          element={<HistoricalDataPage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
