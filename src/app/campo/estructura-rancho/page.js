import RanchoMap from "@/components/map/RanchoMap";
import RanchoStructureTree from "@/components/structure/RanchoStructureTree";

export default function EstructuraRancho() {
  return (
    <div className="p-8">
      {/* ENCABEZADO */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Estructura del rancho
        </h1>

        <p className="mt-2 text-muted">
          Organización territorial, hidráulica y productiva del rancho.
        </p>
      </div>

      {/* CONTENIDO */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* ÁRBOL DE ESTRUCTURA */}
        <RanchoStructureTree />

        {/* MAPA */}
        <div className="min-w-0 rounded-2xl border border-border bg-surface p-5">
          <RanchoMap />
        </div>
      </div>
    </div>
  );
}