import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validarFormularioLogin } from '../../utils/validaciones';
import { alertaError } from '../../utils/alertas';
import CampoFormulario from '../ui/CampoFormulario';
import Boton from '../ui/Boton';
import './FormularioAuth.css';

type LoginCampos = {
  email: string;
  password: string;
};
const FormularioLogin = () => {
  const [campos, setCampos] = useState<LoginCampos>({ email: '', password: '' });
  const [errores, setErrores] = useState<Partial<LoginCampos>>({});
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampos(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validarFormularioLogin(campos);
    if (Object.keys(err).length) {
      setErrores(err);
      return;
    }
    setCargando(true);
    try {
      const user = await login(campos.email, campos.password);
      navigate(user.rol === 'admin' ? '/admin/dashboard' : '/cliente/catalogo');
    } catch (e) {
      alertaError('Credenciales incorrectas', 'El email o la contraseña no son válidos. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-card__logo">🎸</div>
        <h1 className="auth-card__titulo">Harmonia Store</h1>
        <p className="auth-card__subtitulo">Inicia sesión en tu cuenta</p>
        <form onSubmit={handleSubmit}>
          <CampoFormulario label="Email" tipo="email" nombre="email" valor={campos.email} onChange={handleChange} error={errores.email} placeholder="tu@email.com" />
          <CampoFormulario label="Contraseña" tipo="password" nombre="password" valor={campos.password} onChange={handleChange} error={errores.password} placeholder="••••••••" />
          <Boton tipo="submit" variante="primario" cargando={cargando}>Iniciar Sesión</Boton>
        </form>
        <p className="auth-card__footer">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </div>
    </div>
  );
};

export default FormularioLogin;
