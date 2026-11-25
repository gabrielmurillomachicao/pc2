type Props = {
  page: number;
  totalPages: number;
  isEmpty: boolean;
  disabled?: boolean;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, isEmpty, disabled = false, onChange }: Props) {
  const sinAnterior = disabled || isEmpty || page <= 1;
  const sinSiguiente = disabled || isEmpty || page >= totalPages;

  return (
    <nav aria-label="Paginación">
      <button type="button" disabled={sinAnterior} onClick={() => onChange(page - 1)}>
        Anterior
      </button>
      <span>
        Página {isEmpty ? 0 : page} de {totalPages}
      </span>
      <button type="button" disabled={sinSiguiente} onClick={() => onChange(page + 1)}>
        Siguiente
      </button>
    </nav>
  );
}