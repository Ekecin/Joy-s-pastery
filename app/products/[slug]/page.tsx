"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { getProduct, money, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
export default function ProductPage() {
  const params = useParams<{slug:string}>(); const product = getProduct(params.slug); const [quantity,setQuantity] = useState(1); const {add} = useCart();
  if (!product) notFound();
  return <div className="page-shell detail-page"><Link href="/menu" className="back-link"><ArrowLeft size={15}/> Back to the menu</Link><div className="detail-layout"><div className="detail-image"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 55vw"/></div><div className="detail-copy"><span className="eyebrow">{product.category.toUpperCase()}</span><h1>{product.name}<i>.</i></h1><div className="detail-price">{money(product.price)}</div><p>{product.description}</p><div className="detail-rule"/><span className="eyebrow">HOW MANY WOULD YOU LIKE?</span><div className="quantity-control"><button onClick={()=>setQuantity(Math.max(1,quantity-1))} aria-label="Decrease quantity"><Minus size={16}/></button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)} aria-label="Increase quantity"><Plus size={16}/></button></div><button className="button button-dark add-wide" onClick={()=>add(product,quantity)}><ShoppingBag size={17}/> Add to bag · {money(product.price*quantity)}</button><p className="detail-footnote">Freshly prepared with care. For custom sizes or special requests, contact us before ordering.</p></div></div><section className="related-section"><span className="eyebrow">A LITTLE SOMETHING ELSE</span><h2>More to <i>love.</i></h2><div className="product-grid">{products.filter(p=>p.id!==product.id).slice(0,3).map(p=><ProductCard key={p.id} product={p}/>)}</div></section></div>;
}
