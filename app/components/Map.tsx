'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default icon issue with Leaflet in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Destination {
  id: number
  city: string
  country: string
  startDate: string
  endDate: string
  order: number
}

interface MapProps {
  destinations: Destination[]
  height?: string
}

// Coordinates database (static for hackathon demo)
const CITY_COORDINATES: Record<string, [number, number]> = {
  // Europe
  'Paris': [48.8566, 2.3522],
  'Rome': [41.9028, 12.4964],
  'London': [51.5074, -0.1278],
  'Barcelona': [41.3851, 2.1734],
  'Amsterdam': [52.3676, 4.9041],
  'Berlin': [52.5200, 13.4050],
  'Prague': [50.0755, 14.4378],
  'Vienna': [48.2082, 16.3738],
  'Venice': [45.4408, 12.3155],
  'Athens': [37.9838, 23.7275],
  
  // Asia
  'Tokyo': [35.6762, 139.6503],
  'Kyoto': [35.0116, 135.7681],
  'Seoul': [37.5665, 126.9780],
  'Bangkok': [13.7563, 100.5018],
  'Singapore': [1.3521, 103.8198],
  'Dubai': [25.2048, 55.2708],
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.7041, 77.1025],
  'Hong Kong': [22.3193, 114.1694],
  'Shanghai': [31.2304, 121.4737],
  
  // Americas
  'New York': [40.7128, -74.0060],
  'Los Angeles': [34.0522, -118.2437],
  'San Francisco': [37.7749, -122.4194],
  'Chicago': [41.8781, -87.6298],
  'Miami': [25.7617, -80.1918],
  'Toronto': [43.6532, -79.3832],
  'Vancouver': [49.2827, -123.1207],
  'Mexico City': [19.4326, -99.1332],
  'Buenos Aires': [-34.6037, -58.3816],
  'Rio de Janeiro': [-22.9068, -43.1729],
  
  // Oceania
  'Sydney': [-33.8688, 151.2093],
  'Melbourne': [-37.8136, 144.9631],
  'Auckland': [-36.8485, 174.7633],
  
  // Africa
  'Cairo': [30.0444, 31.2357],
  'Cape Town': [-33.9249, 18.4241],
  'Marrakech': [31.6295, -7.9811],
}

export default function Map({ destinations, height = '500px' }: MapProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create map
    const map = L.map('trip-map').setView([20, 0], 2)

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    // Add markers for each destination
    const bounds: L.LatLngBoundsExpression = []
    const sortedDestinations = [...destinations].sort((a, b) => a.order - b.order)

    sortedDestinations.forEach((dest, index) => {
      const coords = CITY_COORDINATES[dest.city]
      if (coords) {
        const [lat, lng] = coords
        bounds.push([lat, lng])

        // Create custom icon with order number
        const divIcon = L.divIcon({
          html: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${index + 1}</div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        // Add marker
        const marker = L.marker([lat, lng], { icon: divIcon }).addTo(map)
        
        // Add popup with destination info
        const startDate = new Date(dest.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const endDate = new Date(dest.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        
        marker.bindPopup(`
          <div style="font-family: system-ui; padding: 4px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #667eea;">
              Stop ${index + 1}: ${dest.city}
            </h3>
            <p style="margin: 0; font-size: 13px; color: #666;">
              📍 ${dest.country}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">
              📅 ${startDate} - ${endDate}
            </p>
          </div>
        `)
      }
    })

    // Draw lines between destinations (route)
    if (bounds.length > 1) {
      const polyline = L.polyline(bounds, {
        color: '#667eea',
        weight: 2,
        opacity: 0.7,
        dashArray: '10, 10',
      }).addTo(map)

      // Fit map to show all markers
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] })
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 10)
    }

    // Cleanup on unmount
    return () => {
      map.remove()
    }
  }, [destinations])

  return (
    <div className="relative">
      <div 
        id="trip-map" 
        style={{ height, width: '100%' }}
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-xs text-gray-600 z-[1000]">
        🗺️ Interactive Map Preview
      </div>
    </div>
  )
}
