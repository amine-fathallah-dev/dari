'use client'

import { useEffect, useRef } from 'react'
import type { Property } from '@/lib/types'
import { formatPrice, getPlaceholderImage, getPublicImageUrl } from '@/lib/utils'
import Link from 'next/link'

interface MapViewProps {
  properties: Property[]
}

declare global {
  interface Window {
    L: typeof import('leaflet')
  }
}

export default function MapView({ properties }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      // Fix default marker icons
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [36.8, 10.18],
        zoom: 8,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const accentIcon = L.divIcon({
        className: '',
        html: `<div style="width:28px;height:28px;background:#A87C56;border:3px solid #FAF6EF;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.25)"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -32],
      })

      properties.forEach((p) => {
        if (!p.latitude || !p.longitude) return

        const imgUrl =
          p.images?.[0]
            ? getPublicImageUrl(p.images[0])
            : getPlaceholderImage(parseInt(p.id.slice(-1), 16) % 7)

        const popup = L.popup({ maxWidth: 220, className: 'dari-popup' }).setContent(`
          <div style="font-family:inherit">
            <img src="${imgUrl}" alt="${p.title}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:8px" loading="lazy" />
            <p style="font-size:11px;color:#8A8175;margin:0 0 2px;text-transform:uppercase;letter-spacing:.05em">${p.property_type.replace('_', ' ')}</p>
            <p style="font-size:13px;font-weight:500;color:#29241F;margin:0 0 4px;line-height:1.3">${p.title}</p>
            <p style="font-size:14px;font-weight:600;color:#29241F;margin:0 0 8px">${formatPrice(p.price, p.transaction)}</p>
            <a href="/annonces/${p.reference}" style="display:block;text-align:center;background:#A87C56;color:#FAF6EF;font-size:12px;padding:6px;border-radius:6px;text-decoration:none">Voir l'annonce</a>
          </div>
        `)

        L.marker([p.latitude, p.longitude], { icon: accentIcon })
          .addTo(map)
          .bindPopup(popup)
      })

      // Fit to markers if we have coordinates
      const coords = properties.filter((p) => p.latitude && p.longitude)
      if (coords.length > 0) {
        const bounds = L.latLngBounds(
          coords.map((p) => [p.latitude!, p.longitude!])
        )
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 })
      }

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [properties])

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px] rounded-card border border-border"
      aria-label="Carte des annonces"
    />
  )
}
