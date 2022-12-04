import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URI_LOCAL from "../constants/ApiConstants";

export default function Home() {
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [lenPersonas, setLenPersonas] = useState(0);
  const [personas, setPersonas] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [filterByDireccion, setfilterByDireccion] = useState("");


  useEffect(() => {
    countPersonas();
  }, []);

  useEffect(() => {
    loadPersonas();
  }, [limit, offset, filterByName, filterByDireccion]);

  const loadPersonas = async () => {
    const result = await axios.get(
      `${API_URI_LOCAL}/persona?nombre=${filterByName}&direccion=${filterByDireccion}&limit=${limit}&offset=${offset}`
    );
    setPersonas(result.data);
  };

  const countPersonas = async () => {
    const result = await axios.get(`${API_URI_LOCAL}/persona/count`);
    setLenPersonas(result.data);
  };

  const nextPage =  () => {
    if (offset * limit < lenPersonas - limit ) {
      setOffset(offset + 1);
    }
  };
  const beforePage =  () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const deletePersona = async (id) => {
    await axios.delete(`${API_URI_LOCAL}/persona/${id}`);
    loadPersonas();
  };

  const filterByNameChange = (e) => {
    setFilterByName(e.target.value);
  }

  const filterByDireccionChange = (e) => {
    setfilterByDireccion(e.target.value);
  }

  return (
    <div className="container">
      <div className="py-4">
        <label>Nombre</label>
        <input type="text" onChange={filterByNameChange}></input>
        <label>Direccion</label>
        <input type="text" onChange={filterByDireccionChange}></input>
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
                <th scope="row">{persona.id}</th>
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
          <tfoot>
            <tr>
              <td>
                <button className="btn btn-outline-primary mx-2" onClick={beforePage}>
                  Anterior
                </button>
              </td>
              <td>
                <button className="btn btn-outline-primary mx-2" onClick={nextPage}>
                  Siguiente
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
