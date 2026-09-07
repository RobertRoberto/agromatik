import RanchoMap from "@/components/map/RanchoMap";
import RanchoStructureTree from "@/components/structure/RanchoStructureTree";

export default function EstructuraRancho() {
  return (
    <div className="p-8">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Estructura del rancho
        </h1>

        <p className="mt-2 text-[var(--agromatik-text-secondary)]">
          Organización territorial, hidráulica y productiva del rancho.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">

        {/* Árbol de estructura */}
        <RanchoStructureTree />

        {/* Mapa */}
        <div className="min-w-0 rounded-2xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] p-5">
          <RanchoMap />
        </div>

      </div>

    </div>
  );
}