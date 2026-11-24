"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import ProductJourney from "@/components/ProductJourney";

export default function Home() {
  return (
    <>
      <section className="hero">
        <video className="background-video" autoPlay muted loop playsInline>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-grain" />
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={13} /> FRESH FROM OUR LITTLE OVEN
          </span>
          <h1>
            Good things
            <br />
            come <i>in layers.</i>
          </h1>
          <p>
            Beautifully baked treats, golden little bites and cakes made to turn
            ordinary days into something worth remembering.
          </p>
          <div className="hero-buttons">
            <Link href="/menu" className="button button-dark">
              Explore the menu <ArrowUpRight size={17} />
            </Link>
            <a href="#the-journey" className="text-link">
              Take the scenic route <span>↓</span>
            </a>
          </div>
          <div className="hero-aside">
            BAKED WITH HEART
            <br />
            SERVED WITH JOY <span>✳</span>
          </div>
        </div>
        <motion.div
          className="hero-art"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* <div className="hero-photo">
            <Image
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1500&q=90"
              alt="Fresh golden croissants"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" /> */}
          <div className="hero-sticker">
            A little
            <br />
            <i>more joy</i>
            <span>✳</span>
          </div>
          <span className="hero-caption">01 / THE ART OF A GOOD BITE</span>
        </motion.div>
        <a href="#the-journey" className="scroll-cue">
          <span>SCROLL TO BEGIN</span>
          <span>↓</span>
        </a>
      </section>
      <div className="ticker">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              BAKED WITH LOVE <b>✳</b> MADE FOR SHARING <b>✳</b> A LITTLE MORE
              JOY <b>✳</b>
            </span>
          ))}
        </div>
      </div>
      <div id="the-journey">
        <ProductJourney />
      </div>
      <section className="section featured-section" id="featured">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">THE CROWD PLEASERS</span>
            <h2>
              A few very good
              <br />
              <i>reasons to smile.</i>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/menu" className="text-link">
              See everything <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .map((product, i) => (
              <Reveal key={product.id} delay={i * 0.1}>
                <ProductCard product={product} index={i} />
              </Reveal>
            ))}
        </div>
      </section>
      <section className="story-section" id="story">
        <div className="story-image">
          <Image
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1100&q=85"
            alt="Freshly decorated cupcakes"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span className="image-note">
            A little sweetness goes a long way.
          </span>
        </div>
        <div className="story-copy">
          <Reveal>
            <span className="eyebrow">NOT JUST A BAKERY</span>
            <h2>
              Made for the
              <br />
              <i>in-between</i>
              <br />
              moments, too.
            </h2>
            <p>
              Not every celebration needs a reason. Sometimes it's the end of a
              long week, a friend stopping by, or simply a Tuesday that could
              use a little sparkle.
            </p>
            <p>
              At Joy's, we believe the good stuff should be shared. So we make
              the kind of treats that bring people a little closer, one lovely
              bite at a time.
            </p>
            <Link href="/menu" className="button button-outline">
              Find your favourite <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <span className="story-number">02</span>
      </section>
      <section className="quote-section">
        <span className="eyebrow">A NOTE FROM OUR OVEN</span>
        <p>
          “There is always room
          <br />
          for <i>one more</i> good thing.”
        </p>
        <span className="quote-heart">♡</span>
      </section>
      <section className="cta-section">
        <div>
          <span className="eyebrow">YOUR NEXT HAPPY MOMENT</span>
          <h2>
            Something lovely
            <br />
            is <i>on the menu.</i>
          </h2>
          <p>Pick your favourites. We'll take it from here.</p>
          <Link href="/menu" className="button button-dark">
            Order something lovely <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="cta-image">
          <Image
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
            alt="Beautiful celebration cake"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>
    </>
  );
}
