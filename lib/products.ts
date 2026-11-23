export type Product = {
  id: string; name: string; category: string; description: string;
  price: number; image: string; tag?: string; featured?: boolean;
};

export const products: Product[] = [
  { id: "classic-chin-chin", name: "Classic Chin Chin", category: "Small Chops", description: "Golden, crunchy little bites with a buttery finish. The kind that disappears before you notice.", price: 3500, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484b0?auto=format&fit=crop&w=1000&q=85", tag: "Bestseller", featured: true },
  { id: "party-small-chops", name: "The Party Mix", category: "Small Chops", description: "A joyful platter of samosas, spring rolls, puff-puff and golden bites made for sharing.", price: 12000, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85", tag: "Crowd favourite", featured: true },
  { id: "velvet-cake", name: "Red Velvet Cake", category: "Cakes", description: "Soft cocoa-red layers, silky cream cheese frosting and a little celebration in every slice.", price: 18000, image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1000&q=85", tag: "Signature", featured: true },
  { id: "butter-croissant", name: "Butter Croissants", category: "Pastries", description: "Flaky, golden layers with a delicate buttery centre. Best enjoyed fresh.", price: 2500, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85", featured: true },
  { id: "chocolate-cupcakes", name: "Chocolate Cupcakes", category: "Cakes", description: "Deep chocolate sponge topped with a generous swirl of chocolate buttercream.", price: 8000, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=85" },
  { id: "sausage-rolls", name: "Golden Sausage Rolls", category: "Pastries", description: "Tender, savoury filling wrapped in crisp, golden pastry.", price: 5000, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484b0?auto=format&fit=crop&w=1000&q=85" },
  { id: "doughnuts", name: "Sugar-glazed Doughnuts", category: "Pastries", description: "Pillowy-soft doughnuts with a delicate sugar glaze. Made for the sweet tooth.", price: 6000, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85" },
  { id: "celebration-cake", name: "Celebration Cake", category: "Cakes", description: "A beautifully finished centrepiece for birthdays, milestones and just-because days.", price: 35000, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85", tag: "Made to order" },
  { id: "puff-puff", name: "Soft Puff-Puff", category: "Small Chops", description: "Light, fluffy and gently sweet. A familiar favourite with a Joy's touch.", price: 4000, image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=1000&q=85" },
  { id: "cookies", name: "Chunky Choc Cookies", category: "Treats", description: "Crisp edges, soft centres and pockets of rich chocolate in every bite.", price: 5500, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85" },
  { id: "meat-pies", name: "Buttery Meat Pies", category: "Pastries", description: "Golden pastry with a savoury, generously filled centre.", price: 7000, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=85" },
  { id: "brownies", name: "Fudge Brownies", category: "Treats", description: "Dense, fudgy chocolate squares with that perfect crackly top.", price: 6500, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85" }
];

export const categories = ["All", "Small Chops", "Cakes", "Pastries", "Treats"];
export const money = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
export const getProduct = (id: string) => products.find((product) => product.id === id);
