"use client";
import { useEffect,useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { LogOut, Package } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import { money } from "@/lib/products";
import { supabase,supabaseReady } from "@/lib/supabase";

type Order={id:number;reference:string;subtotal:number;status:string;created_at:string};
export default function AccountPage(){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [orders,setOrders]=useState<Order[]>([]);
 useEffect(()=>{
   if(!supabase){setLoading(false);return;}
   supabase.auth.getUser().then(({data})=>{setUser(data.user);setLoading(false);});
   const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setUser(session?.user??null);});
   return ()=>subscription.unsubscribe();
 },[]);
 useEffect(()=>{if(!user||!supabase)return;supabase.from("orders").select("id,reference,subtotal,status,created_at").order("created_at",{ascending:false}).then(({data})=>setOrders((data||[]) as Order[]));},[user]);
 async function logout(){await supabase?.auth.signOut();setUser(null);setOrders([]);}
 return <div className="page-shell account-page"><div className="page-intro compact"><span className="eyebrow">YOUR JOY, KEPT CLOSE</span><h1>Your little <i>corner.</i></h1><p>Sign in to make your next visit feel like coming back to a favourite.</p></div>{loading?<p>Loading your account...</p>:user?<div className="account-panel"><div className="account-welcome"><div className="avatar">{(user.user_metadata?.full_name||user.email||"J")[0].toUpperCase()}</div><div><span className="eyebrow">WELCOME BACK</span><h2>{user.user_metadata?.full_name||user.email}</h2><p>{user.email}</p></div><button className="text-link" onClick={logout}><LogOut size={15}/> Sign out</button></div><div className="account-orders"><h3><Package size={18}/> Your WhatsApp orders</h3>{orders.length?orders.map(o=><div className="summary-row" key={o.id}><span>{o.reference} · {o.status.replaceAll("_"," ")}</span><b>{money(o.subtotal)}</b></div>):<div className="empty-orders"><p>No saved orders yet. When you order while signed in, your order summary will appear here.</p><Link href="/menu" className="text-link">Browse the menu ↗</Link></div>}</div></div>:<AuthForm/>}<div className="guest-note">Just browsing? <Link href="/menu">You can explore the whole menu without an account.</Link>{!supabaseReady&&" Account features become active once your Supabase keys are added."}</div></div>;
}
