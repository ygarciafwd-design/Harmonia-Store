import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await api.get('/productos');
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarProducto = async (producto) => {
    const guardado = await api.post('/productos', producto);
    setProductos(prev => [...prev, guardado]);
    return guardado;
  };

  const editarProducto = async (id, datos) => {
    const editado = await api.put(`/productos/${id}`, datos);
    setProductos(prev => prev.map(p => p.id === id ? editado : p));
    return editado;
  };

  const eliminarProducto = async (id) => {
    await api.delete(`/productos/${id}`);
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return { productos, cargando, agregarProducto, editarProducto, eliminarProducto, cargarProductos };
};
