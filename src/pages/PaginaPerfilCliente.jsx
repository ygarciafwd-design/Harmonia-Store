import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProductos } from '../hooks/useProductos';
import { useCarrito } from '../hooks/useCarrito';
import Navbar from '../components/layout/Navbar';
import './PaginaPerfilCliente.css';

const PaginaPerfilCliente = () => {
  const { usuario } = useAuth();
  const { productos } = useProductos();
  const { totalItems, totalPrecio } = useCarrito(usuario?.id);
  const navigate = useNavigate();

  return (
    <div className="perfil">
      <Navbar />
      <div className="perfil__contenido">
        <div className="perfil__card">
          <div className="perfil__avatar">🎵</div>
          <h1 className="perfil__nombre">{usuario?.nombre}</h1>
          <p className="perfil__email">{usuario?.email}</p>
          <span className="perfil__badge">Cliente</span>
          <div className="perfil__info">
            <div className="perfil__info-item">
              <strong>{productos.length}</strong>
              <span>Productos disponibles</span>
            </div>
            <div className="perfil__info-item">
              <strong>{new Set(productos.map(p => p.categoria)).size}</strong>
              <span>Categorías</span>
            </div>
            <div className="perfil__info-item">
              <strong>{totalItems}</strong>
              <span>En mi carrito</span>
            </div>
            {totalItems > 0 && (
              <div className="perfil__info-item" style={{ borderLeft: '3px solid var(--color-primary)' }}>
                <strong>${totalPrecio.toFixed(2)}</strong>
                <span>Total carrito</span>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/cliente/catalogo')}
            style={{
              marginTop: 24, padding: '12px 28px',
              background: 'var(--color-primary)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius)',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer'
            }}
          >
            🛒 Ir al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaPerfilCliente;
