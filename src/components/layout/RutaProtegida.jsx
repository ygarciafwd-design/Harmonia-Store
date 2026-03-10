import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RutaProtegida = ({ children, rol }) => {
  const { usuario, cargando } = useAuth();
  if (cargando) return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  if (!usuario) return <Navigate to="/login" replace />;
  if (rol && usuario.rol !== rol) return <Navigate to="/" replace />;
  return children;
};

export default RutaProtegida;
