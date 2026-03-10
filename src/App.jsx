import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RutaProtegida from './components/layout/RutaProtegida';
import PaginaInicio from './pages/PaginaInicio';
import PaginaLogin from './pages/PaginaLogin';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaDashboardAdmin from './pages/PaginaDashboardAdmin';
import PaginaPerfilCliente from './pages/PaginaPerfilCliente';
import PaginaCatalogo from './pages/PaginaCatalogo';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';
import './styles/global.css';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/admin/dashboard" element={
          <RutaProtegida rol="admin"><PaginaDashboardAdmin /></RutaProtegida>
        } />
        <Route path="/cliente/catalogo" element={
          <RutaProtegida rol="cliente"><PaginaCatalogo /></RutaProtegida>
        } />
        <Route path="/cliente/perfil" element={
          <RutaProtegida rol="cliente"><PaginaPerfilCliente /></RutaProtegida>
        } />
        <Route path="/404" element={<PaginaNoEncontrada />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
