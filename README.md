# Joy's Pastry · Next.js + Supabase

A bakery storefront with a scroll-pinned product story, catalogue, cart, guest checkout that hands orders to WhatsApp, and optional Supabase authentication / customer order history.

## Run locally

1. Install Node.js 20.9 or newer.
2. Extract the project and open it in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase Project URL and anon key (or publishable key).
6. Run `npm run dev` and open http://localhost:3000.

**The storefront, cart and WhatsApp ordering work without Supabase keys.** Supabase keys activate account registration, email/password sign-in, Google sign-in and saved order history.

## Supabase setup

1. Create a project at https://supabase.com/dashboard.
2. Open **Project Settings → API** and copy the Project URL and anon/public key into `.env.local`.
3. In **Authentication → Providers**, enable Email and Google.
4. In **Authentication → URL Configuration**, add `http://localhost:3000/account` as a redirect URL. Add your deployed domain account URL too after deployment.
5. Open **SQL Editor**, paste and run `supabase/schema.sql`.
6. Restart `npm run dev` after changing environment variables.

Google provider setup also requires configuring the Google OAuth client in Supabase's Google provider settings and adding the Supabase callback URL shown there to Google Cloud Console.

## WhatsApp ordering

The checkout builds an order message with product names, quantities, subtotal, customer name, phone, delivery address and notes. It opens WhatsApp to `2348110495124`. No payment gateway is used. Joy's Pastry confirms delivery fee, availability and payment details directly in WhatsApp.

To change the WhatsApp number, update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (international format, digits only).

## Supabase data

`supabase/schema.sql` creates `profiles` and `orders` tables with Row Level Security. Authenticated customers can only read their own order rows. Signed-in customer names and phone numbers are saved to their profile, and signed-in order summaries are recorded before the WhatsApp handoff. Guest orders are sent to WhatsApp but are not stored in a customer account.

## Before launch

- Replace the starter food photos with Joy's real product photography.
- Confirm products, prices, cake sizes, order lead times and delivery zones.
- Upload the Gratitude Vector Technologies logo and replace the footer placeholder.
- Add the bakery's actual Instagram / social links.
- Test WhatsApp handoff on Android, iPhone and desktop.
- Test Supabase email confirmation and Google OAuth on the deployed domain.
- Review database RLS policies before production.

## Notes

Starter prices are Nigerian naira. No card payment gateway is connected. WhatsApp handoff is the ordering channel, not an automatic payment or confirmed booking. The scroll journey uses a pinned multi-scene section whose visual object is scrubbed by scroll progress; reduced-motion preferences are respected by the global stylesheet.
