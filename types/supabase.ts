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
          grandeza_id: number
          medidor_id: number
          timestamp: string
          valor: number
        }
        Insert: {
          grandeza_id: number
          medidor_id: number
          timestamp?: string
          valor: number
        }
        Update: {
          grandeza_id?: number
          medidor_id?: number
          timestamp?: string
          valor?: number
        }
      }
      medidor_grandeza: {
        Row: {
          grandeza_id: number
          medidor_id: number
        }
        Insert: {
          grandeza_id: number
          medidor_id: number
        }
        Update: {
          grandeza_id?: number
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

