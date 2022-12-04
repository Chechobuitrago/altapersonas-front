import React, { useEffect, useState } from "react";
import axios from "axios";
import { format,intervalToDuration, parseISO } from 'date-fns';
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import API_URI_LOCAL from "../constants/ApiConstants";

export default function Persona() {

  let navigate =useNavigate();
  const {id}=useParams()
  const {pathname} = useLocation();
  console.log(pathname.split("/")[1] );
  const isViewMode = pathname.split("/")[1] === 'viewpersona';

  const [persona, setPersona] = useState({
    nombre: "",
    direccion: "",
    nacimiento:format(new Date(),'yyyy-MM-dd'),
    edad:0
  });
  let { nombre, direccion,nacimiento,edad } = persona;

  const onInputChange=(e)=>{

    if(e.target.name==='nacimiento'){
            edad = intervalToDuration({
            start: new Date(parseISO(e.target.value)),
            end: new Date()
        }).years
        
        console.log(edad);
    }
    setPersona({...persona,[e.target.name]:e.target.value,edad})
  }
  useEffect(()=>{
    loadPersona()
  },[]);
  const onSubmit=async(e)=>{
    e.preventDefault()
    await axios.put(`${API_URI_LOCAL}/persona/${id}`,persona)
    navigate("/")
  };

  const loadPersona = async ()=>{
    const result=await axios.get(`${API_URI_LOCAL}/persona/${id}`)
    setPersona(result.data)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">{isViewMode ? 'Ver persona' : 'Editar persona' }</h2>
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
              disabled={isViewMode}
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
              disabled={isViewMode}
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
              disabled={isViewMode}
            ></input>
          </div>
          {!isViewMode && (

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          )}
          <Link className="btn btn-outline-danger mx-2" to="/">
            { isViewMode ? 'Volver' : 'Cancelar' }
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

