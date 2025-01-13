/*
  # Initial Schema for Resume Analysis SaaS

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to auth.users
    - `subscriptions`
      - Tracks user subscription status and plan
    - `resume_analyses`
      - Stores analysis results and metadata
    - `analysis_sections`
      - Stores detailed section-by-section feedback
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  plan_id text NOT NULL,
  status text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_plan CHECK (plan_id IN ('free', 'pro', 'enterprise'))
);

-- Create resume analyses table
CREATE TABLE resume_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  overall_score integer NOT NULL,
  ats_score integer NOT NULL,
  keyword_score integer NOT NULL,
  format_score integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_premium boolean DEFAULT false
);

-- Create analysis sections table
CREATE TABLE analysis_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES resume_analyses(id) NOT NULL,
  section_type text NOT NULL,
  score integer NOT NULL,
  feedback text NOT NULL,
  suggestions text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_section_type CHECK (section_type IN ('summary', 'experience', 'education', 'skills', 'format'))
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_sections ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Resume analyses policies
CREATE POLICY "Users can read own analyses"
  ON resume_analyses FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create analyses"
  ON resume_analyses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Analysis sections policies
CREATE POLICY "Users can read own analysis sections"
  ON analysis_sections FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM resume_analyses
    WHERE resume_analyses.id = analysis_sections.analysis_id
    AND resume_analyses.user_id = auth.uid()
  ));