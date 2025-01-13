export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: 'free' | 'pro' | 'enterprise';
  status: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface ResumeAnalysis {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  overall_score: number;
  ats_score: number;
  keyword_score: number;
  format_score: number;
  created_at: string;
  is_premium: boolean;
}

export interface AnalysisSection {
  id: string;
  analysis_id: string;
  section_type: 'summary' | 'experience' | 'education' | 'skills' | 'format';
  score: number;
  feedback: string;
  suggestions: string[];
  created_at: string;
}