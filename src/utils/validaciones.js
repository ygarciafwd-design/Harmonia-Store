export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarPassword = (password) => {
  if (!password || password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return null;
};

export const validarNombre = (nombre) => {
  if (!nombre || nombre.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
  return null;
};

export const validarFormularioLogin = ({ email, password }) => {
  const errores = {};
  if (!email) errores.email = 'El email es requerido';
  else if (!validarEmail(email)) errores.email = 'Email inválido';
  const errPass = validarPassword(password);
  if (errPass) errores.password = errPass;
  return errores;
};

export const validarFormularioRegistro = ({ nombre, email, password, confirmarPassword }) => {
  const errores = {};
  const errNombre = validarNombre(nombre);
  if (errNombre) errores.nombre = errNombre;
  if (!email) errores.email = 'El email es requerido';
  else if (!validarEmail(email)) errores.email = 'Email inválido';
  const errPass = validarPassword(password);
  if (errPass) errores.password = errPass;
  if (password !== confirmarPassword) errores.confirmarPassword = 'Las contraseñas no coinciden';
  return errores;
};

export const validarProducto = ({ nombre, precio, categoria, stock, descripcion }) => {
  const errores = {};
  if (!nombre || nombre.trim().length < 2) errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  if (nombre && nombre.trim().length > 100) errores.nombre = 'El nombre no puede superar 100 caracteres';
  
  const precioNum = Number(precio);
  if (precio === '' || precio === null || precio === undefined) errores.precio = 'El precio es requerido';
  else if (isNaN(precioNum)) errores.precio = 'El precio debe ser un número';
  else if (precioNum <= 0) errores.precio = 'El precio debe ser mayor a $0';
  else if (precioNum > 99999) errores.precio = 'El precio no puede superar $99,999';

  if (!categoria || categoria.trim().length < 2) errores.categoria = 'La categoría es requerida';

  const stockNum = Number(stock);
  if (stock === '' || stock === null || stock === undefined) errores.stock = 'El stock es requerido';
  else if (isNaN(stockNum) || !Number.isInteger(stockNum)) errores.stock = 'El stock debe ser un número entero';
  else if (stockNum < 0) errores.stock = 'El stock no puede ser negativo';
  else if (stockNum > 9999) errores.stock = 'El stock no puede superar 9,999 unidades';

  if (!descripcion || descripcion.trim().length < 5) errores.descripcion = 'La descripción debe tener al menos 5 caracteres';

  return errores;
};
