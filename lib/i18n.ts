export const AGENCY = {
  name: 'DARI',
  tagline: "L'immobilier tunisien, autrement.",
  description:
    "DARI est votre agence immobilière de référence en Tunisie. Vente et location de biens d'exception à Tunis et dans les grandes villes du pays.",
  email: process.env.NEXT_PUBLIC_AGENCY_EMAIL ?? 'contact@dari-immo.tn',
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '+216 XX XXX XXX',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '216XXXXXXXX',
  address: 'Les Berges du Lac, Tunis, Tunisie',
}

export const LABELS = {
  transaction: {
    vente: 'Vente',
    location: 'Location',
  },
  property_type: {
    appartement: 'Appartement',
    villa: 'Villa',
    studio: 'Studio',
    terrain: 'Terrain',
    local_commercial: 'Local commercial',
  },
  status: {
    disponible: 'Disponible',
    vendu: 'Vendu',
    loue: 'Loué',
  },
  condition: {
    neuf: 'Neuf',
    ancien: 'Ancien',
    sur_plan: 'Sur plan',
  },
  title_status: {
    titre_foncier: 'Titre foncier',
    titre_bleu: 'Titre bleu',
    non_immatricule: 'Non immatriculé',
  },
  amenities: {
    parking: 'Parking',
    garage: 'Garage',
    jardin: 'Jardin',
    piscine: 'Piscine',
    climatisation: 'Climatisation',
    chauffage: 'Chauffage',
    ascenseur: 'Ascenseur',
    vue_mer: 'Vue mer',
    terrasse: 'Terrasse',
    concierge: 'Concierge',
  },
}

export const GOVERNORATES = [
  'Tunis',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Nabeul',
  'Zaghouan',
  'Bizerte',
  'Béja',
  'Jendouba',
  'Kef',
  'Siliana',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Gabès',
  'Medenine',
  'Tataouine',
  'Gafsa',
  'Tozeur',
  'Kébili',
]
