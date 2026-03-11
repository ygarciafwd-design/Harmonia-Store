import './CampoFormulario.css';

interface CampoFormularioProps {
  label?: string;
  tipo?: string;
  nombre: string;
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const CampoFormulario = ({ 
  label, 
  tipo = 'text', 
  nombre, 
  valor, 
  onChange, 
  error, 
  placeholder 
}: CampoFormularioProps) => (
  <div className="campo">
    {label && <label className="campo__label">{label}</label>}
    <input
      className={`campo__input ${error ? 'campo__input--error' : ''}`}
      type={tipo}
      name={nombre}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <span className="campo__error">{error}</span>}
  </div>
);

export default CampoFormulario;
