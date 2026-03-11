export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarPassword = (password: string): string | null => {
  if (!password || password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  return null;
};

export const validarNombre = (nombre: string): string | null => {
  if (!nombre || nombre.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  return null;
};

/** Campos del formulario de inicio de sesión. */
export type LoginCampos = {
  email: string;
  password: string;
};

/** Campos del formulario de registro de usuario. */
export type RegistroCampos = {
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
};

/** Campos del formulario de producto (alta/edición). precio y stock aceptan string (input) o number. */
export type ProductoCampos = {
  nombre: string;
  precio: string | number;
  categoria: string;
  stock: string | number;
  descripcion: string;
};

/** Errores de validación del login: cada clave opcional con mensaje en string. */
export type ErroresLogin = Partial<Record<keyof LoginCampos, string>>;
/** Errores de validación del registro: cada clave opcional con mensaje en string. */
export type ErroresRegistro = Partial<Record<keyof RegistroCampos, string>>;
/** Errores de validación del producto: cada clave opcional con mensaje en string. */
export type ErroresProducto = Partial<Record<keyof ProductoCampos, string>>;

export const validarFormularioLogin = ({ email, password }: LoginCampos): ErroresLogin => {
  const errores: ErroresLogin = {};

  if (!email) {
    errores.email = 'El email es requerido';
  } else if (!validarEmail(email)) {
    errores.email = 'Email inválido';
  }

  const errPass = validarPassword(password);
  if (errPass) {
    errores.password = errPass;
  }

  return errores;
};

export const validarFormularioRegistro = ({
  nombre,
  email,
  password,
  confirmarPassword,
}: RegistroCampos): ErroresRegistro => {
  const errores: ErroresRegistro = {};

  const errNombre = validarNombre(nombre);
  if (errNombre) {
    errores.nombre = errNombre;
  }

  if (!email) {
    errores.email = 'El email es requerido';
  } else if (!validarEmail(email)) {
    errores.email = 'Email inválido';
  }

  const errPass = validarPassword(password);
  if (errPass) {
    errores.password = errPass;
  }

  if (password !== confirmarPassword) {
    errores.confirmarPassword = 'Las contraseñas no coinciden';
  }

  return errores;
};

export const validarProducto = ({
  nombre,
  precio,
  categoria,
  stock,
  descripcion,
}: ProductoCampos): ErroresProducto => {
  const errores: ErroresProducto = {};

  if (!nombre || nombre.trim().length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  }
  if (nombre && nombre.trim().length > 100) {
    errores.nombre = 'El nombre no puede superar 100 caracteres';
  }

  const precioNum = Number(precio);
  if (precio === '' || precio === null || precio === undefined) {
    errores.precio = 'El precio es requerido';
  } else if (Number.isNaN(precioNum)) {
    errores.precio = 'El precio debe ser un número';
  } else if (precioNum <= 0) {
    errores.precio = 'El precio debe ser mayor a $0';
  } else if (precioNum > 99999) {
    errores.precio = 'El precio no puede superar $99,999';
  }

  if (!categoria || categoria.trim().length < 2) {
    errores.categoria = 'La categoría es requerida';
  }

  const stockNum = Number(stock);
  if (stock === '' || stock === null || stock === undefined) {
    errores.stock = 'El stock es requerido';
  } else if (Number.isNaN(stockNum) || !Number.isInteger(stockNum)) {
    errores.stock = 'El stock debe ser un número entero';
  } else if (stockNum < 0) {
    errores.stock = 'El stock no puede ser negativo';
  } else if (stockNum > 9999) {
    errores.stock = 'El stock no puede superar 9,999 unidades';
  }

  if (!descripcion || descripcion.trim().length < 5) {
    errores.descripcion = 'La descripción debe tener al menos 5 caracteres';
  }

  return errores;
};

