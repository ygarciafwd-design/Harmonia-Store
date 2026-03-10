import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validarFormularioRegistro } from '../../utils/validaciones';
import { alertaError, alertaExito } from '../../utils/alertas';
import CampoFormulario from '../ui/CampoFormulario';
import Boton from '../ui/Boton';
import './FormularioAuth.css';

const FormularioRegistro = () => {
  const [campos, setCampos] = useState({ nombre: '', email: '', password: '', confirmarPassword: '' });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const { registro } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCampos(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrores(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validarFormularioRegistro(campos);
    if (Object.keys(err).length) { setErrores(err); return; }
    setCargando(true);
    try {
      await registro(campos);
      await alertaExito('¡Cuenta creada!', `Bienvenido/a a Harmonia Store, ${campos.nombre}!`);
      navigate('/cliente/catalogo');
    } catch (e) {
      alertaError('Error al registrarse', e.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-card__logo">🎵</div>
        <h1 className="auth-card__titulo">Crear Cuenta</h1>
        <p className="auth-card__subtitulo">Únete a Harmonia Store</p>
        <form onSubmit={handleSubmit}>
          <CampoFormulario label="Nombre completo" nombre="nombre" valor={campos.nombre} onChange={handleChange} error={errores.nombre} placeholder="Tu nombre" />
          <CampoFormulario label="Email" tipo="email" nombre="email" valor={campos.email} onChange={handleChange} error={errores.email} placeholder="tu@email.com" />
          <CampoFormulario label="Contraseña" tipo="password" nombre="password" valor={campos.password} onChange={handleChange} error={errores.password} placeholder="Mínimo 6 caracteres" />
          <CampoFormulario label="Confirmar contraseña" tipo="password" nombre="confirmarPassword" valor={campos.confirmarPassword} onChange={handleChange} error={errores.confirmarPassword} placeholder="Repite tu contraseña" />
          <Boton tipo="submit" variante="primario" cargando={cargando}>Crear Cuenta</Boton>
        </form>
        <p className="auth-card__footer">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default FormularioRegistro;
