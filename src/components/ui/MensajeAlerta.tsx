import './MensajeAlerta.css';

interface MensajeAlertaProps {
  tipo?: 'error' | 'exito' | 'info' | 'alerta';
  mensaje?: string;
}

const MensajeAlerta = ({ tipo = 'error', mensaje }: MensajeAlertaProps) => {
  if (!mensaje) return null;
  return <div className={`alerta alerta--${tipo}`}>{mensaje}</div>;
};

export default MensajeAlerta;
