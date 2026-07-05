"use client";

import { useEffect, useRef } from "react";

interface MapProps {
  establishments: any[];
  centerLocation?: { lat: number; lon: number } | null;
}

export default function Map({ establishments, centerLocation }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let LInstance: any = null;
    let active = true;

    async function initMap() {
      const Leaflet = await import("leaflet");
      LInstance = Leaflet.default;

      if (!active || !mapContainerRef.current) return;

      // Fix default marker icons path in Leaflet
      delete LInstance.Icon.Default.prototype._getIconUrl;
      LInstance.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Find center
      let centerLat = 28.2096;
      let centerLon = 83.9856;

      if (centerLocation) {
        centerLat = centerLocation.lat;
        centerLon = centerLocation.lon;
      } else {
        const validOsm = establishments.filter((e) => e.location?.lat && e.location?.lon);
        if (validOsm.length > 0) {
          centerLat = validOsm[0].location.lat;
          centerLon = validOsm[0].location.lon;
        }
      }

      // Initialize map
      if (!mapRef.current) {
        mapRef.current = LInstance.map(mapContainerRef.current).setView([centerLat, centerLon], 13);
        LInstance.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView([centerLat, centerLon], 13);
      }

      // Clear previous markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers
      establishments.forEach((est) => {
        if (est.location?.lat && est.location?.lon) {
          const popupContent = `
            <div style="font-family: sans-serif; min-width: 150px; padding: 4px;">
              <h4 style="margin: 0 0 4px 0; font-weight: bold; color: #c05c31; font-size: 13px;">${est.name}</h4>
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #666; text-transform: uppercase; font-weight: 600;">${est.category.replace("_", " ")}</p>
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #444;">${est.address}</p>
              <p style="margin: 0; font-size: 12px; font-weight: bold; color: #d97706;">★ ${est.rating}</p>
            </div>
          `;
          const marker = LInstance.marker([est.location.lat, est.location.lon])
            .bindPopup(popupContent)
            .addTo(mapRef.current);
          markersRef.current.push(marker);
        }
      });
    }

    initMap();

    return () => {
      active = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [establishments, centerLocation]);

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border border-border/60 shadow-xl">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
}
