-- Create leads table in Supabase
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Contact Information
  business_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Business Information
  industry TEXT NOT NULL,
  business_description TEXT NOT NULL,
  
  -- Website Requirements
  has_website TEXT,
  current_website_url TEXT,
  needed_pages TEXT,
  preferred_domain TEXT,
  has_branding TEXT,
  color_scheme TEXT,
  
  -- Timeline & Details
  launch_timeline TEXT,
  content_ready TEXT,
  special_requirements TEXT,
  hear_about_us TEXT,
  
  -- Metadata
  status TEXT DEFAULT 'new', -- new, contacted, converted, etc.
  notes TEXT,
  
  -- Index for faster queries
  INDEX idx_created_at (created_at DESC),
  INDEX idx_email (email),
  INDEX idx_status (status)
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow your API to insert leads
-- You'll need to use service role key for this to work
CREATE POLICY "Allow API to insert leads" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Create a policy to allow reading leads (optional, only if you want to display them)
CREATE POLICY "Allow API to read leads" ON leads
  FOR SELECT
  USING (true);