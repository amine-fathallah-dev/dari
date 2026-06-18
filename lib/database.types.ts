export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          reference: string
          transaction: 'vente' | 'location'
          property_type:
            | 'appartement'
            | 'villa'
            | 'studio'
            | 'terrain'
            | 'local_commercial'
          title: string
          description: string | null
          price: number
          governorate: string
          delegation: string | null
          neighborhood: string | null
          latitude: number | null
          longitude: number | null
          surface_habitable: number | null
          surface_terrain: number | null
          pieces: number | null
          bathrooms: number | null
          floor: number | null
          furnished: boolean
          condition: 'neuf' | 'ancien' | 'sur_plan' | null
          title_status:
            | 'titre_foncier'
            | 'titre_bleu'
            | 'non_immatricule'
            | null
          amenities: string[] | null
          images: string[] | null
          is_featured: boolean
          status: 'disponible' | 'vendu' | 'loue'
        }
        Insert: Omit<
          Database['public']['Tables']['properties']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & { id?: string; created_at?: string; updated_at?: string }
        Update: Partial<Database['public']['Tables']['properties']['Insert']>
      }
      contacts: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          message: string
          property_id: string | null
          is_read: boolean
        }
        Insert: Omit<
          Database['public']['Tables']['contacts']['Row'],
          'id' | 'created_at'
        > & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
      }
    }
  }
}
