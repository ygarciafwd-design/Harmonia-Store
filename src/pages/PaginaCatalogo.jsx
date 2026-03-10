import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProductos } from '../hooks/useProductos';
import { useCarrito } from '../hooks/useCarrito';
import Navbar from '../components/layout/Navbar';
import Carrito from '../components/carrito/Carrito';
import { alertaToast, alertaWarning } from '../utils/alertas';
import { api } from '../utils/api';
import './PaginaCatalogo.css';

const PaginaCatalogo = () => {
  const { usuario } = useAuth();
  const { productos } = useProductos();
  const { carrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, totalItems, totalPrecio } = useCarrito(usuario?.id);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [filtro, setFiltro] = useState('Todos');

  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];
  const productosFiltrados = filtro === 'Todos' ? productos : productos.filter(p => p.categoria === filtro);

  const handleAgregar = (producto) => {
    if (Number(producto.stock) === 0) {
      alertaWarning('Sin stock', `"${producto.nombre}" está agotado actualmente.`);
      return;
    }
    const ok = agregarAlCarrito(producto, 1);
    if (!ok) {
      alertaWarning('Stock insuficiente', `Solo hay ${producto.stock} unidades disponibles de este producto.`);
      return;
    }
    alertaToast(`"${producto.nombre}" agregado al carrito 🎸`, 'success');
  };

  const handleComprar = async () => {
    try {
      // Descontar stock en el backend
      const prometidas = carrito.map(item => {
        const prodOriginal = productos.find(p => p.id === item.id);
        const nuevoStock = Math.max(0, Number(prodOriginal.stock) - item.cantidad);
        return api.put(`/productos/${item.id}`, { ...prodOriginal, stock: nuevoStock });
      });

      await Promise.all(prometidas);
      vaciarCarrito();
      setCarritoAbierto(false);
      alertaToast('¡Gracias por su compra! 🎸', 'success');
    } catch (error) {
      console.error('Error al procesar compra:', error);
      alertaToast('Error al procesar la compra', 'error');
    }
  };

  return (
    <div className="catalogo">
      <Navbar />
      <div className="catalogo__contenido">
        <div className="catalogo__header">
          <h1 className="catalogo__titulo">🎵 Catálogo de Instrumentos</h1>
          <button className="catalogo__btn-carrito" onClick={() => setCarritoAbierto(true)}>
            🛒 Mi Carrito
            {totalItems > 0 && <span className="catalogo__badge">{totalItems}</span>}
          </button>
        </div>

        <div className="catalogo__filtros">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`catalogo__filtro ${filtro === cat ? 'catalogo__filtro--activo' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="catalogo__grid">
          {productosFiltrados.map(producto => {
            const agotado = Number(producto.stock) === 0;
            return (
              <div key={producto.id} className={`producto-card ${agotado ? 'producto-card--agotado' : ''}`}>
                {producto.imagen && !producto.imagen.startsWith('http') && !producto.imagen.startsWith('data:') ? (
                  <div className="producto-card__emoji">{producto.imagen}</div>
                ) : producto.imagen ? (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, display: 'block', marginBottom: 4 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{ display: 'none', width: '100%', height: 160, alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', background: 'var(--color-bg)', borderRadius: 10 }}>🎵</div>
                  </div>
                ) : (
                  <div className="producto-card__emoji">🎵</div>
                )}
                <div className="producto-card__nombre">{producto.nombre}</div>
                <div className="producto-card__descripcion">{producto.descripcion}</div>
                <div className="producto-card__fila">
                  <span className="producto-card__precio">${Number(producto.precio).toFixed(2)}</span>
                  <span className="producto-card__categoria">{producto.categoria}</span>
                </div>
                <div className={`producto-card__stock ${agotado ? 'producto-card__stock--agotado' : 'producto-card__stock--ok'}`}>
                  {agotado ? '❌ Sin stock' : `✅ Stock: ${producto.stock} unidades`}
                </div>
                <button
                  className={`producto-card__btn-agregar ${agotado ? 'producto-card__btn-agregar--agotado' : 'producto-card__btn-agregar--disponible'}`}
                  onClick={() => handleAgregar(producto)}
                  disabled={agotado}
                >
                  {agotado ? 'Agotado' : '🛒 Agregar al carrito'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {carritoAbierto && (
        <Carrito
          carrito={carrito}
          totalItems={totalItems}
          totalPrecio={totalPrecio}
          onActualizar={actualizarCantidad}
          onEliminar={eliminarDelCarrito}
          onVaciar={vaciarCarrito}
          onComprar={handleComprar}
          onCerrar={() => setCarritoAbierto(false)}
        />
      )}
    </div>
  );
};

export default PaginaCatalogo;
