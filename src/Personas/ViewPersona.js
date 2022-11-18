import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import format from "date-fns/format";
export default function ViewPersona() {
  const [persona, setPersona] = useState({
    nombre: "",
    direccion: "",
    nacimiento: format(new Date(), "yyyy-MM-dd"),
    edad: 0,
    categoria: "",
  });
  const { id } = useParams();

  useEffect(() => {
    loadPersona();
  }, []);

  const loadPersona = async () => {
    const result = await axios.get(`http://localhost:8080/persona/${id}`);
    setPersona(result.data);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalles de Usuario</h2>
          <div className="card">
            <div className="card-header">
              Detalles del usuario ID:
              {persona.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nombre:</b>
                  {persona.nombre}
                </li>
                <li className="list-group-item">
                  <b>Dirección:</b>
                  {persona.direccion}
                </li>
                <li className="list-group-item">
                  <b>Fecha de Nacimiento:</b>
                  {persona.nacimiento}
                </li>
                <li className="list-group-item">
                  <b>Categoria:</b>
                  {persona.categoria}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}
