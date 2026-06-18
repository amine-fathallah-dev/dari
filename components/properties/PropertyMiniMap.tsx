'use client'

import { useEffect, useRef } from 'react'

interface PropertyMiniMapProps {
  latitude: number
  longitude: number
  title: string
}

export default function PropertyMiniMap({ latitude, longitude, title }: PropertyMiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [latitude, longitude],
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const icon = L.divIcon({
        className: '',
        html: `<div style="width:24px;height:24px;background:#A87C56;border:3px solid #FAF6EF;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      })

      L.marker([latitude, longitude], { icon }).addTo(map).bindPopup(title).openPopup()

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [latitude, longitude, title])

  return (
    <div
      ref={mapRef}
      className="w-full h-56 rounded-card border border-border"
      aria-label={`Localisation : ${title}`}
    />
  )
}
