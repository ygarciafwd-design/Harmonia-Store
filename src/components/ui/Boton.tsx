import './Boton.css';

interface BotonProps {
  children: React.ReactNode;
  variante?: string;
  tipo?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deshabilitado?: boolean;
  cargando?: boolean;
}

const Boton = ({ 
  children, 
  variante = 'primario', 
  tipo = 'button', 
  onClick, 
  deshabilitado = false, 
  cargando = false 
}: BotonProps) => (
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
