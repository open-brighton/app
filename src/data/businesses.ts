export type Business = {
  id: string;
  slug: string;
  name: string;
  category: string;
  address: string;
  description: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
  accentColor: string;
};

export const BUSINESSES: Business[] = [
  {
    id: "1",
    slug: "flour-pot-bakery",
    name: "The Flour Pot Bakery",
    category: "Bakery · Café",
    address: "40 Sydney St, North Laine",
    description:
      "A beloved local bakery known for artisan sourdough, pastries, and specialty coffees in the heart of North Laine.",
    coordinates: [-77.583, 43.135],
    accentColor: "#C8835A",
  },
  {
    id: "2",
    slug: "choccywoccydoodah",
    name: "Choccywoccydoodah",
    category: "Chocolatier · Gift Shop",
    address: "24 Duke St, Brighton",
    description:
      "Famous for spectacular chocolate sculptures and bespoke cakes, this chocolatier is a must-visit for sweet lovers.",
    coordinates: [-77.589, 43.131],
    accentColor: "#7B4226",
  },
  {
    id: "3",
    slug: "snoopers-paradise",
    name: "Snoopers Paradise",
    category: "Vintage · Antiques",
    address: "7-8 Kensington Gardens",
    description:
      "A treasure trove of vintage clothing, antiques, collectibles, and curiosities spread across multiple floors.",
    coordinates: [-77.580, 43.132],
    accentColor: "#6A5ACD",
  },
  {
    id: "4",
    slug: "infinity-foods",
    name: "Infinity Foods",
    category: "Health Food · Organic",
    address: "25 North Rd, Brighton",
    description:
      "Brighton's original wholefood co-operative, stocking organic produce, natural supplements, and eco-friendly products since 1971.",
    coordinates: [-77.587, 43.129],
    accentColor: "#4A8C49",
  },
  {
    id: "5",
    slug: "brighton-fishing-museum",
    name: "Brighton Fishing Museum",
    category: "Museum · Heritage",
    address: "201 King's Rd Arches",
    description:
      "Celebrating Brighton's rich fishing heritage with historic boats, photographs, and stories of the local fishing community.",
    coordinates: [-77.582, 43.128],
    accentColor: "#2E6DA4",
  },
];
