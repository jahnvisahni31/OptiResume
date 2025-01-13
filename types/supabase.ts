export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analysis_sections: {
        Row: {
          id: string
          analysis_id: string
          section_type: 'summary' | 'experience' | 'education' | 'skills' | 'format'
          score: number
          feedback: string
          suggestions: string[]
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          section_type: 'summary' | 'experience' | 'education' | 'skills' | 'format'
          score: number
          feedback: string
          suggestions?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          section_type?: 'summary' | 'experience' | 'education' | 'skills' | 'format'
          score?: number
          feedback?: string
          suggestions?: string[]
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resume_analyses: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_url: string
          overall_score: number
          ats_score: number
          keyword_score: number
          format_score: number
          created_at: string
          is_premium: boolean
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_url: string
          overall_score: number
          ats_score: number
          keyword_score: number
          format_score: number
          created_at?: string
          is_premium?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_url?: string
          overall_score?: number
          ats_score?: number
          keyword_score?: number
          format_score?: number
          created_at?: string
          is_premium?: boolean
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: 'free' | 'pro' | 'enterprise'
          status: string
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: 'free' | 'pro' | 'enterprise'
          status: string
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: 'free' | 'pro' | 'enterprise'
          status?: string
          current_period_start?: string
          current_period_end?: string
          created_at?: string
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
  }
}