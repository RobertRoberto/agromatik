import { PERMISOS_POR_TIPO_USUARIO } from "./permisosPorTipoUsuario";
import { PERMISOS_POR_ROL } from "./permisosPorRol";

export function obtenerPermisosUsuario(usuario) {
  const permisos = new Set();

  // Agregar permisos de su tipo principal
  const permisosTipo =
    PERMISOS_POR_TIPO_USUARIO[usuario.tipoUsuario] || [];

  permisosTipo.forEach((permiso) => {
    permisos.add(permiso);
  });

  // Agregar permisos de sus roles especializados
  usuario.roles?.forEach((rol) => {
    const permisosRol = PERMISOS_POR_ROL[rol] || [];

    permisosRol.forEach((permiso) => {
      permisos.add(permiso);
    });
  });

  return [...permisos];
}

export function tienePermiso(usuario, permiso) {
  const permisos = obtenerPermisosUsuario(usuario);

  return permisos.includes(permiso);
}