import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const { pathname } = useLocation();
  const link = (to) => `navbar__link ${pathname === to || pathname.startsWith(to) ? 'navbar__link--activo' : ''}`;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">🎸 Harmonia Store</Link>
      <div className="navbar__nav">
        {!usuario && (
          <>
            <Link to="/login" className={link('/login')}>Iniciar Sesión</Link>
            <Link to="/registro" className={link('/registro')}>Registrarse</Link>
          </>
        )}
        {usuario?.rol === 'admin' && (
          <Link to="/admin/dashboard" className={link('/admin')}>Dashboard Admin</Link>
        )}
        {usuario?.rol === 'cliente' && (
          <>
            <Link to="/cliente/catalogo" className={link('/cliente/catalogo')}>Catálogo</Link>
            <Link to="/cliente/perfil" className={link('/cliente/perfil')}>Mi Perfil</Link>
          </>
        )}
        {usuario && (
          <>
            <span className="navbar__usuario">Hola, {usuario.nombre}</span>
            <button className="navbar__logout" onClick={logout}>Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
