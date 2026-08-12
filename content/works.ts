export type Subject = "Shiva" | "Krishna" | "Ganesha" | "Dance" | "Devi";

export type Work = {
  slug: string;
  title: string;
  subject: Subject;
  year: string;
  size: string;
  story: string;
};

// The collection. To add a piece: drop a photo in /public/art and add a row here.
export const works: Work[] = [
  { slug: "ganesha", title: "Beginnings", subject: "Ganesha", year: "2025", size: "18 × 24 in",
    story: "Ganesha at the threshold: wisdom, hope, and the courage to begin again." },
  { slug: "shiva", title: "Cosmic Silence", subject: "Shiva", year: "2025", size: "18 × 24 in",
    story: "Strength, silence, and transformation, held in a single still breath." },
  { slug: "krishna", title: "The Flute", subject: "Krishna", year: "2024", size: "16 × 20 in",
    story: "Love, tenderness, and joy carried on a single note of peacock blue." },
  { slug: "dancer", title: "In Motion", subject: "Dance", year: "2025", size: "12 × 12 in",
    story: "The grace of Bharatanatyam, caught mid turn." },
  { slug: "radhakrishna", title: "Beloved", subject: "Krishna", year: "2024", size: "16 × 20 in",
    story: "Devotion made intimate, in twilight gold and rose." },
  { slug: "nataraja", title: "The Cosmic Dance", subject: "Shiva", year: "2025", size: "18 × 24 in",
    story: "Shiva within the ring of flame, where destruction and creation become one motion." },
  { slug: "ganesha2", title: "Lotus Hours", subject: "Ganesha", year: "2024", size: "12 × 12 in",
    story: "A quieter Ganesha at rest among lotus blooms, in rose and powder blue." },
  { slug: "krishna2", title: "Govinda", subject: "Krishna", year: "2025", size: "16 × 20 in",
    story: "Krishna among the herds at dusk, amber light and an unhurried joy." },
  { slug: "kathak", title: "Whirl", subject: "Dance", year: "2024", size: "18 × 24 in",
    story: "A Kathak dancer at the height of her spin, white and gold in motion." },
  { slug: "odissi", title: "Tribhangi", subject: "Dance", year: "2025", size: "16 × 20 in",
    story: "The three bends of Odissi, fluid as water in teal and gold." },
  { slug: "durga", title: "The Protector", subject: "Devi", year: "2024", size: "18 × 24 in",
    story: "Durga, serene and unshakeable: grace and strength in crimson and gold." },
  { slug: "saraswati", title: "The First Note", subject: "Devi", year: "2025", size: "16 × 20 in",
    story: "Saraswati and her veena, where wisdom takes the shape of music." },
];

export const SUBJECT_FILTERS: (Subject | "All")[] = ["All", "Shiva", "Krishna", "Ganesha", "Dance", "Devi"];
export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
