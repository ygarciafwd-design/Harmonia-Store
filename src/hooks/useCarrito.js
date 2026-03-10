import { useState, useEffect } from 'react';

export const useCarrito = (usuarioId) => {
  const KEY = `harmonia_carrito_${usuarioId}`;
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    if (!usuarioId) return;
    const guardado = localStorage.getItem(KEY);
    if (guardado) setCarrito(JSON.parse(guardado));
  }, [usuarioId]);

  const guardar = (lista) => {
    setCarrito(lista);
    localStorage.setItem(KEY, JSON.stringify(lista));
  };

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const existente = carrito.find(i => i.id === producto.id);
    if (existente) {
      const nuevaCantidad = existente.cantidad + cantidad;
      if (nuevaCantidad > producto.stock) return false; // supera stock
      guardar(carrito.map(i => i.id === producto.id ? { ...i, cantidad: nuevaCantidad } : i));
    } else {
      if (cantidad > producto.stock) return false;
      guardar([...carrito, { ...producto, cantidad }]);
    }
    return true;
  };

  const actualizarCantidad = (id, cantidad, stockMax) => {
    if (cantidad < 1) return false;
    if (cantidad > stockMax) return false;
    guardar(carrito.map(i => i.id === id ? { ...i, cantidad } : i));
    return true;
  };

  const eliminarDelCarrito = (id) => {
    guardar(carrito.filter(i => i.id !== id));
  };

  const vaciarCarrito = () => guardar([]);

  const totalItems = carrito.reduce((a, i) => a + i.cantidad, 0);
  const totalPrecio = carrito.reduce((a, i) => a + i.cantidad * Number(i.precio), 0);

  return { carrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, totalItems, totalPrecio };
};
