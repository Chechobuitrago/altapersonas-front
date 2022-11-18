import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const limit = 3;
  const [lenPersonas, setLenPersonas] = useState(0);
  const [personas, setPersonas] = useState([]);
  const [offset, setoffset] = useState(0);
  const [nombreQ, setnombreQ] = useState("");
  const [direccionQ, setdireccionQ] = useState("");

  useEffect(() => {
    countPersonas();
  }, []);

  useEffect(() => {
    loadPersonas();
  }, [direccionQ, nombreQ, limit, offset]);

  const loadPersonas = async () => {
    const result = await axios.get(
      `http://localhost:8080/personas?limit=${limit}&offset=${
        offset * limit
      }&nombre=${nombreQ}&direccion=${direccionQ}`
    );
    setPersonas(result.data);
  };

  const countPersonas = async () => {
    const result = await axios.get("http://localhost:8080/persona/count");
    setLenPersonas(result.data);
  };

  const nextPage = async () => {
    if (offset + 1 < lenPersonas / limit) {
      setoffset(offset + 1);
    }
  };
  const beforePage = async () => {
    if (offset > 0) {
      setoffset(offset - 1);
    }
  };
  const filterByName = async (e) => {
    console.log(e.target.value);
    setnombreQ(e.target.value);
  };
  const filterByDireccion = async (e) => {
    console.log(e.target.value);
    setdireccionQ(e.target.value);
  };
  const deletePersona = async (id) => {
    await axios.delete(`http://localhost:8080/persona/${id}`);
    loadPersonas();
  };
  return (
    <div className="container">
      <div className="py-4">
        <label>Nombre</label>
        <input type="text" onChange={filterByName}></input>
        <label>Direccion</label>
        <input type="text" onChange={filterByDireccion}></input>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Direccion</th>
              <th scope="col">Fecha Nacimiento</th>
              <th scope="col">Categoria</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{persona.nombre}</td>
                <td>{persona.direccion}</td>
                <td>{persona.nacimiento}</td>
                <td>{persona.categoria}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewpersona/${persona.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editpersona/${persona.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deletePersona(persona.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <button className="btn btn-outline-primary mx-2" onClick={beforePage}>
            Anterior
          </button>
          <button className="btn btn-outline-primary mx-2" onClick={nextPage}>
            Siguiente
          </button>
        </table>
      </div>
    </div>
  );
}
