export default function Perfil() {
  const usuario = {
    nombre: "Juan Pérez",
    correo: "juan.perez@agromatik.com",
    telefono: "341 123 4567",
    puesto: "Técnico agrícola",
    area: "Rancho Sur",
    tipoUsuario: "SUPERVISOR",
    roles: [
      "Riego y nutrición",
      "Sanidad vegetal"
    ],
    estado: "Activo",
    ultimoAcceso: "07/09/2026 12:30 PM",
  };

  return (
    <div className="p-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Perfil
        </h1>

        <p className="mt-2 text-[var(--agromatik-text-secondary)]">
          Información y configuración del usuario.
        </p>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Información personal */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Información personal
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
              JP
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {usuario.nombre}
              </h3>

              <p className="text-gray-500">
                {usuario.puesto}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Correo
              </p>
              <p className="font-medium">
                {usuario.correo}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Teléfono
              </p>
              <p className="font-medium">
                {usuario.telefono}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Puesto
              </p>
              <p className="font-medium">
                {usuario.puesto}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Área asignada
              </p>
              <p className="font-medium">
                {usuario.area}
              </p>
            </div>
          </div>

          <button className="mt-6 rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800">
            Editar perfil
          </button>
        </div>

        {/* Acceso y roles */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Acceso y roles
          </h2>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Tipo de usuario
            </p>

            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {usuario.tipoUsuario}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Roles especializados
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {usuario.roles.map((rol) => (
                <span
                  key={rol}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {rol}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Estado de la cuenta
            </p>

            <p className="mt-1 font-semibold text-green-700">
              {usuario.estado}
            </p>
          </div>
        </div>

        {/* Seguridad */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Seguridad
          </h2>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Último acceso
            </p>

            <p className="font-medium">
              {usuario.ultimoAcceso}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Contraseña
            </p>

            <p className="font-medium">
              ••••••••••••
            </p>
          </div>

          <button className="mt-6 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
            Cambiar contraseña
          </button>
        </div>

        {/* Preferencias */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Preferencias
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-gray-500">
                Idioma
              </p>
              <p className="font-medium">
                Español
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Tema
              </p>
              <p className="font-medium">
                Claro
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Notificaciones
              </p>
              <p className="font-medium">
                Activadas
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}