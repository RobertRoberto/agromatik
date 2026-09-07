"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  LandPlot,
  Cpu,
  ClipboardList,
  WalletCards,
  BrainCircuit,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  Users,
  Package,
  Tractor,
  RadioTower,
  Sprout,
  Droplets,
  Bug,
  Flower2,
  Wheat,
  TriangleAlert,
  DollarSign,
  ShoppingCart,
  ChartNoAxesCombined,
  FileChartColumn,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    title: "Inicio",
    icon: Home,
    href: "/inicio",
  },
  {
    title: "Gestión del campo",
    icon: LandPlot,
    children: [
      {
        title: "Estructura del rancho",
        icon: LandPlot,
        href: "/campo/estructura-rancho",
      },
      {
        title: "Recursos humanos",
        icon: Users,
        href: "/campo/recursos-humanos",
      },
      {
        title: "Insumos agrícolas",
        icon: Package,
        href: "/campo/insumos",
      },
      {
        title: "Activos y equipos",
        icon: Tractor,
        href: "/campo/activos",
      },
    ],
  },
  {
    title: "Monitoreo y agronomía",
    icon: Cpu,
    children: [
      {
        title: "Estaciones IoT",
        icon: RadioTower,
        href: "/monitoreo/estaciones-iot",
      },
      {
        title: "Estaciones de suelo y nutrición",
        icon: Sprout,
        href: "/monitoreo/suelo-nutricion",
      },
      {
        title: "Riego y fertirriego",
        icon: Droplets,
        href: "/monitoreo/riego",
      },
      {
        title: "Plagas y enfermedades",
        icon: Bug,
        href: "/monitoreo/plagas",
      },
      {
        title: "Fenología",
        icon: Flower2,
        href: "/monitoreo/fenologia",
      },
    ],
  },
  {
    title: "Operación",
    icon: ClipboardList,
    children: [
      {
        title: "Actividades agrícolas",
        icon: ClipboardList,
        href: "/operacion/actividades",
      },
      {
        title: "Cosecha y calidad",
        icon: Wheat,
        href: "/operacion/cosecha",
      },
      {
        title: "Operación inteligente",
        icon: BrainCircuit,
        href: "/operacion/inteligente",
      },
      {
        title: "Alertas e incidencias",
        icon: TriangleAlert,
        href: "/operacion/alertas",
      },
    ],
  },
  {
    title: "Administración y finanzas",
    icon: WalletCards,
    children: [
      {
        title: "Costos y presupuestos",
        icon: DollarSign,
        href: "/finanzas/costos",
      },
      {
        title: "Compras y proveedores",
        icon: ShoppingCart,
        href: "/finanzas/compras",
      },
    ],
  },
  {
    title: "Inteligencia y análisis",
    icon: BrainCircuit,
    children: [
      {
        title: "Centro inteligente de decisiones",
        icon: ChartNoAxesCombined,
        href: "/inteligencia/decisiones",
      },
      {
        title: "Centro de reportes",
        icon: FileChartColumn,
        href: "/inteligencia/reportes",
      },
    ],
  },
  {
    title: "Sistema",
    icon: Settings,
    children: [
      {
        title: "Bitácoras y auditoría",
        icon: ScrollText,
        href: "/sistema/bitacoras",
      },
      {
        title: "Administración del sistema",
        icon: ShieldCheck,
        href: "/sistema/administracion",
      },
    ],
  },
  {
    title: "Perfil",
    icon: User,
    href: "/perfil",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const getInitialOpenMenu = () => {
    const activeGroup = menuItems.find((item) =>
      item.children?.some((child) => pathname === child.href)
    );

    return activeGroup?.title || null;
  };

  const [openMenu, setOpenMenu] = useState(getInitialOpenMenu);

  const toggleMenu = (title) => {
    setOpenMenu((currentMenu) =>
      currentMenu === title ? null : title
    );
  };

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-primary-dark px-4 py-5 text-white">
      {/* LOGO */}
      <div className="mb-8 px-3">
        <h1 className="text-2xl font-bold tracking-wide">
          AGROMATIK
        </h1>

        <p className="mt-1 text-sm text-white/65">
          Gestión agrícola inteligente
        </p>
      </div>

      {/* MENÚ */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openMenu === item.title;

          /*
           * ELEMENTOS SIN SUBMENÚ
           * Ejemplo: Inicio y Perfil
           */
          if (!item.children) {
            const active = isActive(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={[
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
                  "text-sm font-medium",
                  "transition-colors duration-200",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                />

                <span>
                  {item.title}
                </span>
              </Link>
            );
          }

          /*
           * ELEMENTOS CON SUBMENÚ
           */
          return (
            <div key={item.title}>
              <button
                type="button"
                onClick={() =>
                  toggleMenu(item.title)
                }
                className={[
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
                  "text-left",
                  "transition-colors duration-200",
                  "hover:bg-white/10",
                ].join(" ")}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                />

                <span className="flex-1 text-sm font-medium">
                  {item.title}
                </span>

                {isOpen ? (
                  <ChevronDown size={17} />
                ) : (
                  <ChevronRight size={17} />
                )}
              </button>

              {isOpen && (
                <div className="mb-2 ml-5 mt-1 space-y-1 border-l border-white/15 pl-4">
                  {item.children.map((child) => {
                    const ChildIcon =
                      child.icon;

                    const active =
                      isActive(child.href);

                    return (
                      <Link
                        key={child.title}
                        href={child.href}
                        className={[
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2",
                          "text-sm",
                          "transition-colors duration-200",
                          active
                            ? "bg-white/15 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        <ChildIcon
                          size={17}
                          strokeWidth={1.8}
                        />

                        <span>
                          {child.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}