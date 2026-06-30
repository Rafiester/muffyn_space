# Deployment Guide: Vercel & Supabase

This guide outlines how to deploy your Link-in-Bio space to **Vercel** with fully connected **Supabase** backend support.

---

## Step 1: Set Up Supabase Database

1. **Create a Supabase Project:**
   - Go to [Supabase](https://supabase.com/) and create a new project.
   
2. **Execute SQL Setup Script:**
   - Go to the **SQL Editor** in your Supabase dashboard.
   - Click **New Query**.
   - Copy and paste the contents of `./docs/supabase_setup.sql` or `./docs/schema.sql` into the query editor.
   - Click **Run** to generate the necessary `profiles` and `links` tables, disable row-level security (RLS) for testing, or set up RLS policies.

3. **Get API Credentials:**
   - Go to **Project Settings** > **API**.
   - Copy the following fields:
     - **Project URL** (e.g. `https://your-project.supabase.co`)
     - **API Anon Key** (the public key)

---

## Step 2: Deploy to Vercel

1. **Push your code to GitHub:**
   - Ensure all your latest changes are pushed to your GitHub repository.

2. **Create Vercel Project:**
   - Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New** > **Project**.
   - Import your GitHub repository.

3. **Configure Environment Variables:**
   - Under the **Environment Variables** section in Vercel, add the following keys to connect your live Supabase database to Vite/Nuxt client-side:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Your Supabase Project URL |
   | `VITE_SUPABASE_ANON_KEY` | `your-anon-key-here` | Your Supabase anon/public API Key |

4. **Deploy:**
   - Click **Deploy**. Vercel will automatically auto-detect Nuxt 3, build your assets, and deploy your site to a live URL!

---

## Step 3: Seed / Initialize Admin Session

1. Log into your admin panel on Vercel by navigating to:
   `https://your-vercel-domain.com/th3w3b4dm1n`
2. Insert your link items, select your themes, upload custom card icons, and edit your SEO configuration.
3. Click **Publish** to instantly save and publish everything live!
