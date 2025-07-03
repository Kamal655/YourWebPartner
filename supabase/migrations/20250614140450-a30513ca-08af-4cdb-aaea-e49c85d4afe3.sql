
-- Create a table for testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  project_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert testimonials (public feedback)
CREATE POLICY "Anyone can submit testimonials" 
  ON public.testimonials 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow public read of testimonials
CREATE POLICY "Anyone can view testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (true);
