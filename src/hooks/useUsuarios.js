import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/usuarios')
      .then(data => {
        setUsuarios(data.map(({ password, ...u }) => u));
      })
      .catch(err => console.error('Error al cargar usuarios:', err))
      .finally(() => setCargando(false));
  }, []);

  return { usuarios, cargando };
};
