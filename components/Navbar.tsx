"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, UserRound, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const links = [["The menu", "/menu"], ["Our story", "/#story"], ["Find your joy", "/#contact"]];
  return <header className="site-header"><nav className="nav-wrap">
    <Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">J</span><span>joy&apos;s <i>pastry</i><small>MADE WITH A LITTLE MORE JOY</small></span></Link>
    <div className="nav-links">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
    <div className="nav-actions"><Link href="/account" aria-label="Your account" className="icon-link"><UserRound size={18}/></Link><Link href="/cart" aria-label="Shopping bag" className="bag-link"><ShoppingBag size={18}/><span>Bag ({count})</span></Link><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></div>
  </nav>{open && <div className="mobile-menu">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16}/></Link>)}<Link href="/account" onClick={() => setOpen(false)}>My account</Link></div>}</header>;
}
