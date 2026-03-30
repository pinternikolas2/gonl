-- 0. RLS Enablers and Enum Types
CREATE TYPE user_status AS ENUM ('registered', 'verified', 'bsn_ready', 'at_work');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected', 'onboarding');

-- 1. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  status user_status DEFAULT 'registered',
  bsn_number TEXT,
  is_id_verified BOOLEAN DEFAULT FALSE,
  is_cv_uploaded BOOLEAN DEFAULT FALSE,
  cv_url TEXT,
  is_ticket_uploaded BOOLEAN DEFAULT FALSE,
  ticket_url TEXT,
  arrival_date DATE,
  arrival_time TIME,
  current_location TEXT,
  has_bsn BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS pre Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- 2. Jobs Table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location_city TEXT,
  hourly_brutto NUMERIC NOT NULL,
  housing_cost_weekly NUMERIC NOT NULL DEFAULT 135.00,
  insurance_cost_weekly NUMERIC NOT NULL DEFAULT 38.50,
  shift_allowance NUMERIC NOT NULL DEFAULT 1.0,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS pre Jobs (viditelne pre vsetkych)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Only admins/partners can create jobs" ON public.jobs FOR INSERT WITH CHECK (false); -- Toto rozsiris vo Faze 5 pre Adminov


-- 3. Applications Table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  contract_status application_status DEFAULT 'pending',
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS pre Applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own applications" ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON public.applications FOR UPDATE USING (auth.uid() = user_id);
