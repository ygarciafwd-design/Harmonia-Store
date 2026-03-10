import { Link } from 'react-router-dom';
import './PaginaNoEncontrada.css';

const PaginaNoEncontrada = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>Página no encontrada</p>
    <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Volver al inicio</Link>
  </div>
);

export default PaginaNoEncontrada;
