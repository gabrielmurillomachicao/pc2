import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import ItemCard from "../components/ItemCard";
import { list } from "../api/resource";
import type { Item } from "../api/resource";
import type { Page } from "../types";

export default function ListPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Page<Item> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Se ejecuta al entrar y cada vez que cambia "page"
  useEffect(() => {
    setLoading(true);
    setError("");
    list(page)
      .then(setData)
      .catch(() => setError("No se pudo cargar el listado"))
      .finally(() => setLoading(false));
  }, [page]);

  const items = data?.items ?? [];
  const isEmpty = items.length === 0;

  return (
    <div>
      <Navbar title="Espacios de estudio" />

      {loading && <p>Cargando...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && isEmpty && <p>No hay registros para mostrar.</p>}

      {!loading && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        isEmpty={isEmpty}
        disabled={loading}
        onChange={setPage}
      />
    </div>
  );
}