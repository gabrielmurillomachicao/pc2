import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import { RESOURCE } from "./api/resource";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas: solo con token */}
      <Route element={<ProtectedRoute />}>
        <Route path={`/${RESOURCE}`} element={<ListPage />} />
        <Route path={`/${RESOURCE}/:id`} element={<DetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}