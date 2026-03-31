import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as crypto from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            plan_name,
            amount,
            currency,
            customer_email,
            customer_name,
            customer_phone,
            company_name, // New field 
            promo_code
        } = await req.json()

        // 1. Verify Signature
        const secret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? '';
        if (!secret) throw new Error("Server Misconfiguration: Missing Razorpay Secret");

        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            throw new Error("Invalid Payment Signature: potential fraud attempt.");
        }

        // 2. Save to Database
        const { data: order, error: dbError } = await supabase
            .from('orders')
            .insert([
                {
                    order_id: razorpay_order_id,
                    payment_id: razorpay_payment_id,
                    amount: amount,
                    currency: currency || 'INR',
                    status: 'paid',
                    plan_name: plan_name,
                    customer_name: customer_name,
                    customer_email: customer_email,
                    customer_phone: customer_phone,
                    company_name: company_name, // New
                    promo_code: promo_code
                }
            ])
            .select()
            .single()

        if (dbError) throw dbError

        // 3. Send Email (Resend Integration)
        // NOTE: In production, move this key to Supabase Secrets (Deno.env.get('RESEND_API_KEY'))
        const RESEND_KEY = "re_JVjXpnfY_NV2uFbt3t9tagejTc13f1SYE";

        const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #9333ea; text-align: center;">Payment Receipt</h2>
        <p>Hi ${customer_name || 'Valued Client'},</p>
        <p>Thank you for choosing <strong>YourWebPartner</strong>. We have received your payment successfully.</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Plan:</strong> ${plan_name}</p>
          <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${Number(amount).toLocaleString()}</p>
          ${promo_code ? `<p style="margin: 5px 0; color: #16a34a;"><strong>Discount Applied:</strong> ${promo_code}</p>` : ''}
          <p style="margin: 5px 0; font-size: 12px; color: #6b7280;">Transaction ID: ${razorpay_payment_id}</p>
        </div>

        <p>Our team will reach out to you shortly to begin the onboarding process.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="text-align: center; font-size: 12px; color: #6b7280;">
          &copy; ${new Date().getFullYear()} YourWebPartner. All rights reserved.
        </p>
      </div>
    `;

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_KEY}`
            },
            body: JSON.stringify({
                from: 'YourWebPartner <onboarding@resend.dev>', // Default Resend Sender
                to: [customer_email],
                subject: `Payment Receipt: ${plan_name}`,
                html: emailHtml
            })
        });

        const emailData = await res.json();
        console.log("Customer Email Sent:", emailData);

        // 4. Send Admin Notification (New)
        const ADMIN_EMAIL = "yourwebpartner1@gmail.com";

        const adminHtml = `
            <div style="font-family: sans-serif; padding: 20px;">
                <h2 style="color: #9333ea;">💰 New Order Received!</h2>
                <p><strong>Customer:</strong> ${customer_name}</p>
                <p><strong>Company:</strong> ${company_name || 'N/A'}</p>
                <p><strong>Email:</strong> ${customer_email}</p>
                <p><strong>Phone:</strong> ${customer_phone || 'N/A'}</p>
                <hr/>
                <p><strong>Plan:</strong> ${plan_name}</p>
                <p><strong>Amount:</strong> ₹${Number(amount).toLocaleString()}</p>
                <p><strong>Promo Code:</strong> ${promo_code || 'None'}</p>
                <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
            </div>
        `;

        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_KEY}`
                },
                body: JSON.stringify({
                    from: 'YourWebPartner Alert <onboarding@resend.dev>',
                    to: [ADMIN_EMAIL],
                    subject: `[New Sale] ${plan_name} - ₹${amount}`,
                    html: adminHtml
                })
            });
            console.log("Admin Alert Sent");
        } catch (adminErr) {
            console.error("Failed to send admin alert:", adminErr);
            // Don't fail the request if admin email fails
        }

        return new Response(
            JSON.stringify({ message: "Order verified and receipt sent", order, email: emailData }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error("verify-payment error:", error);
        // Reset to 200 to bubble up error message to frontend client
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
