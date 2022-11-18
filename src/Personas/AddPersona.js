import React, { useState } from "react";
import axios from "axios";
import { format,intervalToDuration, parseISO } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
export default function AddPersona() {

    let navigate =useNavigate()
  const [persona, setPersona] = useState({
    nombre: "",
    direccion: "",
    nacimiento:format(new Date(),'yyyy-MM-dd'),
    edad:0
  });
  let { nombre, direccion,nacimiento,edad } = persona;

  const onInputChange=(e)=>{

    if(e.target.name==='nacimiento'){
        console.log(e.target.value);
            edad = intervalToDuration({
            start: new Date(parseISO(e.target.value)),
            end: new Date()
        }).years
        
        console.log(edad);
    }
    setPersona({...persona,[e.target.name]:e.target.value,edad})
  }

  const onSubmit=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:8080/persona",persona)
    navigate("/")
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registrar Usuario</h2>
          <form onSubmit={(e)=>onSubmit(e)}>
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
              onChange={(e) => onInputChange(e)}
            ></input>
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
