import { Link } from "react-router-dom";
import { RESOURCE } from "../api/resource";
import type { Item } from "../api/resource";

type Props = { item: Item };

export default function ItemCard({ item }: Props) {
  return (
    <Link to={`/${RESOURCE}/${item.id}`}>
      <h3>{item.name}</h3>
      <p>Nombre: {item.name}</p>
      <p>Especialidad: {item.speciality}</p>
      <p>Modalidad: {item.modality}</p>
      <p>Turnos disponibles: {item.availableSlots}</p>
      <p>Descripción: {item.description}</p>
    </Link>
  );
}