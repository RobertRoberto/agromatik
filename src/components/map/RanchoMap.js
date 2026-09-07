"use client";

import { useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

import Button from "@/components/ui/Button";

const INITIAL_RANCHO_POSITION = {
  lat: 19.705381,
  lng: -103.543137,
};

function CenterMap({ position, zoom = 18 }) {
  const map = useMap();

  useEffect(() => {
    if (!position || !map) return;

    map.panTo(position);
    map.setZoom(zoom);
  }, [position, zoom, map]);

  return null;
}

export default function RanchoMap() {
  const [ranchoPosition, setRanchoPosition] = useState(
    INITIAL_RANCHO_POSITION
  );

  const [userPosition, setUserPosition] = useState(null);

  const [centerPosition, setCenterPosition] = useState(null);

  const [locationError, setLocationError] = useState("");

  const [isLocating, setIsLocating] = useState(false);

  const handleDragEnd = (event) => {
    if (!event.latLng) return;

    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setRanchoPosition(newPosition);
  };

  const handleMapDoubleClick = (event) => {
    if (!event.detail?.latLng) return;

    event.stop();

    const newPosition = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    };

    setRanchoPosition(newPosition);
  };

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Tu navegador no permite obtener la ubicación."
      );

      return;
    }

    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserPosition(currentPosition);

        setCenterPosition({
          ...currentPosition,
        });

        setIsLocating(false);
      },

      (error) => {
        console.error(error);

        setLocationError(
          "No fue posible obtener tu ubicación. Revisa los permisos del navegador."
        );

        setIsLocating(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const goToRancho = () => {
    setRanchoPosition({
      ...INITIAL_RANCHO_POSITION,
    });

    setCenterPosition({
      ...INITIAL_RANCHO_POSITION,
    });
  };

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <div className="space-y-4">
        {/* ENCABEZADO */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Ubicación del rancho
            </h2>

            <p className="text-sm text-muted">
              Visualiza y ajusta la ubicación geográfica del rancho.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={goToRancho}
            >
              Volver al rancho
            </Button>

            <Button
              variant="primary"
              onClick={getMyLocation}
              disabled={isLocating}
            >
              {isLocating
                ? "Obteniendo ubicación..."
                : "Mi ubicación"}
            </Button>
          </div>
        </div>

        {/* MAPA */}
        <div className="h-[600px] w-full overflow-hidden rounded-2xl">
          <Map
            defaultCenter={INITIAL_RANCHO_POSITION}
            defaultZoom={17}
            gestureHandling="greedy"
            mapTypeControl={true}
            streetViewControl={false}
            fullscreenControl={true}
            zoomControl={true}
            mapId="DEMO_MAP_ID"
            disableDoubleClickZoom={true}
            onDblclick={handleMapDoubleClick}
          >
            {/* MARCADOR DEL RANCHO */}
            <AdvancedMarker
              position={ranchoPosition}
              draggable={true}
              onDragEnd={handleDragEnd}
            >
              <Pin
                background="#0b6b45"
                borderColor="#00452c"
                glyphColor="#ffffff"
              />
            </AdvancedMarker>

            {/* CENTRADO DEL MAPA */}
            {centerPosition && (
              <CenterMap
                position={centerPosition}
                zoom={18}
              />
            )}

            {/* UBICACIÓN DEL USUARIO */}
            {userPosition && (
              <AdvancedMarker position={userPosition}>
                <div className="relative">
                  <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-blue-500/20" />

                  <div className="relative h-4 w-4 rounded-full border-[3px] border-white bg-blue-500 shadow-lg" />
                </div>
              </AdvancedMarker>
            )}
          </Map>
        </div>

        {/* ERROR DE GEOLOCALIZACIÓN */}
        {locationError && (
          <div className="rounded-lg border border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
            {locationError}
          </div>
        )}
      </div>
    </APIProvider>
  );
}