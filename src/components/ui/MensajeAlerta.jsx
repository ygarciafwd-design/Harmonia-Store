import './MensajeAlerta.css';

const MensajeAlerta = ({ tipo = 'error', mensaje }) => {
  if (!mensaje) return null;
  return <div className={`alerta alerta--${tipo}`}>{mensaje}</div>;
};

export default MensajeAlerta;
