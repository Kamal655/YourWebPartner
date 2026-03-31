-- Create page_views table if it doesn't exist
CREATE TABLE IF NOT EXISTS "public"."page_views" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "page_path" TEXT NOT NULL,
    "user_id" UUID REFERENCES auth.users(id),
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Doubling down to be safe)
ALTER TABLE "public"."page_views" ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking visits from non-logged in users)
CREATE POLICY "Allow anonymous inserts" ON "public"."page_views" FOR INSERT WITH CHECK (true);

-- Allow admin to read all (Replace email with your actual admin email if different)
CREATE POLICY "Allow admin readall" ON "public"."page_views" FOR SELECT USING (auth.email() = 'yourwebpartner1@gmail.com');
