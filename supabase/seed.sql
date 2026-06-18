-- ============================================================
-- DARI — Seed Data (18 annonces immobilières tunisiennes)
-- Coller dans le SQL Editor de votre projet Supabase
-- ============================================================

-- Nettoyer les données existantes (sécurisé — ne supprime que nos refs connues)
delete from properties where reference like 'DARI-2026-%';

-- Insérer les 18 annonces
insert into properties (
  reference, transaction, property_type, title, description, price,
  governorate, delegation, neighborhood, latitude, longitude,
  surface_habitable, surface_terrain, pieces, bathrooms, floor,
  furnished, condition, title_status, amenities, images,
  is_featured, status
) values

-- 1. Lac 1 — Appart vente
(
  'DARI-2026-0001', 'vente', 'appartement',
  'Appartement S+2 moderne aux Berges du Lac 1',
  'Magnifique appartement S+2 entièrement rénové dans la résidence sécurisée des Berges du Lac. Finitions haut de gamme, cuisine équipée, double vitrage. Proche commerces et restaurants.',
  420000, 'Tunis', 'La Goulette', 'Lac 1', 36.832, 10.228,
  110, null, 2, 2, 4, false, 'neuf', 'titre_foncier',
  ARRAY['parking','ascenseur','climatisation'],
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop'],
  true, 'disponible'
),

-- 2. Lac 2 — Appart location meublé
(
  'DARI-2026-0002', 'location', 'appartement',
  'Appartement meublé S+1 au Lac 2, vue dégagée',
  'Appartement S+1 meublé et équipé au 3e étage. Vue dégagée, lumineux. Idéal pour professionnel ou couple. Disponible immédiatement.',
  1200, 'Tunis', 'La Goulette', 'Lac 2', 36.835, 10.242,
  75, null, 1, 1, 3, true, 'neuf', 'titre_foncier',
  ARRAY['parking','climatisation','ascenseur'],
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 3. Gammarth — Villa piscine vue mer
(
  'DARI-2026-0003', 'vente', 'villa',
  'Villa avec piscine à Gammarth — vue mer',
  'Somptueuse villa de 350 m² sur un terrain de 600 m² à Gammarth. Piscine privée, vue panoramique sur la Méditerranée, jardin paysager. 4 chambres, 3 salles de bain, cuisine ouverte.',
  1850000, 'Tunis', 'La Marsa', 'Gammarth', 36.914, 10.276,
  350, 600, 4, 3, 0, false, 'neuf', 'titre_foncier',
  ARRAY['piscine','jardin','parking','garage','vue_mer','climatisation','terrasse'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format&fit=crop'],
  true, 'disponible'
),

-- 4. La Marsa — Villa location meublée
(
  'DARI-2026-0004', 'location', 'villa',
  'Villa S+3 meublée à La Marsa — résidence fermée',
  'Belle villa S+3 meublée dans résidence sécurisée à La Marsa. Jardin privatif, garage double, proche plage et centre-ville.',
  4500, 'Tunis', 'La Marsa', 'La Marsa Centre', 36.878, 10.321,
  220, 380, 3, 3, 0, true, 'neuf', 'titre_foncier',
  ARRAY['jardin','garage','parking','climatisation','terrasse','concierge'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 5. Carthage — Appart S+3 standing
(
  'DARI-2026-0005', 'vente', 'appartement',
  'Appartement S+3 à Carthage — cadre exceptionnel',
  'Appartement spacieux S+3 dans une résidence de standing à Carthage Hannibal. Vue partielle sur la mer, matériaux nobles, gardien 24h/24.',
  680000, 'Tunis', 'Carthage', 'Carthage Hannibal', 36.854, 10.321,
  165, null, 3, 2, 2, false, 'neuf', 'titre_foncier',
  ARRAY['parking','ascenseur','climatisation','concierge','vue_mer'],
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop'],
  true, 'disponible'
),

-- 6. El Menzah — Studio vente
(
  'DARI-2026-0006', 'vente', 'studio',
  'Studio neuf à El Menzah 6',
  'Studio fonctionnel en rez-de-chaussée surélevé à El Menzah 6. Cuisine américaine, salle de bain moderne. Idéal investissement locatif.',
  185000, 'Tunis', 'El Menzah', 'El Menzah 6', 36.834, 10.175,
  45, null, 1, 1, 1, false, 'neuf', 'titre_bleu',
  ARRAY['parking','climatisation'],
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 7. Ennasr / Ariana — Appart location
(
  'DARI-2026-0007', 'location', 'appartement',
  'Appartement S+2 non meublé à Ennasr — Ariana',
  'Appartement S+2 lumineux au 2e étage, immeuble récent à Ennasr 2. Proche université, commerces et transports.',
  900, 'Ariana', 'Ariana Ville', 'Ennasr 2', 36.871, 10.201,
  95, null, 2, 1, 2, false, 'ancien', 'titre_foncier',
  ARRAY['parking','climatisation'],
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 8. Carthage — Terrain
(
  'DARI-2026-0008', 'vente', 'terrain',
  'Terrain constructible 500 m² à Carthage',
  'Terrain plat de 500 m² viabilisé (eau, électricité, tout-à-l''égout) dans un quartier résidentiel de Carthage. COS favorable, titre foncier pur.',
  650000, 'Tunis', 'Carthage', 'Carthage Dermech', 36.859, 10.329,
  null, 500, null, null, null, false, null, 'titre_foncier',
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 9. Hammamet Nord — Villa balnéaire
(
  'DARI-2026-0009', 'vente', 'villa',
  'Villa balnéaire à Hammamet Nord — à 300 m de la plage',
  'Superbe villa de 280 m² à 300 m de la plage de Hammamet Nord. Piscine hors sol, jardin arborisé, 3 chambres en suite. Titre foncier.',
  1200000, 'Nabeul', 'Hammamet', 'Hammamet Nord', 36.432, 10.607,
  280, 450, 3, 3, 0, false, 'neuf', 'titre_foncier',
  ARRAY['piscine','jardin','parking','climatisation','terrasse'],
  ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop'],
  true, 'disponible'
),

-- 10. Hammamet — Studio location bord de mer
(
  'DARI-2026-0010', 'location', 'studio',
  'Studio meublé en bord de mer à Hammamet',
  'Charmant studio meublé dans résidence touristique avec piscine commune, accès plage privé. Idéal location estivale ou résidence secondaire.',
  1500, 'Nabeul', 'Hammamet', 'Hammamet Centre', 36.399, 10.624,
  38, null, 1, 1, 1, true, 'neuf', 'titre_foncier',
  ARRAY['piscine','vue_mer','climatisation'],
  ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 11. El Kantaoui — Appart vente
(
  'DARI-2026-0011', 'vente', 'appartement',
  'Appartement S+2 au Port El Kantaoui — Sousse',
  'Appartement en résidence de luxe face au port El Kantaoui. Terrasse avec vue marina, piscine commune, gardien. Investissement premium.',
  550000, 'Sousse', 'Hammam Sousse', 'El Kantaoui', 35.892, 10.604,
  120, null, 2, 2, 3, false, 'neuf', 'titre_foncier',
  ARRAY['piscine','terrasse','vue_mer','parking','ascenseur','concierge'],
  ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 12. Sousse Centre — Appart location meublé
(
  'DARI-2026-0012', 'location', 'appartement',
  'Appartement S+1 meublé à Sousse Centre',
  'Appartement S+1 meublé et entretenu, proche médina et plage de Sousse. Tout équipé, idéal pour séjour professionnel.',
  800, 'Sousse', 'Sousse Ville', 'Centre Ville', 35.826, 10.638,
  65, null, 1, 1, 2, true, 'ancien', 'titre_bleu',
  ARRAY['climatisation'],
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 13. Sfax — Local commercial
(
  'DARI-2026-0013', 'vente', 'local_commercial',
  'Local commercial 180 m² à Sfax Centre — angle de rue',
  'Local commercial idéalement situé à l''angle de deux artères principales de Sfax. Vitrine double, hauteur sous plafond 4m, climatisation centralisée.',
  420000, 'Sfax', 'Sfax Ville', 'Centre Ville', 34.743, 10.761,
  180, null, null, null, 0, false, 'ancien', 'titre_foncier',
  ARRAY['climatisation','parking'],
  ARRAY['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 14. Sfax Ouest — Villa familiale
(
  'DARI-2026-0014', 'vente', 'villa',
  'Villa familiale S+4 à Sfax — quartier résidentiel',
  'Grande villa familiale S+4 sur terrain 800 m² dans quartier résidentiel de Sfax Ouest. Double garage, jardin, piscine. Proche écoles et commerces.',
  950000, 'Sfax', 'Sfax Ville', 'Sfax Ouest', 34.741, 10.745,
  320, 800, 4, 4, 0, false, 'ancien', 'titre_foncier',
  ARRAY['piscine','jardin','garage','parking','climatisation'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 15. Monastir — Appart vue mer
(
  'DARI-2026-0015', 'vente', 'appartement',
  'Appartement S+2 face à la mer à Monastir',
  'Appartement S+2 en 1er rang avec vue mer imprenable sur la corniche de Monastir. Balcon orienté est, résidence neuve avec piscine et parking.',
  480000, 'Monastir', 'Monastir', 'Corniche', 35.779, 10.831,
  105, null, 2, 2, 5, false, 'neuf', 'titre_foncier',
  ARRAY['piscine','vue_mer','terrasse','parking','ascenseur'],
  ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format&fit=crop'],
  true, 'disponible'
),

-- 16. Djerba Midoun — Villa traditionnelle
(
  'DARI-2026-0016', 'vente', 'villa',
  'Villa traditionnelle à Djerba Midoun — architecture authentique',
  'Authentique houch djerbien rénové avec goût : 5 pièces autour d''un patio central avec bassin. Vue sur oliveraie. Idéal maison de vacances ou gîte.',
  780000, 'Medenine', 'Midoun', 'Midoun', 33.804, 10.989,
  210, 600, 3, 3, 0, false, 'neuf', 'titre_foncier',
  ARRAY['jardin','parking','terrasse'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 17. Djerba Sidi Mahrez — Villa location vue mer
(
  'DARI-2026-0017', 'location', 'villa',
  'Villa vue mer à Djerba — 5 min plage Sidi Mahrez',
  'Villa 3 chambres avec piscine privée et vue mer, à 5 min à pied de la plage Sidi Mahrez. Entièrement meublée et équipée. Disponible à l''année.',
  5500, 'Medenine', 'Houmt Souk', 'Sidi Mahrez', 33.871, 10.853,
  190, 400, 3, 3, 0, true, 'neuf', 'titre_foncier',
  ARRAY['piscine','vue_mer','jardin','parking','climatisation','terrasse'],
  ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
),

-- 18. El Menzah 9 / Ariana — Appart location
(
  'DARI-2026-0018', 'location', 'appartement',
  'Appartement S+3 à louer à El Menzah 9 — Ariana',
  'Appartement S+3 neuf au 1er étage à El Menzah 9. Cuisine équipée, 2 salles de bain, double parking en sous-sol. Résidence arborée, gardien.',
  2200, 'Ariana', 'Ariana Ville', 'El Menzah 9', 36.842, 10.188,
  145, null, 3, 2, 1, false, 'neuf', 'titre_foncier',
  ARRAY['parking','ascenseur','climatisation','concierge'],
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop'],
  false, 'disponible'
);

-- Vérification
select reference, title, transaction, price from properties order by reference;
