/**
 * Seed script — 18 annonces immobilières tunisiennes réalistes
 * Usage: npx tsx scripts/seed.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 * Note: admin must be authenticated or use service_role key for inserts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or key in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`

const IMGS = {
  apt: [
    UNSPLASH('photo-1545324418-cc1a3fa10c00'),
    UNSPLASH('photo-1512917774080-9991f1c4c750'),
  ],
  villa: [
    UNSPLASH('photo-1600596542815-ffad4c1539a9'),
    UNSPLASH('photo-1600585154340-be6161a56a0c'),
    UNSPLASH('photo-1568605114967-8130f3a36994'),
  ],
  studio: [UNSPLASH('photo-1502672260266-1c1ef2d93688')],
  terrain: [UNSPLASH('photo-1500382017468-9049fed747ef')],
  commercial: [UNSPLASH('photo-1497366811353-6870744d04b2')],
  sea: [UNSPLASH('photo-1499793983690-e29da59ef1c2'), UNSPLASH('photo-1582268611958-ebfd161ef9cf')],
}

const properties = [
  // ── Grand Tunis ──────────────────────────────────────────────
  {
    reference: 'DARI-2026-0001',
    transaction: 'vente' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+2 moderne aux Berges du Lac 1',
    description:
      "Magnifique appartement S+2 entièrement rénové dans la résidence sécurisée des Berges du Lac. Finitions haut de gamme, cuisine équipée, double vitrage. Proche commerces et restaurants.",
    price: 420000,
    governorate: 'Tunis',
    delegation: 'La Goulette',
    neighborhood: 'Lac 1',
    latitude: 36.832,
    longitude: 10.228,
    surface_habitable: 110,
    pieces: 2,
    bathrooms: 2,
    floor: 4,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['parking', 'ascenseur', 'climatisation'],
    images: IMGS.apt,
    is_featured: true,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0002',
    transaction: 'location' as const,
    property_type: 'appartement' as const,
    title: 'Appartement meublé S+1 au Lac 2, vue dégagée',
    description:
      "Appartement S+1 meublé et équipé au 3e étage. Vue dégagée, lumineux. Idéal pour professionnel ou couple. Disponible immédiatement.",
    price: 1200,
    governorate: 'Tunis',
    delegation: 'La Goulette',
    neighborhood: 'Lac 2',
    latitude: 36.835,
    longitude: 10.242,
    surface_habitable: 75,
    pieces: 1,
    bathrooms: 1,
    floor: 3,
    furnished: true,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['parking', 'climatisation', 'ascenseur'],
    images: IMGS.apt,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0003',
    transaction: 'vente' as const,
    property_type: 'villa' as const,
    title: 'Villa avec piscine à Gammarth — vue mer',
    description:
      "Somptueuse villa de 350 m² sur un terrain de 600 m² à Gammarth. Piscine privée, vue panoramique sur la Méditerranée, jardin paysager. 4 chambres, 3 salles de bain, cuisine ouverte.",
    price: 1850000,
    governorate: 'Tunis',
    delegation: 'La Marsa',
    neighborhood: 'Gammarth',
    latitude: 36.914,
    longitude: 10.276,
    surface_habitable: 350,
    surface_terrain: 600,
    pieces: 4,
    bathrooms: 3,
    floor: 0,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'jardin', 'parking', 'garage', 'vue_mer', 'climatisation', 'terrasse'],
    images: IMGS.villa,
    is_featured: true,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0004',
    transaction: 'location' as const,
    property_type: 'villa' as const,
    title: 'Villa S+3 meublée à La Marsa — résidence fermée',
    description:
      "Belle villa S+3 meublée dans résidence sécurisée à La Marsa. Jardin privatif, garage double, proche plage et centre-ville.",
    price: 4500,
    governorate: 'Tunis',
    delegation: 'La Marsa',
    neighborhood: 'La Marsa Centre',
    latitude: 36.878,
    longitude: 10.321,
    surface_habitable: 220,
    surface_terrain: 380,
    pieces: 3,
    bathrooms: 3,
    floor: 0,
    furnished: true,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['jardin', 'garage', 'parking', 'climatisation', 'terrasse', 'concierge'],
    images: IMGS.villa,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0005',
    transaction: 'vente' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+3 à Carthage — cadre exceptionnel',
    description:
      "Appartement spacieux S+3 dans une résidence de standing à Carthage Hannibal. Vue partielle sur la mer, matériaux nobles, gardien 24h/24.",
    price: 680000,
    governorate: 'Tunis',
    delegation: 'Carthage',
    neighborhood: 'Carthage Hannibal',
    latitude: 36.854,
    longitude: 10.321,
    surface_habitable: 165,
    pieces: 3,
    bathrooms: 2,
    floor: 2,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['parking', 'ascenseur', 'climatisation', 'concierge', 'vue_mer'],
    images: IMGS.apt,
    is_featured: true,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0006',
    transaction: 'vente' as const,
    property_type: 'appartement' as const,
    title: 'Studio neuf à El Menzah 6',
    description:
      "Studio fonctionnel en rez-de-chaussée surélevé à El Menzah 6. Cuisine américaine, salle de bain moderne. Idéal investissement locatif.",
    price: 185000,
    governorate: 'Tunis',
    delegation: 'El Menzah',
    neighborhood: 'El Menzah 6',
    latitude: 36.834,
    longitude: 10.175,
    surface_habitable: 45,
    pieces: 1,
    bathrooms: 1,
    floor: 1,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_bleu' as const,
    amenities: ['parking', 'climatisation'],
    images: IMGS.studio,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0007',
    transaction: 'location' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+2 non meublé à Ennasr — Ariana',
    description:
      "Appartement S+2 lumineux au 2e étage, immeuble récent à Ennasr 2. Proche université, commerces et transports.",
    price: 900,
    governorate: 'Ariana',
    delegation: 'Ariana Ville',
    neighborhood: 'Ennasr 2',
    latitude: 36.871,
    longitude: 10.201,
    surface_habitable: 95,
    pieces: 2,
    bathrooms: 1,
    floor: 2,
    furnished: false,
    condition: 'ancien' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['parking', 'climatisation'],
    images: IMGS.apt,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0008',
    transaction: 'vente' as const,
    property_type: 'terrain' as const,
    title: 'Terrain constructible 500 m² à Carthage',
    description:
      "Terrain plat de 500 m² viabilisé (eau, électricité, tout-à-l'égout) dans un quartier résidentiel de Carthage. COS favorable, titre foncier pur.",
    price: 650000,
    governorate: 'Tunis',
    delegation: 'Carthage',
    neighborhood: 'Carthage Dermech',
    latitude: 36.859,
    longitude: 10.329,
    surface_terrain: 500,
    furnished: false,
    title_status: 'titre_foncier' as const,
    amenities: [],
    images: IMGS.terrain,
    is_featured: false,
    status: 'disponible' as const,
  },

  // ── Hammamet ──────────────────────────────────────────────────
  {
    reference: 'DARI-2026-0009',
    transaction: 'vente' as const,
    property_type: 'villa' as const,
    title: 'Villa balnéaire à Hammamet Nord — à 300 m de la plage',
    description:
      "Superbe villa de 280 m² à 300 m de la plage de Hammamet Nord. Piscine hors sol, jardin arborisé, 3 chambres en suite. Titre foncier.",
    price: 1200000,
    governorate: 'Nabeul',
    delegation: 'Hammamet',
    neighborhood: 'Hammamet Nord',
    latitude: 36.432,
    longitude: 10.607,
    surface_habitable: 280,
    surface_terrain: 450,
    pieces: 3,
    bathrooms: 3,
    floor: 0,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'jardin', 'parking', 'climatisation', 'terrasse'],
    images: IMGS.sea,
    is_featured: true,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0010',
    transaction: 'location' as const,
    property_type: 'studio' as const,
    title: 'Studio meublé en bord de mer à Hammamet',
    description:
      "Charmant studio meublé dans résidence touristique avec piscine commune, accès plage privé. Idéal location estivale ou résidence secondaire.",
    price: 1500,
    governorate: 'Nabeul',
    delegation: 'Hammamet',
    neighborhood: 'Hammamet Centre',
    latitude: 36.399,
    longitude: 10.624,
    surface_habitable: 38,
    pieces: 1,
    bathrooms: 1,
    floor: 1,
    furnished: true,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'vue_mer', 'climatisation'],
    images: IMGS.sea,
    is_featured: false,
    status: 'disponible' as const,
  },

  // ── Sousse ────────────────────────────────────────────────────
  {
    reference: 'DARI-2026-0011',
    transaction: 'vente' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+2 au Port El Kantaoui — Sousse',
    description:
      "Appartement en résidence de luxe face au port El Kantaoui. Terrasse avec vue marina, piscine commune, gardien. Investissement premium.",
    price: 550000,
    governorate: 'Sousse',
    delegation: 'Hammam Sousse',
    neighborhood: 'El Kantaoui',
    latitude: 35.892,
    longitude: 10.604,
    surface_habitable: 120,
    pieces: 2,
    bathrooms: 2,
    floor: 3,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'terrasse', 'vue_mer', 'parking', 'ascenseur', 'concierge'],
    images: IMGS.sea,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0012',
    transaction: 'location' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+1 meublé à Sousse Centre',
    description:
      "Appartement S+1 meublé et entretenu, proche médina et plage de Sousse. Tout équipé, idéal pour séjour professionnel.",
    price: 800,
    governorate: 'Sousse',
    delegation: 'Sousse Ville',
    neighborhood: 'Centre Ville',
    latitude: 35.826,
    longitude: 10.638,
    surface_habitable: 65,
    pieces: 1,
    bathrooms: 1,
    floor: 2,
    furnished: true,
    condition: 'ancien' as const,
    title_status: 'titre_bleu' as const,
    amenities: ['climatisation'],
    images: IMGS.apt,
    is_featured: false,
    status: 'disponible' as const,
  },

  // ── Sfax ──────────────────────────────────────────────────────
  {
    reference: 'DARI-2026-0013',
    transaction: 'vente' as const,
    property_type: 'local_commercial' as const,
    title: 'Local commercial 180 m² à Sfax Centre — angle de rue',
    description:
      "Local commercial idéalement situé à l'angle de deux artères principales de Sfax. Vitrine double, hauteur sous plafond 4m, climatisation centralisée.",
    price: 420000,
    governorate: 'Sfax',
    delegation: 'Sfax Ville',
    neighborhood: 'Centre Ville',
    latitude: 34.743,
    longitude: 10.761,
    surface_habitable: 180,
    furnished: false,
    condition: 'ancien' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['climatisation', 'parking'],
    images: IMGS.commercial,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0014',
    transaction: 'vente' as const,
    property_type: 'villa' as const,
    title: 'Villa familiale S+4 à Sfax — quartier résidentiel',
    description:
      "Grande villa familiale S+4 sur terrain 800 m² dans quartier résidentiel de Sfax Ouest. Double garage, jardin, piscine. Proche écoles et commerces.",
    price: 950000,
    governorate: 'Sfax',
    delegation: 'Sfax Ville',
    neighborhood: 'Sfax Ouest',
    latitude: 34.741,
    longitude: 10.745,
    surface_habitable: 320,
    surface_terrain: 800,
    pieces: 4,
    bathrooms: 4,
    floor: 0,
    furnished: false,
    condition: 'ancien' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'jardin', 'garage', 'parking', 'climatisation'],
    images: IMGS.villa,
    is_featured: false,
    status: 'disponible' as const,
  },

  // ── Monastir ──────────────────────────────────────────────────
  {
    reference: 'DARI-2026-0015',
    transaction: 'vente' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+2 face à la mer à Monastir',
    description:
      "Appartement S+2 en 1er rang avec vue mer imprenable sur la corniche de Monastir. Balcon orienté est, résidence neuve avec piscine et parking.",
    price: 480000,
    governorate: 'Monastir',
    delegation: 'Monastir',
    neighborhood: 'Corniche',
    latitude: 35.779,
    longitude: 10.831,
    surface_habitable: 105,
    pieces: 2,
    bathrooms: 2,
    floor: 5,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'vue_mer', 'terrasse', 'parking', 'ascenseur'],
    images: IMGS.sea,
    is_featured: true,
    status: 'disponible' as const,
  },

  // ── Djerba ────────────────────────────────────────────────────
  {
    reference: 'DARI-2026-0016',
    transaction: 'vente' as const,
    property_type: 'villa' as const,
    title: 'Villa traditionnelle à Djerba Midoun — architecture authentique',
    description:
      "Authentique houch djerbien rénové avec goût : 5 pièces autour d'un patio central avec bassin. Vue sur oliveraie. Idéal maison de vacances ou gîte.",
    price: 780000,
    governorate: 'Medenine',
    delegation: 'Midoun',
    neighborhood: 'Midoun',
    latitude: 33.804,
    longitude: 10.989,
    surface_habitable: 210,
    surface_terrain: 600,
    pieces: 3,
    bathrooms: 3,
    floor: 0,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['jardin', 'parking', 'terrasse'],
    images: IMGS.villa,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0017',
    transaction: 'location' as const,
    property_type: 'villa' as const,
    title: 'Villa vue mer à Djerba — 5 min plage Sidi Mahrez',
    description:
      "Villa 3 chambres avec piscine privée et vue mer, à 5 min à pied de la plage Sidi Mahrez. Entièrement meublée et équipée. Disponible à l'année.",
    price: 5500,
    governorate: 'Medenine',
    delegation: 'Houmt Souk',
    neighborhood: 'Sidi Mahrez',
    latitude: 33.871,
    longitude: 10.853,
    surface_habitable: 190,
    surface_terrain: 400,
    pieces: 3,
    bathrooms: 3,
    floor: 0,
    furnished: true,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['piscine', 'vue_mer', 'jardin', 'parking', 'climatisation', 'terrasse'],
    images: IMGS.sea,
    is_featured: false,
    status: 'disponible' as const,
  },
  {
    reference: 'DARI-2026-0018',
    transaction: 'location' as const,
    property_type: 'appartement' as const,
    title: 'Appartement S+3 à louer à El Menzah 9 — Ariana',
    description:
      "Appartement S+3 neuf au 1er étage à El Menzah 9. Cuisine équipée, 2 salles de bain, double parking en sous-sol. Résidence arborée, gardien.",
    price: 2200,
    governorate: 'Ariana',
    delegation: 'Ariana Ville',
    neighborhood: 'El Menzah 9',
    latitude: 36.842,
    longitude: 10.188,
    surface_habitable: 145,
    pieces: 3,
    bathrooms: 2,
    floor: 1,
    furnished: false,
    condition: 'neuf' as const,
    title_status: 'titre_foncier' as const,
    amenities: ['parking', 'ascenseur', 'climatisation', 'concierge'],
    images: IMGS.apt,
    is_featured: false,
    status: 'disponible' as const,
  },
]

async function seed() {
  console.log('Seeding DARI database with', properties.length, 'properties…')

  // Clear existing seed data (by known references)
  const refs = properties.map((p) => p.reference)
  const { error: deleteError } = await supabase
    .from('properties')
    .delete()
    .in('reference', refs)

  if (deleteError) {
    console.warn('Delete warning:', deleteError.message)
  }

  const { data, error } = await supabase.from('properties').insert(properties).select('reference, title')

  if (error) {
    console.error('Seed error:', error.message)
    process.exit(1)
  }

  console.log('✓ Inserted', data?.length, 'properties:')
  data?.forEach((p) => console.log(' ', p.reference, '—', p.title))
}

seed()
