"use client";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const scenes=[
 {eyebrow:"THE FIRST CRAVING",title:"It starts with",italic:"a little want.",copy:"A golden bite catches your eye. You slow down. The good stuff has a way of finding you.",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1100&q=85",alt:"Golden flaky croissants"},
 {eyebrow:"MADE TO BE SHARED",title:"Then comes",italic:"the together.",copy:"A table fills up. Small chops make their rounds. Someone reaches for one more. Nobody minds.",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85",alt:"A colourful spread of food"},
 {eyebrow:"A REASON TO CELEBRATE",title:"A moment becomes",italic:"a memory.",copy:"Candles, cake, familiar faces. The kind of moment you wish you could keep a little longer.",image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85",alt:"A celebration cake"},
 {eyebrow:"THE JOY COMES HOME",title:"And joy follows",italic:"you home.",copy:"Choose your favourites. We'll wrap them with care and meet you in WhatsApp to make it happen.",image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1100&q=85",alt:"Freshly baked cookies"}
];

export default function ProductJourney(){
 const section=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 const {scrollYProgress}=useScroll({target:section,offset:["start start","end end"]});
 const y=useTransform(scrollYProgress,[0,.33,.66,1],["0%","-18%","10%","-5%"]);
 const x=useTransform(scrollYProgress,[0,.33,.66,1],["8%","-5%","7%","-2%"]);
 const rotate=useTransform(scrollYProgress,[0,.33,.66,1],[-7,5,-4,2]);
 const scale=useTransform(scrollYProgress,[0,.2,.5,.8,1],[.82,1.05,.92,1.08,1]);
 const progress=useTransform(scrollYProgress,[0,1],["0%","100%"]);
 useMotionValueEvent(scrollYProgress,"change",v=>setActive(Math.min(3,Math.floor(v*4))));
 const scene=scenes[active];
 return <section className="journey-section" ref={section} aria-label="The Joy's Pastry story">
  <div className="journey-sticky">
   <div className="journey-topline"><span>THE JOY'S JOURNEY</span><span>SCROLL TO MOVE THE MOMENT <ArrowDown size={12}/></span></div>
   <div className="journey-stage">
    <motion.div className="journey-copy" key={active} initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.55,ease:[.22,1,.36,1]}}>
      <span className="eyebrow">{scene.eyebrow}</span><h2>{scene.title}<br/><i>{scene.italic}</i></h2><p>{scene.copy}</p>{active===3&&<Link href="/menu" className="button button-dark">Explore the menu <ArrowUpRight size={16}/></Link>}
    </motion.div>
    <motion.div className="journey-object" style={{y,x,rotate,scale}}>
      <div className="journey-object-image" key={scene.image}><Image src={scene.image} alt={scene.alt} fill sizes="(max-width: 700px) 78vw, 42vw" priority={active===0}/></div>
      <span className="journey-orbit orbit-a"/><span className="journey-orbit orbit-b"/>
      <span className="journey-object-label">A LITTLE MORE JOY ✳</span>
    </motion.div>
    <div className="journey-counter"><span>0{active+1}</span><div className="journey-progress"><motion.i style={{width:progress}}/></div><span>04</span></div>
   </div>
   <div className="journey-bottomline"><span>GOOD THINGS TAKE A LITTLE TIME</span><span>KEEP GOING ↓</span></div>
  </div>
 </section>;
}
