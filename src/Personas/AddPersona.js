import React, { useState } from "react";
import axios from "axios";
import { format, intervalToDuration, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { API_URI_LOCAL } from "../constants/ApiConstants";

export default function AddPersona() {
  let navigate = useNavigate();

  const [errors, setErros] = useState({});
  const [persona, setPersona] = useState({
    nombre: "",
    direccion: "",
    nacimiento: format(new Date(), "yyyy-MM-dd"),
    edad: 0,
  });
  let { nombre, direccion, nacimiento, edad } = persona;

  const onInputChange = (e) => {
    if (e.target.name === "nacimiento") {
      edad = intervalToDuration({
        start: new Date(parseISO(e.target.value)),
        end: new Date(),
      }).years;

      console.log(edad);
    }

    setPersona({ ...persona, [e.target.name]: e.target.value, edad });
  };

  const onValidate = (personaP) => {
    let isError = false;
    let errors = {};
    let regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!personaP.nombre.trim()) {
      errors.nombre = 'El campo "Nombre" no debe ser vacio.';
      isError = true;
    } else if (!regexText.test(nombre)) {
      errors.nombre = 'El campo "Nombre" solo acepta letras y espacios.';
      isError = true;
    }

    if (!personaP.direccion.trim()) {
      errors.direccion = 'El campo "Direccion" no debe ser vacio.';
      isError = true;
    } else if (!regexText.test(direccion)) {
      errors.direccion = 'El campo "Direccion" contiene un formato no valido.';
      isError = true;
    }
    return isError ? errors : null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //Validaciones
    const err = onValidate(persona);
    if (err === null) {
      console.log("Enviando Form");
      await axios.post(`${API_URI_LOCAL}/persona`, persona);
      navigate("/");
    } else {
      setErros(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registrar Usuario</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresa tu nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
              ></input>
              {errors.nombre && (
                <div className="alert alert-danger p-1">{errors.nombre}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Direccion" className="form-label">
                Dirección
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresa tu direccion"
                name="direccion"
                value={direccion}
                onChange={(e) => onInputChange(e)}
              ></input>
              {errors.direccion && (
                <div className="alert alert-danger p-1">{errors.direccion}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Nacimiento" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type={"date"}
                className="form-control"
                name="nacimiento"
                value={nacimiento}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
