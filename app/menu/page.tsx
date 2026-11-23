"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
export default function MenuPage() {
  const [category, setCategory] = useState("All"); const [search, setSearch] = useState("");
  const filtered = useMemo(() => products.filter(p => (category === "All" || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase())), [category, search]);
  return <div className="page-shell menu-page"><div className="page-intro"><span className="eyebrow">THE GOOD STUFF</span><h1>Pick your <i>pleasure.</i></h1><p>Little bites, big celebrations and everything delicious in between.</p></div><div className="menu-toolbar"><div className="category-pills">{categories.map(c=><button key={c} className={category===c?"selected":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a favourite..."/></label></div><div className="menu-count"><span><SlidersHorizontal size={14}/> {filtered.length} delicious finds</span><span>Made fresh, just for you</span></div>{filtered.length ? <div className="product-grid menu-grid">{filtered.map((p,i)=><Reveal key={p.id} delay={(i%4)*.05}><ProductCard product={p} index={i}/></Reveal>)}</div> : <div className="empty-state"><span>♡</span><h3>No crumbs found.</h3><p>Try another search or choose a different category.</p><button className="text-link" onClick={()=>{setSearch("");setCategory("All")}}>Show me everything</button></div>}</div>;
}
