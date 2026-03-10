import Boton from '../ui/Boton';
import './TarjetaProducto.css';

const ImagenProducto = ({ imagen, nombre }) => {
  const esEmoji = imagen && !imagen.startsWith('http') && !imagen.startsWith('data:');

  if (esEmoji || !imagen) {
    return (
      <div className="tarjeta__emoji" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {imagen || '🎵'}
      </div>
    );
  }

  return (
    <img
      src={imagen}
      alt={nombre}
      className="tarjeta__imagen"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
      style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
    />
  );
};

const TarjetaProducto = ({ producto, onEditar, onEliminar }) => {
  const agotado = Number(producto.stock) === 0;
  const esEmoji = producto.imagen && !producto.imagen.startsWith('http') && !producto.imagen.startsWith('data:');

  return (
    <div className="tarjeta" style={agotado ? { borderLeft: '4px solid var(--color-error)' } : {}}>
      {esEmoji || !producto.imagen ? (
        <div className="tarjeta__emoji">{producto.imagen || '🎵'}</div>
      ) : (
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: '100%', height: 140, objectFit: 'cover',
              borderRadius: 8, display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.querySelector('.tarjeta__fallback').style.display = 'flex';
            }}
          />
          <div
            className="tarjeta__fallback"
            style={{
              display: 'none', width: '100%', height: 140,
              alignItems: 'center', justifyContent: 'center',
              background: 'var(--color-bg)', borderRadius: 8,
              fontSize: '3rem'
            }}
          >🎵</div>
        </div>
      )}
      <div className="tarjeta__nombre">{producto.nombre}</div>
      <div className="tarjeta__precio">${Number(producto.precio).toFixed(2)}</div>
      <span className="tarjeta__categoria">{producto.categoria}</span>
      <div className="tarjeta__stock" style={{ color: agotado ? 'var(--color-error)' : 'var(--color-success)', fontWeight: agotado ? 700 : 400 }}>
        {agotado ? '❌ Agotado' : `✅ Stock: ${producto.stock} uds.`}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{producto.descripcion}</p>
      <div className="tarjeta__acciones">
        <Boton variante="secundario" onClick={() => onEditar(producto)}>Editar</Boton>
        <Boton variante="peligro" onClick={() => onEliminar(producto.id)}>Eliminar</Boton>
      </div>
    </div>
  );
};

export default TarjetaProducto;
