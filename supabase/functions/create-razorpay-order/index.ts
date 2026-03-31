import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay@2.9.2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const { plan_name, cycle } = await req.json()

        // 1. Secure Price Calculation (Server-Side)
        // We do NOT trust the price sent from the frontend.
        let amount = 0;

        const PRICING = {
            "Basic": { monthly: 8000, yearly: 80000 },
            "Professional": { monthly: 15000, yearly: 150000 },
            "Enterprise": { monthly: 30000, yearly: 300000 }
        }

        if (!PRICING[plan_name]) { // Validate Plan
            throw new Error("Invalid Plan Name")
        }

        // Determine amount based on cycle
        amount = cycle === 'yearly' ? PRICING[plan_name].yearly : PRICING[plan_name].monthly;

        // Convert to Paisa (Razorpay expects smallest currency unit)
        const amountInPaisa = amount * 100;

        // 2. Initialize Razorpay with Secret Key
        const razorpay = new Razorpay({
            key_id: Deno.env.get('RAZORPAY_KEY_ID') ?? '',
            key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') ?? '',
        })

        // 3. Create the Order
        const order = await razorpay.orders.create({
            amount: amountInPaisa,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                plan: plan_name,
                cycle: cycle
            }
        })

        // 4. Return Order ID to Frontend
        return new Response(
            JSON.stringify(order),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error("Error creating order:", error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
