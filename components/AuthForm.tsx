"use client";
import { useState } from "react";
import { Chrome, LoaderCircle } from "lucide-react";
import { supabase, supabaseReady } from "@/lib/supabase";

export default function AuthForm() {
  const [mode,setMode]=useState<"signin"|"signup">("signin");
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [message,setMessage]=useState("");
  async function submit(e:React.FormEvent){
    e.preventDefault(); if(!supabase)return; setBusy(true);setError("");setMessage("");
    try {
      if(mode==="signup"){
        const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}});
        if(error)throw error;
        if(data.session) setMessage("Your account is ready. Welcome to Joy's!");
        else setMessage("Check your email to confirm your account, then sign in.");
      } else {
        const {error}=await supabase.auth.signInWithPassword({email,password}); if(error)throw error;
        setMessage("You're signed in. Lovely to have you back.");
      }
    } catch(err){setError(err instanceof Error?err.message:"We couldn't complete that request.");}
    finally{setBusy(false);}
  }
  async function google(){
    if(!supabase)return;setBusy(true);setError("");
    const {error}=await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${window.location.origin}/account`}});
    if(error){setError(error.message);setBusy(false);}
  }
  if(!supabaseReady)return <div className="setup-note"><b>One quick connection before sign-in.</b><p>Add your Supabase Project URL and anon/publishable key to <code>.env.local</code>. Then enable Google and Email authentication in Supabase. Guest browsing and WhatsApp ordering work without it.</p></div>;
  return <div className="auth-card"><div className="auth-tabs"><button className={mode==="signin"?"active":""} onClick={()=>setMode("signin")}>Sign in</button><button className={mode==="signup"?"active":""} onClick={()=>setMode("signup")}>Create account</button></div>
    <form onSubmit={submit} className="auth-form">{mode==="signup"&&<label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="What should we call you?"/></label>}<label>Email address<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Password<input type="password" required minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></label><button className="button button-dark full" disabled={busy}>{busy?<LoaderCircle className="spin" size={17}/>:null}{mode==="signin"?"Sign in":"Create my account"}</button></form>
    <div className="auth-divider"><span/>or continue with<span/></div><button className="button button-outline full" onClick={google} disabled={busy}><Chrome size={17}/> Continue with Google</button>{error&&<p className="form-error">{error}</p>}{message&&<p className="form-success">{message}</p>}
  </div>;
}
