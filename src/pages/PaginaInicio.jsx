import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import './PaginaInicio.css';

const categorias = [
  { emoji: '🎸', nombre: 'Cuerdas' },
  { emoji: '🎹', nombre: 'Teclados' },
  { emoji: '🥁', nombre: 'Percusión' },
  { emoji: '🎺', nombre: 'Vientos' },
  { emoji: '🎻', nombre: 'Clásicos' },
  { emoji: '🎷', nombre: 'Saxofón' },
];

const PaginaInicio = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  return (
    <div className="inicio">
      <Navbar />
      <div className="inicio__hero">
        <h1>🎸 Harmonia Store</h1>
        <p>Tu tienda de instrumentos musicales de confianza</p>
        <div className="inicio__hero-btns">
          {!usuario ? (
            <>
              <button className="inicio__hero-btn inicio__hero-btn--primario" onClick={() => navigate('/login')}>Iniciar Sesión</button>
              <button className="inicio__hero-btn inicio__hero-btn--secundario" onClick={() => navigate('/registro')}>Crear Cuenta</button>
            </>
          ) : (
            <button className="inicio__hero-btn inicio__hero-btn--primario" onClick={() => navigate(usuario.rol === 'admin' ? '/admin/dashboard' : '/cliente/perfil')}>
              Ir a mi panel
            </button>
          )}
        </div>
      </div>
      <div className="inicio__categorias">
        <h2>Nuestras Categorías</h2>
        <div className="inicio__grid">
          {categorias.map(c => (
            <div key={c.nombre} className="inicio__cat-card">
              {c.emoji}
              <p>{c.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginaInicio;
