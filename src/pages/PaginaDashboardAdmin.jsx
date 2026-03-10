import { useState } from 'react';
import { useProductos } from '../hooks/useProductos';
import { useUsuarios } from '../hooks/useUsuarios';
import Navbar from '../components/layout/Navbar';
import TarjetaProducto from '../components/admin/TarjetaProducto';
import ModalEditarProducto from '../components/admin/ModalEditarProducto';
import Boton from '../components/ui/Boton';
import { alertaConfirmar, alertaToast } from '../utils/alertas';
import './PaginaDashboardAdmin.css';

const productoVacio = { nombre: '', precio: '', categoria: '', stock: '', imagen: '🎵', descripcion: '' };

const PaginaDashboardAdmin = () => {
  const { productos, cargando, agregarProducto, editarProducto, eliminarProducto } = useProductos();
  const { usuarios } = useUsuarios();
  const [productoEditar, setProductoEditar] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);

  const handleEliminar = async (id) => {
    const prod = productos.find(p => p.id === id);
    const res = await alertaConfirmar(
      '¿Eliminar producto?',
      `¿Estás seguro de eliminar "${prod?.nombre}"? Esta acción no se puede deshacer.`,
      'Sí, eliminar'
    );
    if (res.isConfirmed) {
      eliminarProducto(id);
      alertaToast('Producto eliminado correctamente', 'success');
    }
  };

  const agotados = productos.filter(p => Number(p.stock) === 0).length;

  if (cargando) return <div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>;

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard__contenido">
        <div className="dashboard__header">
          <h1 className="dashboard__titulo">Dashboard Administrador</h1>
          <Boton variante="primario" onClick={() => setModoAgregar(true)}>+ Agregar Producto</Boton>
        </div>

        <div className="dashboard__stats">
          <div className="stat-card">
            <div className="stat-card__numero">{productos.length}</div>
            <div className="stat-card__label">Productos</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__numero">{usuarios.length}</div>
            <div className="stat-card__label">Usuarios</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__numero">{productos.reduce((a, p) => a + Number(p.stock), 0)}</div>
            <div className="stat-card__label">Unidades en stock</div>
          </div>
          {agotados > 0 && (
            <div className="stat-card" style={{ borderLeft: '4px solid var(--color-error)' }}>
              <div className="stat-card__numero" style={{ color: 'var(--color-error)' }}>{agotados}</div>
              <div className="stat-card__label">Productos agotados</div>
            </div>
          )}
        </div>

        <div className="dashboard__grid">
          {productos.map(p => (
            <TarjetaProducto
              key={p.id}
              producto={p}
              onEditar={setProductoEditar}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      </div>

      {productoEditar && (
        <ModalEditarProducto
          producto={productoEditar}
          esNuevo={false}
          onGuardar={(datos) => { editarProducto(productoEditar.id, datos); setProductoEditar(null); }}
          onCerrar={() => setProductoEditar(null)}
        />
      )}
      {modoAgregar && (
        <ModalEditarProducto
          producto={productoVacio}
          esNuevo={true}
          onGuardar={(datos) => { agregarProducto(datos); setModoAgregar(false); }}
          onCerrar={() => setModoAgregar(false)}
        />
      )}
    </div>
  );
};

export default PaginaDashboardAdmin;
