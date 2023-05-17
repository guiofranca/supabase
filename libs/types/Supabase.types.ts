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
      profiles: {
        Row: {
            id: string
            full_name: string | undefined
            has_avatar: boolean
            updated_at: Date | undefined
        }
        Insert: {
            id: string
            full_name: string | undefined
            has_avatar: boolean
            updated_at: Date | undefined
        }
        Update: {
            full_name: string
        }
      },
      medidores: {
        Row: {
            id: number
            nome: string
            descricao: string
        }
        Insert: {
            nome: string
            descricao: string
        }
        Update: {
            nome: string
            descricao: string
        }
      },
      grandezas: {
        Row: {
            id: number
            nome: string
            unidade: string
        }
        Insert: {
            id: number
            nome: string
            unidade: string
        }
        Update: {
            nome: string
            unidade: string
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