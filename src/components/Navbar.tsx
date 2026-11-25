import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

type Props = { title: string };

export default function Navbar({ title }: Props) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <h1>{title}</h1>
      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}