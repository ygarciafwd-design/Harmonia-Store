import './Boton.css';

const Boton = ({ children, variante = 'primario', tipo = 'button', onClick, deshabilitado, cargando }) => (
  <button
    type={tipo}
    className={`boton boton--${variante}`}
    onClick={onClick}
    disabled={deshabilitado || cargando}
  >
    {cargando ? 'Cargando...' : children}
  </button>
);

export default Boton;
