import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPersona from "./Personas/AddPersona";
import Persona from "./Personas/Persona";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addPersona" element={<AddPersona />} />
          <Route exact path="/editPersona/:id" element={<Persona/>} />
          <Route exact path="/viewPersona/:id" element={<Persona/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
