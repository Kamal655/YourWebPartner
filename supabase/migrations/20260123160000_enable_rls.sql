-- Enable RLS on sensitive tables
ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."promo_codes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."page_views" ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can do everything
-- Note: Adjust 'admin@yourwebpartner.com' or role check specific to your auth setup
-- For now, allowing all authenticated users to INSERT own orders (for checkout)
-- And only specific admin to SELECT all.

-- ORDERS Policies
CREATE POLICY "Enable insert for everyone" ON "public"."orders" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for admins only" ON "public"."orders" FOR SELECT USING (auth.role() = 'service_role' OR auth.email() = 'yourwebpartner1@gmail.com');

-- PROMO_CODES Policies
CREATE POLICY "Enable read for everyone" ON "public"."promo_codes" FOR SELECT USING (true);
CREATE POLICY "Enable write for admin only" ON "public"."promo_codes" FOR ALL USING (auth.email() = 'yourwebpartner1@gmail.com');

-- PAGE_VIEWS Policies
CREATE POLICY "Enable insert for everyone" ON "public"."page_views" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for admin only" ON "public"."page_views" FOR SELECT USING (auth.email() = 'yourwebpartner1@gmail.com');
