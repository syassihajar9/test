import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Recommandations from "./pages/Recommandations";
import Carte from "./pages/Carte";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar /> {/* Elle est toujours affichée ici */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/recommandations" element={<Recommandations />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
