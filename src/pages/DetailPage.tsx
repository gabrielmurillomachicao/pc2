import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Field from "../components/Field";
import { getById, sendAction, RESOURCE } from "../api/resource";
import type { Detail } from "../api/resource";
import { getError } from "../api/client";

type Errors = { slotId?: string; attendees?: string; general?: string };

export default function DetailPage() {
  const { id } = useParams(); 
  const [item, setItem] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);


  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [description,setDescription]=useState("");

  async function load() {
    try {
      setItem(await getById(id!));
    } catch (err) {
      if (getError(err).status === 404) setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  function validate(): Errors {
    const e: Errors = {};
    
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccess("");
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSending(true);
    try {
      await sendAction(id!,{description: String(description)});
    } catch (err) {
      const { code, message } = getError(err);
      if (code === "400") setErrors({ general: "El cuerpo no cumple la regla del campo." });
      else if(code =="409") setErrors({general:"El mentor ya no tiene cupos disponibles"});
      else setErrors({ general: message ?? "No se pudo completar la operación" });
    } finally {
      setSending(false);
    }
  }

  if (loading) return <p>Cargando...</p>;
  if (notFound || !item)
    return (
      <p>
        No se encontró el registro. <Link to={`/${RESOURCE}`}>Volver</Link>
      </p>
    );

  return (
    <div>
      <Navbar title={item.name} />
      <Link to={`/${RESOURCE}`}>← Volver al listado</Link>

      {/* ---- información del recurso */}
      <section>
        <p>id: {item.name}</p>
        <p>Nombre: {item.name}</p>
        <p>Especialidad: {item.speciality}</p>
        <p>Modalidad: {item.modality}</p>
        <p>Cupos disponibles: {item.availableSlots}</p>
        <p>Descripción: {item.description}</p>
      </section>

      
      {/* ---- formulario de la operación principal */}
      <form onSubmit={handleSubmit} noValidate>
        

        <Field label="Descripción" htmlFor="descripcion">
                <input id="descripcion" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </Field>
        {errors.general && <p role="alert">{errors.general}</p>}
        {success && <p>{success}</p>}

        <button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Reservar"}
        </button>
      </form>
    </div>
  );
}