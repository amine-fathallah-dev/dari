# Prompt Claude Code — DARI (plateforme immobilière Tunisie)

## Contexte & objectif

Tu vas créer une plateforme web immobilière pour **DARI**, une agence tunisienne de **vente et location** de biens immobiliers. Le modèle s'inspire de SeLoger, adapté au marché tunisien.

C'est un **MVP** : reste focalisé sur le cœur (annonces + recherche + carte + contact + back-office admin). **Pas d'over-engineering**, pas de paiement en ligne, pas de blog dans cette v1 (prévu v2). C'est un **template brandable** (agence DARI par défaut, réutilisable pour un autre client).

Le site a deux faces, exactement comme un projet précédent (GM AUTO) :
- **Vitrine publique** : recherche, liste + carte, fiche détaillée, contact.
- **Back-office admin privé** : un seul administrateur, CRUD des annonces, gestion des leads.

**Aucune transaction en ligne.** Le but est la **génération de leads** (formulaire + WhatsApp + appel).

---

## Stack technique

- **Next.js 14** (App Router, TypeScript, Server Components par défaut)
- **Supabase** (Postgres + Auth + Storage)
- **Tailwind CSS**
- **react-leaflet + Leaflet** pour la carte (OpenStreetMap, **zéro coût**, pas de Google Maps)
- Déploiement **Vercel**
- **Langue : FR uniquement** pour la v1, mais architecture **i18n-ready** (textes centralisés, pas de chaînes en dur dispersées, prêt pour un futur FR/AR).

---

## Identité visuelle — sable / minimaliste

Direction : **sobre, minéral, premium discret**. Pense à l'architecture méditerranéenne tunisienne (pierre, chaux, arches) plutôt qu'au corporate rouge de SeLoger. Minimalisme = la précision des espacements et de la typo fait tout le travail.

### Palette (tokens — à mettre en variables Tailwind/CSS)

| Rôle | Hex |
|---|---|
| Fond principal (crème) | `#FAF6EF` |
| Surface / cartes (sable clair) | `#F2EBDD` |
| Bordures / séparateurs | `#E2D6C2` |
| Accent (terre/taupe — CTA, liens actifs) | `#A87C56` |
| Accent foncé (hover) | `#8A6443` |
| Texte principal (encre) | `#29241F` |
| Texte secondaire (muted) | `#8A8175` |
| Disponible / succès | `#6F7F5C` (olive sobre) |

Un **seul** accent fort (terre `#A87C56`). Tout le reste reste calme. Pas de dégradés criards, pas d'ombres lourdes — ombres très légères, `border-radius` modéré (≈ 8–12px), beaucoup de blanc d'espace.

### Typographie

- **Titres / display** : `Marcellus` (Google Fonts) — capitales romaines, feeling « pierre gravée », architectural. À utiliser avec retenue sur les gros titres.
- **Corps de texte / UI** : `Hanken Grotesk` (Google Fonts) — propre, moderne, lisible.
- **Données / prix / références** : `Hanken Grotesk` en poids medium, ou tabular-nums pour les prix.

Charge les polices via `next/font/google`. Échelle typo claire et hiérarchie Hn correcte.

### Élément signature

Un **motif d'arche** (silhouette d'arche tunisienne, en SVG fin) utilisé discrètement comme :
- séparateur de section sur la home,
- masque/coin sur l'image principale des cartes d'annonces (coin supérieur en arche douce).

Subtil, jamais clinquant. C'est le seul détail « mémorable » — tout le reste reste minimal.

### Logo

Génère un **wordmark « Dari »** simple en `Marcellus` (lettres espacées, capitales ou bas-de-casse élégant) + un **favicon** dérivé (lettre « D » ou petite arche) dans la palette sable. Remplaçable plus tard par un logo client.

---

## Modèle de données (Supabase)

### Table `properties`

```sql
create table properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  reference text unique not null,                 -- ex: DARI-2026-0001
  transaction text not null check (transaction in ('vente','location')),
  property_type text not null check (property_type in
    ('appartement','villa','studio','terrain','local_commercial')),
  title text not null,
  description text,
  price numeric not null,                         -- TND ; pour location = mensuel
  -- Localisation (3 niveaux + carte)
  governorate text not null,                      -- gouvernorat
  delegation text,                                -- délégation
  neighborhood text,                              -- quartier
  latitude double precision,
  longitude double precision,
  -- Caractéristiques
  surface_habitable integer,                      -- m²
  surface_terrain integer,                        -- m² (nullable, villas/terrains)
  pieces integer,                                 -- le X de S+X (salon + X chambres)
  bathrooms integer,
  floor integer,                                  -- étage (nullable)
  furnished boolean default false,                -- meublé / non meublé
  condition text check (condition in ('neuf','ancien','sur_plan')),
  title_status text check (title_status in
    ('titre_foncier','titre_bleu','non_immatricule')),
  amenities text[],                               -- voir liste ci-dessous
  images text[],                                  -- URLs Supabase Storage
  is_featured boolean default false,              -- coup de cœur (home)
  status text not null default 'disponible'
    check (status in ('disponible','vendu','loue'))
);
```

**Liste des équipements (`amenities`)** à proposer en filtres et formulaire :
`parking`, `garage`, `jardin`, `piscine`, `climatisation`, `chauffage`, `ascenseur`, `vue_mer`, `terrasse`, `concierge`.

**Affichage des pièces** : afficher la notation tunisienne **S+X** (ex. `pieces = 2` → « S+2 »).

### Table `contacts` (leads)

```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  property_id uuid references properties(id) on delete set null,
  is_read boolean default false
);
```

### RLS

```sql
alter table properties enable row level security;
alter table contacts enable row level security;

-- Lecture publique des annonces
create policy "Public read properties" on properties for select using (true);
-- Écriture réservée à l'admin authentifié
create policy "Admin write properties" on properties for all
  using (auth.role() = 'authenticated');

-- Insertion publique des leads (formulaire de contact)
create policy "Public insert contacts" on contacts for insert with check (true);
-- Lecture / gestion réservée à l'admin
create policy "Admin manage contacts" on contacts for all
  using (auth.role() = 'authenticated');
```

### Storage

Bucket public **`property-images`** pour les photos d'annonces (upload depuis l'admin).

### Référence auto

Génère la référence `DARI-2026-XXXX` côté application à la création (numéro séquentiel zéro-paddé sur 4). Une fonction utilitaire suffit pour le MVP.

### Auth

**Supabase Auth** email + mot de passe, **un seul compte admin**. Pas d'inscription publique. Routes admin protégées (middleware + vérif session côté serveur).

---

## Vitrine publique (côté client)

### Pages

1. **Accueil** (`/`)
   - Hero : titre `Marcellus` + champ de recherche rapide (transaction, type, ville) + séparateur arche.
   - Section **annonces coup de cœur** (`is_featured`).
   - Bloc « pourquoi DARI » court, footer avec contacts.

2. **Recherche / liste** (`/annonces`)
   - **Filtres** : transaction (vente/location), type de bien, gouvernorat, fourchette de prix (TND), fourchette de surface, nombre de pièces (S+X).
   - **Vue liste** (cartes) **+ vue carte** (Leaflet) basculables — pins cliquables qui ouvrent un mini-popup vers la fiche. C'est l'élément « SeLoger » central.
   - Tri (prix, récence).
   - **Favoris** stockés en **localStorage** (pas de compte client).

3. **Fiche annonce** (`/annonces/[reference]`)
   - Galerie photos, toutes les caractéristiques (S+X, surfaces, étage, statut du titre, état, meublé, équipements), prix en TND, mini-carte de localisation.
   - **Contact** : formulaire (insère dans `contacts`) **+ bouton WhatsApp** (lien `wa.me`) **+ bouton appel** (`tel:`).
   - URL canonique basée sur la `reference`.

4. **Contact** (`/contact`) : coordonnées agence + formulaire général + carte.

### Variables d'environnement contact

```
NEXT_PUBLIC_WHATSAPP_NUMBER=216XXXXXXXX
NEXT_PUBLIC_PHONE_NUMBER=+216XXXXXXXX
NEXT_PUBLIC_AGENCY_EMAIL=contact@dari-immo.tn
NEXT_PUBLIC_SITE_URL=https://dari-immo.tn
```

---

## Back-office admin (`/admin`)

- **Login** Supabase Auth (un seul compte).
- **Dashboard** : stats simples (nb annonces par statut, nb leads non lus, nb par transaction).
- **Annonces** : tableau, **CRUD complet**, **upload multi-photos** vers Supabase Storage, toggle `is_featured`, changement de `status` (disponible / vendu / loué). Formulaire couvrant tous les champs du modèle, avec saisie lat/lng (ou sélection sur mini-carte si simple).
- **Leads** : liste des `contacts`, marquage lu/non lu, lien vers l'annonce concernée.

Garde l'UI admin sobre et fonctionnelle (même palette, pas besoin de fioritures).

---

## SEO (bloc requis — à implémenter intégralement)

- **Metadata API** Next : `generateMetadata` par page (titre, description), `metadataBase` sur `NEXT_PUBLIC_SITE_URL`.
- **Open Graph** + Twitter cards (image OG par défaut + image annonce sur les fiches).
- **URLs canoniques** sur chaque page (canonical absolu, basé sur la référence pour les fiches).
- **`app/sitemap.ts`** : pages statiques + une entrée par annonce (généré dynamiquement depuis Supabase).
- **`app/robots.ts`** : autorise tout sauf `/admin`.
- **JSON-LD / Schema.org** : `RealEstateListing` (ou `Residence`/`Offer`) sur chaque fiche annonce ; `RealEstateAgent` / `LocalBusiness` (DARI) sur la home et le contact.
- **`next/image`** partout + `alt` descriptif sur toutes les images.
- **`next/font`** pour Marcellus + Hanken Grotesk.
- **`lang="fr"`** sur `<html>`.
- **Hiérarchie Hn** correcte (un seul `h1` par page).
- **Core Web Vitals** : images optimisées/lazy, pas de layout shift, polices `display: swap`.

L'objectif est un référencement technique propre dès le départ (le contenu/blog viendra en v2).

---

## Données de démo (seed)

Crée un script de **seed** (`/scripts/seed.ts` ou SQL) insérant **~18 annonces réalistes tunisiennes**, variées et cohérentes :

- Villes/quartiers réels : **Lac 1 / Lac 2, La Marsa, Gammarth, Carthage, El Menzah, Ennasr (Ariana)** pour le Grand Tunis ; **Hammamet, Sousse (Kantaoui), Sfax, Monastir, Djerba** ailleurs.
- Mix vente / location, mix types (appartements S+1 à S+3, villas, studios, 1 terrain, 1 local commercial).
- Prix **cohérents en TND** : location appart ≈ 800–2 500 TND/mois, villa location ≈ 2 500–6 000 ; vente appart ≈ 250 000–700 000, villa ≈ 600 000–2 000 000.
- Coordonnées lat/lng plausibles pour chaque ville (pour peupler la carte).
- 2–4 `is_featured`.
- Images : utilise des placeholders propres (Unsplash immobilier ou `/public` local) en attendant les vraies photos.

---

## Ordre de développement recommandé

1. Init Next 14 + TypeScript + Tailwind + tokens couleur/typo.
2. Client Supabase + schéma SQL (tables, RLS, bucket, Auth).
3. Layout global (header/footer, wordmark Dari, motif arche), pages publiques statiques.
4. Liste `/annonces` : filtres + cartes + vue carte Leaflet.
5. Fiche `/annonces/[reference]` + contact (form + WhatsApp + tel).
6. Favoris localStorage.
7. Admin : auth + middleware, CRUD annonces, upload images, leads.
8. Dashboard admin.
9. SEO complet (metadata, sitemap, robots, JSON-LD).
10. Seed de démo.
11. Préparation déploiement Vercel (variables d'env, build OK).

Génère une base **cohérente et fonctionnelle du premier coup**, sobre et propre, fidèle à la direction sable/minimaliste. Si un point te semble ambigu, choisis l'option la plus simple (MVP) et continue.
