import Swal from 'sweetalert2';

const base = {
  confirmButtonColor: '#6c3fc5',
  cancelButtonColor: '#e53935',
  customClass: {
    popup: 'harmonia-swal',
  },
};

export const alertaExito = (titulo, texto) =>
  Swal.fire({ ...base, icon: 'success', title: titulo, text: texto, timer: 2000, showConfirmButton: false });

export const alertaError = (titulo, texto) =>
  Swal.fire({ ...base, icon: 'error', title: titulo, text: texto });

export const alertaWarning = (titulo, texto) =>
  Swal.fire({ ...base, icon: 'warning', title: titulo, text: texto });

export const alertaConfirmar = (titulo, texto, textoBoton = 'Sí, confirmar') =>
  Swal.fire({
    ...base,
    icon: 'question',
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: textoBoton,
    cancelButtonText: 'Cancelar',
  });

export const alertaToast = (mensaje, tipo = 'success') =>
  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  }).fire({ icon: tipo, title: mensaje });

export const alertaCompraExito = (total) =>
  Swal.fire({
    ...base,
    icon: 'success',
    title: '¡Compra realizada! 🎸',
    html: `<p>Tu pedido por <strong>$${total.toFixed(2)}</strong> ha sido procesado exitosamente.</p><p style="color:#888;margin-top:8px;font-size:0.9rem">Recibirás una confirmación pronto.</p>`,
    confirmButtonText: '¡Genial!',
  });
