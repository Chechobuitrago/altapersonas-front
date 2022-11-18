import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPersona from "./Personas/AddPersona";
import EditPersona from "./Personas/EditPersona";
import ViewPersona from "./Personas/ViewPersona";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addPersona" element={<AddPersona />} />
          <Route exact path="/editPersona/:id" element={<EditPersona />} />
          <Route exact path="/viewPersona/:id" element={<ViewPersona />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
