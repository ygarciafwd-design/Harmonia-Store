import { alertaConfirmar, alertaCompraExito, alertaToast } from '../../utils/alertas';
import './Carrito.css';

const Carrito = ({ carrito, onActualizar, onEliminar, onVaciar, onComprar, onCerrar, totalItems, totalPrecio }) => {
  const handleEliminar = async (item) => {
    const res = await alertaConfirmar('¿Eliminar producto?', `¿Quitar "${item.nombre}" del carrito?`, 'Sí, eliminar');
    if (res.isConfirmed) {
      onEliminar(item.id);
      alertaToast('Producto eliminado del carrito', 'info');
    }
  };

  const handleVaciar = async () => {
    const res = await alertaConfirmar('¿Vaciar carrito?', 'Se eliminarán todos los productos del carrito.', 'Sí, vaciar');
    if (res.isConfirmed) {
      onVaciar();
      alertaToast('Carrito vaciado', 'info');
    }
  };

  const handleComprar = async () => {
    const res = await alertaConfirmar(
      '¿Confirmar compra?',
      `Total: $${totalPrecio.toFixed(2)} — ${totalItems} producto(s)`,
      '¡Comprar ahora!'
    );
    if (res.isConfirmed) {
      onComprar();
      await alertaCompraExito(totalPrecio);
    }
  };

  const handleCantidad = (item, delta) => {
    const nueva = item.cantidad + delta;
    if (nueva < 1) return;
    if (nueva > item.stock) {
      alertaToast(`Solo hay ${item.stock} unidades disponibles`, 'warning');
      return;
    }
    onActualizar(item.id, nueva, item.stock);
  };

  return (
    <div className="carrito-overlay" onClick={onCerrar}>
      <div className="carrito-panel" onClick={e => e.stopPropagation()}>
        <div className="carrito-panel__header">
          <span className="carrito-panel__titulo">🛒 Mi Carrito {totalItems > 0 && `(${totalItems})`}</span>
          <button className="carrito-panel__cerrar" onClick={onCerrar}>✕</button>
        </div>

        <div className="carrito-panel__body">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <span className="carrito-vacio__emoji">🎵</span>
              <p className="carrito-vacio__texto">Tu carrito está vacío</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Agrega instrumentos para comenzar</p>
            </div>
          ) : (
            carrito.map(item => (
              <div key={item.id} className="carrito-item">
                <span className="carrito-item__emoji">{item.imagen}</span>
                <div className="carrito-item__info">
                  <div className="carrito-item__nombre">{item.nombre}</div>
                  <div className="carrito-item__precio-unit">${Number(item.precio).toFixed(2)} c/u</div>
                  <div className="carrito-item__controles">
                    <button className="carrito-item__btn-cantidad" onClick={() => handleCantidad(item, -1)}>−</button>
                    <span className="carrito-item__cantidad">{item.cantidad}</span>
                    <button className="carrito-item__btn-cantidad" onClick={() => handleCantidad(item, 1)}>+</button>
                    <span className="carrito-item__subtotal">${(item.cantidad * Number(item.precio)).toFixed(2)}</span>
                  </div>
                </div>
                <button className="carrito-item__eliminar" onClick={() => handleEliminar(item)} title="Eliminar">🗑️</button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="carrito-panel__footer">
            <div className="carrito-panel__resumen">
              <div className="carrito-panel__fila"><span>Productos</span><span>{totalItems}</span></div>
              <div className="carrito-panel__fila carrito-panel__total"><span>Total</span><span>${totalPrecio.toFixed(2)}</span></div>
            </div>
            <button className="carrito-panel__btn-comprar" onClick={handleComprar}>💳 Comprar ahora</button>
            <button className="carrito-panel__btn-vaciar" onClick={handleVaciar}>🗑️ Vaciar carrito</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
