export type Subject = "Shiva" | "Krishna" | "Ganesha" | "Dance" | "Devi";

export type Work = {
  slug: string;
  title: string;
  subject: Subject;
  year: string;
  size: string;
  story: string;
  /** Alt text for the painting photograph. Describes the image, not the story. */
  alt: string;
  /** Marks the handful of pieces that carry the home page. */
  featured?: boolean;
};

// The collection. To add a piece: drop a photo in /public/art and add a row here.
// TODO(sweta): titles, years, and sizes below are placeholders pending her list.
export const works: Work[] = [
  {
    slug: "ganesha-beginnings",
    title: "Beginnings",
    subject: "Ganesha",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Ganesha at the threshold. Wisdom, hope, and the courage to begin again, painted in the blue of deep water.",
    alt: "Acrylic painting of Ganesha in cobalt blue with an ornate crimson and gold crown, against a field of magenta and turquoise brushwork",
    featured: true,
  },
  {
    slug: "nataraja",
    title: "The Cosmic Dance",
    subject: "Shiva",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Shiva within the ring of flame, where destruction and creation become one motion. Silhouette against fire.",
    alt: "Acrylic painting of Nataraja as a black silhouette dancing inside a ring of fire, on a burning red and orange ground",
    featured: true,
  },
  {
    slug: "krishna-flute",
    title: "The Flute",
    subject: "Krishna",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Love, tenderness, and joy carried on a single note. Krishna mid-step, the world dissolving into colour behind him.",
    alt: "Acrylic painting of Krishna playing the flute in a dancing pose, wearing magenta and saffron, against a vivid multicoloured sky",
    featured: true,
  },
  {
    slug: "ardhanarishvara",
    title: "Two Halves, One Breath",
    subject: "Shiva",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Ardhanarishvara: the divine as both halves at once, dancing. Strength and grace in a single body.",
    alt: "Acrylic painting of Ardhanarishvara, half Shiva and half Parvati, dancing in scarlet and blue against a violet and gold background",
    featured: true,
  },
  {
    slug: "ganesha-cubist",
    title: "Facets",
    subject: "Ganesha",
    year: "2024",
    size: "24 × 24 in",
    story:
      "Ganesha broken into planes of colour, the way light breaks when it passes through something sacred.",
    alt: "Acrylic painting of Ganesha rendered in bold angular planes of orange, red, and green with thick palette-knife texture",
    featured: true,
  },
  {
    slug: "shiva-parvati",
    title: "Refuge",
    subject: "Shiva",
    year: "2024",
    size: "18 × 24 in",
    story:
      "Parvati resting against Shiva. The sacred at its most tender, and its most human.",
    alt: "Acrylic painting of Shiva in blue holding Parvati in a saffron and marigold sari, both seated against a pale sky",
  },
  {
    slug: "shiva-trident",
    title: "The Long Walk",
    subject: "Shiva",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Shiva walking away with the trident, into the light. Strength that does not need to look back.",
    alt: "Acrylic painting of Shiva seen from behind carrying a trident, walking into a blazing white and orange sun",
  },
  {
    slug: "radha-krishna",
    title: "Beloved",
    subject: "Krishna",
    year: "2024",
    size: "16 × 20 in",
    story:
      "Devotion made intimate. Radha and Krishna, peacock feathers, and a scatter of red blossoms.",
    alt: "Acrylic painting of Radha and Krishna face to face in an embrace, with peacock feathers and scarlet flowers around them",
    featured: true,
  },
  {
    slug: "krishna-face",
    title: "The First Note",
    subject: "Krishna",
    year: "2025",
    size: "16 × 20 in",
    story:
      "Eyes closed, flute raised. The moment before the sound, held in blue and flame.",
    alt: "Close-up acrylic portrait of Krishna with eyes closed playing a flute, face painted in blue, gold, and orange planes",
  },
  {
    slug: "beloved-dance",
    title: "Holi",
    subject: "Krishna",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Radha and Krishna dancing through a burst of colour. Joy with nothing held back.",
    alt: "Acrylic painting of Radha and Krishna dancing together in swirling saffron and crimson robes against an electric blue ground",
  },
  {
    slug: "radha-flute",
    title: "Twilight",
    subject: "Krishna",
    year: "2024",
    size: "16 × 20 in",
    story:
      "Radha with the flute, and Krishna above her in shadow. Longing painted entirely in violet.",
    alt: "Acrylic painting of Radha playing a flute in a flowing violet and rose lehenga, with a silhouette of Krishna above her",
  },
  {
    slug: "durga",
    title: "The Protector",
    subject: "Devi",
    year: "2024",
    size: "18 × 24 in",
    story:
      "Durga, serene and unshakeable. Grace and strength are the same thing here.",
    alt: "Acrylic painting of Durga with a golden crown, holding a trident and sword, against a dark ground flecked with turquoise",
    featured: true,
  },
  {
    slug: "dancer",
    title: "In Motion",
    subject: "Dance",
    year: "2025",
    size: "16 × 20 in",
    story:
      "A dancer at full extension, the sari trailing fire. Devotion expressed as movement.",
    alt: "Acrylic painting of a classical Indian dancer mid-pose in a flame-orange sari against a smoky grey background",
  },
  {
    slug: "shiva-nandi-dusk",
    title: "The Waiting",
    subject: "Shiva",
    year: "2024",
    size: "18 × 24 in",
    story:
      "Nandi facing the silhouette of Shiva at dusk, lotuses on the ground between them.",
    alt: "Acrylic painting of a golden bull facing a dark silhouette of Shiva with a trident, lotus flowers scattered below",
  },
  {
    slug: "nandi",
    title: "Nandi",
    subject: "Shiva",
    year: "2024",
    size: "16 × 20 in",
    story:
      "The bull who waits at every Shiva temple, painted with his horns lit like flame.",
    alt: "Acrylic painting of Nandi the white bull with scarlet horns and a blue-marked forehead, beside hanging brass temple bells",
  },
  {
    slug: "ganesha-rainbow",
    title: "Full Spectrum",
    subject: "Ganesha",
    year: "2025",
    size: "18 × 24 in",
    story:
      "Every colour she had, all at once. Ganesha as pure celebration.",
    alt: "Acrylic painting of Ganesha seated in lotus position, painted in overlapping blocks of every colour with a lotus in one hand",
  },
];

export const featured = works.filter((w) => w.featured);

export const SUBJECT_FILTERS: (Subject | "All")[] = [
  "All",
  "Shiva",
  "Krishna",
  "Ganesha",
  "Devi",
  "Dance",
];

export const ROMAN = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII",
  "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI",
];

/** The three energies, used by the home page triad. */
export const ENERGIES = [
  {
    name: "Shiva",
    traits: ["Strength", "Silence", "Transformation"],
    slug: "shiva-trident",
    subject: "Shiva" as const,
  },
  {
    name: "Krishna",
    traits: ["Love", "Tenderness", "Joy"],
    slug: "krishna-face",
    subject: "Krishna" as const,
  },
  {
    name: "Ganesha",
    traits: ["Wisdom", "Hope", "New beginnings"],
    slug: "ganesha-cubist",
    subject: "Ganesha" as const,
  },
];
