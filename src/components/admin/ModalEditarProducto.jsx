import { useState, useRef } from 'react';
import CampoFormulario from '../ui/CampoFormulario';
import Boton from '../ui/Boton';
import { validarProducto } from '../../utils/validaciones';
import { alertaExito, alertaError } from '../../utils/alertas';
import './ModalEditarProducto.css';

const ModalEditarProducto = ({ producto, onGuardar, onCerrar, esNuevo = false }) => {
  const [campos, setCampos] = useState({ ...producto });
  const [errores, setErrores] = useState({});
  const [modoImagen, setModoImagen] = useState(
    producto.imagen && producto.imagen.startsWith('http') ? 'url' : 'archivo'
  );
  const [urlInput, setUrlInput] = useState(
    producto.imagen && producto.imagen.startsWith('http') ? producto.imagen : ''
  );
  const [preview, setPreview] = useState(producto.imagen || null);
  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: '' }));
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setPreview(base64);
      setCampos(prev => ({ ...prev, imagen: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrlInput(val);
    setPreview(val);
    setCampos(prev => ({ ...prev, imagen: val }));
  };

  const handleGuardar = async () => {
    const err = validarProducto(campos);
    if (Object.keys(err).length > 0) {
      setErrores(err);
      alertaError('Datos inválidos', 'Por favor corrige los errores antes de guardar.');
      return;
    }
    const productoFinal = {
      ...campos,
      precio: Number(campos.precio),
      stock: Math.floor(Number(campos.stock)),
    };
    onGuardar(productoFinal);
    await alertaExito(
      esNuevo ? '¡Producto agregado!' : '¡Producto actualizado!',
      esNuevo ? 'El producto fue agregado al catálogo.' : 'Los cambios fueron guardados.'
    );
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal__titulo">{esNuevo ? '➕ Agregar Producto' : '✏️ Editar Producto'}</h2>

        {/* Sección imagen */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Imagen del producto
          </label>

          {/* Toggle modo */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button
              type="button"
              onClick={() => setModoImagen('archivo')}
              style={{
                padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem',
                border: modoImagen === 'archivo' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                background: modoImagen === 'archivo' ? 'var(--color-bg)' : 'transparent',
                fontWeight: modoImagen === 'archivo' ? 700 : 400,
                transition: 'var(--transition)'
              }}
            >📁 Subir archivo</button>
            <button
              type="button"
              onClick={() => setModoImagen('url')}
              style={{
                padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem',
                border: modoImagen === 'url' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                background: modoImagen === 'url' ? 'var(--color-bg)' : 'transparent',
                fontWeight: modoImagen === 'url' ? 700 : 400,
                transition: 'var(--transition)'
              }}
            >🔗 URL externa</button>
          </div>

          {/* Preview */}
          {preview && (
            <div style={{ marginBottom: 10, textAlign: 'center' }}>
              <img
                src={preview}
                alt="Vista previa"
                onError={() => setPreview(null)}
                style={{
                  width: 120, height: 120, objectFit: 'cover',
                  borderRadius: 12, border: '2px solid var(--color-border)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          )}

          {/* Input según modo */}
          {modoImagen === 'archivo' ? (
            <div>
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={handleArchivoChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => inputFileRef.current.click()}
                style={{
                  width: '100%', padding: '10px', borderRadius: 8, cursor: 'pointer',
                  border: '2px dashed var(--color-border)', background: 'var(--color-bg)',
                  fontSize: '0.9rem', color: 'var(--color-text-muted)',
                  transition: 'var(--transition)'
                }}
              >
                {preview ? '🔄 Cambiar imagen' : '📷 Seleccionar imagen desde tu dispositivo'}
              </button>
            </div>
          ) : (
            <input
              type="url"
              value={urlInput}
              onChange={handleUrlChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8,
                border: '2px solid var(--color-border)', fontSize: '0.9rem',
                background: 'var(--color-bg)', color: 'var(--color-text)',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          )}
        </div>

        <CampoFormulario label="Nombre del producto *" nombre="nombre" valor={campos.nombre} onChange={handleChange} error={errores.nombre} placeholder="Ej: Guitarra Yamaha F310" />
        <CampoFormulario label="Precio ($) *" tipo="number" nombre="precio" valor={campos.precio} onChange={handleChange} error={errores.precio} placeholder="Ej: 250" />
        <CampoFormulario label="Categoría *" nombre="categoria" valor={campos.categoria} onChange={handleChange} error={errores.categoria} placeholder="Ej: Cuerdas" />
        <CampoFormulario label="Stock (unidades) *" tipo="number" nombre="stock" valor={campos.stock} onChange={handleChange} error={errores.stock} placeholder="Ej: 10" />
        <CampoFormulario label="Descripción *" nombre="descripcion" valor={campos.descripcion} onChange={handleChange} error={errores.descripcion} placeholder="Descripción del instrumento" />

        <div className="modal__acciones">
          <Boton variante="secundario" onClick={onCerrar}>Cancelar</Boton>
          <Boton variante="primario" onClick={handleGuardar}>{esNuevo ? 'Agregar' : 'Guardar cambios'}</Boton>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarProducto;
