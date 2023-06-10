export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      grandezas: {
        Row: {
          id: number
          nome: string
          unidade: string
        }
        Insert: {
          id?: number
          nome: string
          unidade: string
        }
        Update: {
          id?: number
          nome?: string
          unidade?: string
        }
      }
      medidas: {
        Row: {
          instante: string
          medidor_grandeza_id: number
          valor: number
        }
        Insert: {
          instante?: string
          medidor_grandeza_id: number
          valor: number
        }
        Update: {
          instante?: string
          medidor_grandeza_id?: number
          valor?: number
        }
      }
      medidor_grandeza: {
        Row: {
          grandeza_id: number
          id: number
          medidor_id: number
        }
        Insert: {
          grandeza_id: number
          id?: number
          medidor_id: number
        }
        Update: {
          grandeza_id?: number
          id?: number
          medidor_id?: number
        }
      }
      medidores: {
        Row: {
          descricao: string
          id: number
          nome: string
        }
        Insert: {
          descricao: string
          id?: number
          nome: string
        }
        Update: {
          descricao?: string
          id?: number
          nome?: string
        }
      }
      profiles: {
        Row: {
          full_name: string | null
          has_avatar: boolean
          id: string
          updated_at: string
        }
        Insert: {
          full_name?: string | null
          has_avatar?: boolean
          id: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          has_avatar?: boolean
          id?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      buscar_medidas: {
        Args: {
          medidor: number
          grandeza: number
          intervalo: unknown
          inicio: string
          fim: string
          timezone?: string
        }
        Returns: {
          x: string
          y: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

