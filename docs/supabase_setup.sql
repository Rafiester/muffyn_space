-- SQL Setup script for Linktree Alternative Supabase DB

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    avatar_url TEXT,
    active_theme TEXT DEFAULT 'minimalist',
    socials JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create links table
CREATE TABLE IF NOT EXISTS public.links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    icon_name TEXT DEFAULT 'globe',
    is_active BOOLEAN DEFAULT true NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    accent_color TEXT,
    sort_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for public reading but secure writing
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Create Policies (Select: Publicly available; Insert/Update/Delete: Admins only)
-- NOTE: In a production environment, you should secure write operations with auth.uid() checks.
-- For simple demo setups, we allow standard reads by anyone:
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read links" ON public.links FOR SELECT USING (true);

-- Allow full administrative access to authenticated users
CREATE POLICY "Allow all actions for authenticated users on profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all actions for authenticated users on links" ON public.links FOR ALL TO authenticated USING (true);

-- Insert initial mock data
INSERT INTO public.profiles (id, display_name, title, bio, avatar_url, active_theme, socials)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Alex Rivera',
    'Creative Technologist & Interface Designer',
    'Building aesthetic, high-performance web applications. Focused on creative frontend engineering and micro-interactions.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
    'minimalist',
    '{"github": "https://github.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "email": "mailto:alex@example.com"}'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.links (profile_id, title, description, url, icon_name, is_active, featured, accent_color, sort_order)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Interactive Design Portfolio', 'My latest work, case studies, and playground experiments.', 'https://example.com/portfolio', 'globe', true, true, '#6366f1', 1),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Weekly Tech & Design Newsletter', 'In-depth articles about UX, Tailwind, and React compilation.', 'https://example.com/newsletter', 'newsletter', true, false, '#ec4899', 2),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'My YouTube Channel', 'Weekly tutorials on Next.js, Framer Motion, and web dev tips.', 'https://youtube.com', 'youtube', true, false, '#ef4444', 3),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Figma Design Resources', 'Download free Tailwind UI components and Figma UI kits.', 'https://figma.com', 'figma', true, false, '#0acf83', 4),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Open Source Contributions', 'Check out my repositories, stars, and pull requests.', 'https://github.com', 'github', true, false, '#171717', 5)
ON CONFLICT DO NOTHING;
