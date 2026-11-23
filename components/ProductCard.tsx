"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { money } from "@/lib/products";
import { useCart } from "@/context/CartContext";
export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return <article className="product-card" style={{ animationDelay: `${index * 70}ms` }}>
    <Link href={`/products/${product.id}`} className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 25vw" />{product.tag && <span className="product-tag">{product.tag}</span>}<span className="quick-view">Meet the treat ↗</span></Link>
    <div className="product-meta"><div><span className="product-category">{product.category}</span><Link href={`/products/${product.id}`}><h3>{product.name}</h3></Link><span className="product-price">{money(product.price)}</span></div><button className="add-button" onClick={() => add(product)} aria-label={`Add ${product.name} to bag`}><Plus size={19}/></button></div>
  </article>;
}
