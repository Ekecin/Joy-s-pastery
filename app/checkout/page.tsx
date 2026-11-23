"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { money } from "@/lib/products";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage(){
 const {items,subtotal,clear}=useCart();
 const [form,setForm]=useState({name:"",phone:"",address:"",notes:""});
 const [error,setError]=useState("");
 useEffect(()=>{
   let active=true;
   async function loadSavedDetails(){
     if(!supabase)return;
     const {data:{user}}=await supabase.auth.getUser();
     if(!user||!active)return;
     const {data:profile}=await supabase.from("profiles").select("full_name,phone").eq("id",user.id).maybeSingle();
     if(active)setForm(old=>({...old,name:old.name||profile?.full_name||user.user_metadata?.full_name||"",phone:old.phone||profile?.phone||""}));
   }
   loadSavedDetails();
   return ()=>{active=false;};
 },[]);
 function change(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){setForm({...form,[e.target.name]:e.target.value});}
 async function sendToWhatsApp(e:React.FormEvent){
   e.preventDefault();setError("");
   if(!items.length)return;
   // Open synchronously during the submit gesture so browser popup blockers allow the handoff.
   const whatsappWindow=window.open("about:blank","_blank");
   const lines=items.map(({product,quantity})=>`• ${product.name} x ${quantity} = ${money(product.price*quantity)}`).join("\n");
   const ref=`JOY-${Date.now().toString().slice(-7)}`;
   const message=[
     "Hello Joy's Pastry! I'd love to place an order.",
     "",
     `Order reference: ${ref}`,
     "MY ORDER",
     lines,
     "",
     `Subtotal: ${money(subtotal)}`,
     "",
     "CUSTOMER DETAILS",
     `Name: ${form.name}`,
     `Phone: ${form.phone}`,
     `Delivery address: ${form.address}`,
     form.notes?`Notes: ${form.notes}`:"",
     "",
     "Please confirm availability, delivery fee and next steps. Thank you!"
   ].filter(Boolean).join("\n");
   // Save a lightweight order record for signed-in customers when Supabase is configured.
   if(supabase){
     const {data:{user}}=await supabase.auth.getUser();
     if(user){
       const {error:profileError}=await supabase.from("profiles").upsert({
         id:user.id, full_name:form.name, phone:form.phone, updated_at:new Date().toISOString()
       });
       if(profileError) console.warn("Customer details could not be saved:",profileError.message);
       const {error:saveError}=await supabase.from("orders").insert({
         user_id:user.id, reference:ref, customer_name:form.name, phone:form.phone,
         delivery_address:form.address, notes:form.notes||null,
         items:items.map(x=>({id:x.product.id,name:x.product.name,price:x.product.price,quantity:x.quantity})),
         subtotal, status:"whatsapp_pending"
       });
       if(saveError) console.warn("Order was not saved to the customer's account:",saveError.message);
     }
   }
   const number=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"2348110495124").replace(/\D/g,"");
   const url=`https://wa.me/${number}?text=${encodeURIComponent(message)}`;
   if(whatsappWindow) whatsappWindow.location.href=url;
   else window.location.href=url;
   clear();
 }
 if(!items.length)return <div className="page-shell empty-state"><h2>Your bag is empty.</h2><Link href="/menu" className="button button-dark">Find a treat</Link></div>;
 return <div className="page-shell checkout-page"><div className="page-intro compact"><span className="eyebrow">THE LAST LITTLE STEP</span><h1>Let's make it <i>official.</i></h1><p>No online payment. We'll take your order straight to our WhatsApp.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={sendToWhatsApp}><h2>Where should we bring the joy?</h2><div className="form-grid"><label>Full name<input required name="name" value={form.name} onChange={change} placeholder="Your name"/></label><label>Phone number<input required type="tel" name="phone" value={form.phone} onChange={change} placeholder="+234..."/></label><label className="span-two">Delivery address<input required name="address" value={form.address} onChange={change} placeholder="Street, area, city"/></label><label className="span-two">Anything we should know? <span className="optional">(optional)</span><textarea name="notes" value={form.notes} onChange={change} placeholder="A delivery note, special request..." rows={3}/></label></div><p className="checkout-note">When you continue, WhatsApp opens with your order details already written. Joy's Pastry will confirm availability, delivery fee and payment arrangements with you there.</p>{error&&<p className="form-error">{error}</p>}<button className="button button-dark full"><MessageCircle size={17}/> Continue to WhatsApp <ArrowRight size={16}/></button></form><aside className="order-summary"><span className="eyebrow">IN YOUR BAG</span><h3>A very good choice.</h3>{items.map(({product,quantity})=><div className="summary-row" key={product.id}><span>{product.name} × {quantity}</span><b>{money(product.price*quantity)}</b></div>)}<div className="summary-total"><span>Subtotal</span><b>{money(subtotal)}</b></div><p>Delivery fee is not included. It will be confirmed in WhatsApp.</p></aside></div></div>;
}
