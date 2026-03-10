import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardado = localStorage.getItem('harmonia_usuario');
    if (guardado) setUsuario(JSON.parse(guardado));
    setCargando(false);
  }, []);

  const login = async (email, password) => {
    const usuarios = await api.get('/usuarios');
    const encontrado = usuarios.find(u => u.email === email && u.password === password);
    if (!encontrado) throw new Error('Credenciales incorrectas');
    const { password: _, ...usuarioSeguro } = encontrado;
    setUsuario(usuarioSeguro);
    localStorage.setItem('harmonia_usuario', JSON.stringify(usuarioSeguro));
    return usuarioSeguro;
  };

  const registro = async ({ nombre, email, password }) => {
    const usuarios = await api.get('/usuarios');
    const existe = usuarios.find(u => u.email === email);
    if (existe) throw new Error('El email ya está registrado');

    const nuevoUsuario = {
      nombre,
      email,
      password,
      rol: 'cliente'
    };

    const guardado = await api.post('/usuarios', nuevoUsuario);
    const { password: _, ...usuarioSeguro } = guardado;

    setUsuario(usuarioSeguro);
    localStorage.setItem('harmonia_usuario', JSON.stringify(usuarioSeguro));
    return usuarioSeguro;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('harmonia_usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
