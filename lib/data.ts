// =============================================================================
// Central content + data for the Salsita with Cris portfolio.
// Replace copy, prices, social handles, and availability here in one place.
// =============================================================================

export type Service = {
  index: string;
  title: string;
  description: string;
  price: string;
  /** Emotional benefit line — from the "Service cards content" brief section. */
  benefit: string;
  /** Practical details, e.g. "Cuban + LA style · Weekly classes · Beginner to advanced". */
  details: string;
  cta: { label: string; href: string };
  /** Phosphor icon name string, e.g. "MusicNotes". */
  icon: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  descriptor: string;
  /** Short badge for the class type, e.g. "Partnerwork", "Caleña", "Private lesson". */
  classBadge: string;
  /** Accent color used for the initials avatar. */
  accent: "red" | "gold" | "green" | "coral";
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "instagram" | "youtube" | "tiktok" | "email";
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};

// Days of the month that are fully booked (no slots available).
export type Availability = {
  // ISO date string "YYYY-MM-DD" -> available time slots.
  slots: Record<string, string[]>;
  // ISO date strings that are fully booked.
  booked: string[];
};

export type HeroContent = {
  badge: string;
  headline: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  reassuranceBadges: string[];
};

export type PhilosophyCard = {
  title: string;
  line: string;
};

export type ChoosePathCard = {
  id: string;
  prompt: string;
  target: string;
  description: string;
  href: string;
  accent: "red" | "gold" | "green" | "coral";
  /** Phosphor icon name string. */
  icon: string;
};

export type ScheduleItem = {
  day: string;
  className: string;
  level: string;
  time: string;
  location: string;
  bestFor: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type GalleryItem = {
  label: string;
  alt: string;
  src: string;
  aspect: "portrait" | "landscape";
  accent: "red" | "gold" | "green" | "coral";
};

export type Reel = {
  title: string;
  caption: string;
  thumbnail: string;
};

export type SectionCopy = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  body?: string[];
  reassurance?: string;
};

// -----------------------------------------------------------------------------
// Brand
// -----------------------------------------------------------------------------

export const brand = {
  instructorName: "Cristhian Andrés Garzón",
  publicName: "Cristhian Garzón",
  brandName: "Salsita with Cris",
  location: "Budapest, Hungary",
};

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Classes", href: "#services" },
  { label: "Schedule", href: "#schedule" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

// -----------------------------------------------------------------------------
// Style strip marquee keywords
// -----------------------------------------------------------------------------

export const styleKeywords = [
  "Salsa",
  "Salsa Caleña",
  "Partnerwork",
  "Social Dancing",
  "Budapest",
  "Colombian Footwork",
  "Private Lessons",
  "Workshops",
  "Wedding Dance",
  "Group Classes",
  "Salsita Family",
  "Con sabor",
  "Dance with confidence",
];

// -----------------------------------------------------------------------------
// About stats
// -----------------------------------------------------------------------------

export const stats: Stat[] = [
  { label: "Dancers trained", value: 300, suffix: "+" },
  { label: "Salsita Family members", value: 174, suffix: "" },
  { label: "Years sharing salsa around the world", value: 8, suffix: "+" },
  { label: "Styles taught", value: 3, suffix: "" },
];

// -----------------------------------------------------------------------------
// Hero
// -----------------------------------------------------------------------------

export const hero: HeroContent = {
  badge: "Colombian Salsa · Partnerwork · Budapest",
  headline: "Salsa with sabor, técnica y magia.",
  subtitle:
    "Colombian salsa, partnerwork, and social dance classes in Budapest for people who want to move with confidence, rhythm, and joy.",
  ctaPrimary: { label: "Book a Class", href: "#booking" },
  ctaSecondary: { label: "Explore Classes", href: "#services" },
  reassuranceBadges: [
    "No partner needed",
    "Beginner friendly",
    "Classes in English",
    "Colombian energy",
  ],
};

// -----------------------------------------------------------------------------
// Teaching philosophy
// -----------------------------------------------------------------------------

export const philosophyCards: PhilosophyCard[] = [
  {
    title: "Technique without stiffness",
    line: "Clean fundamentals that stay loose, musical, and fun to dance.",
  },
  {
    title: "Connection before complexity",
    line: "Leading and following come first — combinations come later.",
  },
  {
    title: "Social dancing first",
    line: "Everything we practice is built to work on a real dance floor.",
  },
  {
    title: "Confidence through repetition",
    line: "Steady practice, warm feedback, and room to make mistakes.",
  },
  {
    title: "Community over perfection",
    line: "You're here to enjoy the dance, not to chase flawless technique.",
  },
];

// -----------------------------------------------------------------------------
// Choose your path
// -----------------------------------------------------------------------------

export const choosePath: ChoosePathCard[] = [
  {
    id: "new",
    prompt: "I'm completely new",
    target: "Beginner Partnerwork",
    description:
      "Start with the fundamentals of leading, following, and moving to the music — no experience or partner required.",
    href: "#schedule",
    accent: "red",
    icon: "Sparkle",
  },
  {
    id: "footwork",
    prompt: "I want fast footwork",
    target: "Salsa Caleña",
    description:
      "Build speed, coordination, and pure Colombian sabor with fast-paced Salsa Caleña footwork.",
    href: "#schedule",
    accent: "gold",
    icon: "Lightning",
  },
  {
    id: "confidence",
    prompt: "I want confidence at socials",
    target: "Private Lessons",
    description:
      "Get personalized feedback to clean up your basics and feel ready for real social dancing.",
    href: "#booking",
    accent: "green",
    icon: "HeartStraight",
  },
  {
    id: "event",
    prompt: "I need a special event or wedding dance",
    target: "Workshops, Shows & Wedding Dance",
    description:
      "Bring Colombian salsa energy to your wedding, party, or company event with a choreography made for you.",
    href: "#contact",
    accent: "coral",
    icon: "Confetti",
  },
];

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

export const services: Service[] = [
  {
    index: "01",
    title: "Group Salsa Classes",
    description:
      "Weekly partnerwork classes in Budapest, blending Cuban and LA style so dancers can feel comfortable, musical, and connected at socials.",
    price: "From 4,000 HUF",
    benefit:
      "Learn partnerwork in a warm, international community and build confidence for real social dancing.",
    details: "Cuban + LA style · Weekly classes · Beginner to advanced",
    cta: { label: "See schedule", href: "#schedule" },
    icon: "MusicNotes",
  },
  {
    index: "02",
    title: "Colombian Salsa Footwork",
    description:
      "Salsa Caleña classes focused on fast footwork, rhythm, coordination, musicality, and pure Colombian sabor.",
    price: "From 4,000 HUF",
    benefit:
      "Fast, joyful Salsa Caleña footwork to improve rhythm, speed, coordination, and flavor.",
    details: "Beginner and intermediate footwork · Colombian style",
    cta: { label: "Explore Caleña", href: "#schedule" },
    icon: "Lightning",
  },
  {
    index: "03",
    title: "Private Lessons",
    description:
      "One-on-one or couple sessions tailored to your level, goals, confidence, musicality, and technique.",
    price: "From 14,000 HUF",
    benefit:
      "Personalized feedback to improve faster, clean your basics, and feel more confident on the dance floor.",
    details: "Solo or couple · Technique · Musicality · Confidence",
    cta: { label: "Book private lesson", href: "#booking" },
    icon: "UserFocus",
  },
  {
    index: "04",
    title: "Workshops and Events",
    description:
      "High-energy salsa workshops, community events, company activities, bachelorette classes, and cultural dance experiences.",
    price: "On request",
    benefit:
      "Bring Colombian salsa energy to festivals, company events, parties, and special community moments.",
    details: "Workshops · Animations · Social dance experiences",
    cta: { label: "Plan an event", href: "#contact" },
    icon: "Confetti",
  },
  {
    index: "05",
    title: "Wedding Dance and Shows",
    description:
      "Personal choreography, performance moments, and dance experiences for celebrations that deserve something unforgettable.",
    price: "On request",
    benefit:
      "Create a meaningful, joyful, and memorable dance moment for your wedding or special occasion.",
    details: "Wedding choreographies · Shows · Private coaching",
    cta: { label: "Ask for details", href: "#contact" },
    icon: "HeartStraight",
  },
];

// -----------------------------------------------------------------------------
// Weekly schedule
// -----------------------------------------------------------------------------

export const weeklySchedule: ScheduleItem[] = [
  {
    day: "Monday",
    className: "A1 Partnerwork",
    level: "Beginner",
    time: "20:00–21:30",
    location: "BackStage Studio",
    bestFor: "Best for complete beginners and dancers building strong basics",
    href: "#booking",
  },
  {
    day: "Tuesday",
    className: "A2 Partnerwork",
    level: "Advanced beginner",
    time: "20:00–21:30",
    location: "BackStage Studio",
    bestFor: "Best for dancers who know the basics and want smoother social dancing",
    href: "#booking",
  },
  {
    day: "Wednesday",
    className: "Salsa Fusion",
    level: "All levels",
    time: "20:00–21:00",
    location: "",
    bestFor: "Best for body movement, solo confidence, and musical expression",
    href: "#booking",
  },
  {
    day: "Thursday",
    className: "B1 / B2 Partnerwork",
    level: "Intermediate / Advanced",
    time: "",
    location: "BackStage Studio",
    bestFor:
      "Best for intermediate and advanced dancers polishing technique, musicality, and combinations",
    href: "#booking",
  },
  {
    day: "Saturday",
    className: "Salsa Caleña Footwork",
    level: "Beginner to intermediate",
    time: "",
    location: "Roxy Studio",
    bestFor: "Best for Colombian footwork, speed, rhythm, and sabor",
    href: "#booking",
  },
];

// -----------------------------------------------------------------------------
// Testimonials — SAMPLE copy for layout only. Replace with real quotes later.
// -----------------------------------------------------------------------------

export const featuredTestimonial: Testimonial = {
  quote:
    "Cristhian makes salsa feel less intimidating and more alive. You leave the class with steps, but also with energy, confidence, and a feeling that you belong.",
  name: "Anna K.",
  descriptor: "Partnerwork dancer",
  classBadge: "Partnerwork",
  accent: "red",
};

export const supportingTestimonials: Testimonial[] = [
  {
    quote:
      "The Caleña class is fast, joyful, and addictive. It feels like cardio, culture, and therapy at the same time.",
    name: "Mateo R.",
    descriptor: "Colombian footwork class",
    classBadge: "Caleña",
    accent: "gold",
  },
  {
    quote:
      "What I love is the community. People come to learn salsa, but they stay because the room feels like family.",
    name: "Dóra V.",
    descriptor: "Salsita Family member",
    classBadge: "Private lesson",
    accent: "green",
  },
];

// -----------------------------------------------------------------------------
// Community gallery
// -----------------------------------------------------------------------------

export const galleryItems: GalleryItem[] = [
  {
    label: "Class night",
    alt: "Dancers practicing partnerwork during a group class",
    src: "/images/gallery/class-night.jpg",
    aspect: "landscape",
    accent: "red",
  },
  {
    label: "Caleña footwork",
    alt: "Close-up of fast Salsa Caleña footwork",
    src: "/images/gallery/calena-footwork.jpg",
    aspect: "portrait",
    accent: "gold",
  },
  {
    label: "Social vibes",
    alt: "Dancers enjoying a social dancing night",
    src: "/images/gallery/social-vibes.jpg",
    aspect: "landscape",
    accent: "coral",
  },
  {
    label: "Partnerwork flow",
    alt: "Couple connecting during a partnerwork combination",
    src: "/images/gallery/partnerwork-flow.jpg",
    aspect: "portrait",
    accent: "green",
  },
  {
    label: "Salsita Family",
    alt: "Group photo of the Salsita Family community",
    src: "/images/gallery/salsita-family.jpg",
    aspect: "landscape",
    accent: "gold",
  },
  {
    label: "Budapest nights",
    alt: "Dancers at a social event in Budapest",
    src: "/images/gallery/budapest-nights.jpg",
    aspect: "portrait",
    accent: "red",
  },
];

// -----------------------------------------------------------------------------
// Video / reels
// -----------------------------------------------------------------------------

export const reels: Reel[] = [
  {
    title: "Beginner class",
    caption: "First steps, first connection, first confidence.",
    thumbnail: "/images/reels/beginner-class.jpg",
  },
  {
    title: "Caleña footwork",
    caption: "Fast feet, pure Colombian sabor.",
    thumbnail: "/images/reels/calena-footwork.jpg",
  },
  {
    title: "Social night",
    caption: "Where the Salsita Family comes together.",
    thumbnail: "/images/reels/social-night.jpg",
  },
];

// -----------------------------------------------------------------------------
// FAQ
// -----------------------------------------------------------------------------

export const faqItems: FaqItem[] = [
  {
    question: "Do I need a partner?",
    answer:
      "No. You can come alone. In partnerwork classes we rotate partners so everyone gets to practice and meet different dancers.",
  },
  {
    question: "Is the class beginner friendly?",
    answer:
      "Yes. Every class starts from clear fundamentals, and beginners are welcome every week — you're never thrown into the deep end.",
  },
  {
    question: "What style of salsa do you teach?",
    answer:
      "We teach Cuban style, LA style, and Salsa Caleña, blending technique with real social dancing so you can use everything on the floor.",
  },
  {
    question: "What is Salsa Caleña?",
    answer:
      "Salsa Caleña is fast, footwork-driven salsa from Cali, Colombia. It's joyful, rhythmic, and a great way to sharpen speed and musicality.",
  },
  {
    question: "Can I join if I have two left feet?",
    answer:
      "Yes. That is exactly where many dancers start. The goal is not perfection, it is confidence, rhythm, and enjoying the process.",
  },
  {
    question: "Are classes in English?",
    answer: "Yes. Classes are taught in English, with Colombian sabor always included.",
  },
  {
    question: "Where are the classes?",
    answer:
      "Classes take place in Budapest, mainly at BackStage Studio and Roxy Studio — see the weekly schedule for exact days and locations.",
  },
  {
    question: "Can I book private lessons?",
    answer:
      "Yes. Private lessons are available solo or as a couple, tailored to your level, goals, and the technique you want to work on.",
  },
  {
    question: "Do you do weddings or company events?",
    answer:
      "Yes. From wedding dance choreographies to company workshops and shows, we can design an experience for your event.",
  },
];

// -----------------------------------------------------------------------------
// Section copy — per-section headings and subcopy
// -----------------------------------------------------------------------------

export const sectionCopy: Record<string, SectionCopy> = {
  about: {
    heading: "Dance first. Technique with feeling.",
    body: [
      "Born in Colombia and based in Budapest, Cristhian brings together social partnerwork, Colombian footwork, musicality, and community energy to help dancers feel confident on the dance floor.",
      "The goal is not to memorize endless combinations. The goal is to understand the music, connect with your partner, move with confidence, and enjoy the dance.",
    ],
  },
  choosePath: {
    heading: "Not sure where to begin?",
    subheading: "Choose the path that fits your rhythm right now.",
  },
  services: {
    heading: "Find your way into the rhythm.",
  },
  schedule: {
    heading: "Weekly classes in Budapest",
    subheading: "Find the level, style, and rhythm that fits you.",
  },
  booking: {
    heading: "Book your next dance.",
    subheading: "Choose a day and I'll help you find the right class for your level.",
    reassurance: "Not sure which class fits you? Send me a message and I'll guide you.",
  },
  testimonials: {
    heading: "People come for salsa. They stay for the family.",
  },
  gallery: {
    heading: "The Salsita Family in motion",
    subheading:
      "Classes, socials, footwork, laughter, and all the little moments that make the community feel alive.",
  },
  reels: {
    heading: "Watch the vibe",
    subheading: "Three moments. One family.",
  },
  faq: {
    heading: "Before your first class",
  },
  contact: {
    heading: "Let's dance together.",
    subheading:
      "Based in Budapest · Available for group classes, private lessons, workshops, weddings, shows, and community events.",
  },
};

// -----------------------------------------------------------------------------
// Booking — service options + mock availability
// -----------------------------------------------------------------------------

export const bookingServices = [
  "Group Salsa Classes",
  "Colombian Salsa Footwork",
  "Private Lesson",
  "Workshop or Event",
  "Wedding Dance or Show",
];

// Mock availability for the demo calendar. Keyed by ISO date.
// Connect to a real backend later by swapping these helpers.
export const availability: Availability = {
  slots: {
    "2026-06-23": ["10:00", "12:00", "17:30", "19:00"],
    "2026-06-24": ["17:30", "19:00"],
    "2026-06-25": ["10:00", "12:00", "19:00"],
    "2026-06-29": ["10:00", "17:30", "19:00"],
    "2026-06-30": ["12:00", "17:30", "19:00"],
    "2026-07-01": ["10:00", "12:00", "17:30"],
    "2026-07-02": ["17:30", "19:00"],
    "2026-07-06": ["10:00", "12:00", "17:30", "19:00"],
    "2026-07-07": ["12:00", "19:00"],
    "2026-07-08": ["10:00", "17:30"],
  },
  booked: ["2026-06-26", "2026-07-03", "2026-07-09"],
};

// -----------------------------------------------------------------------------
// Social links — replace handles + URLs here.
// -----------------------------------------------------------------------------

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@andresgarzong",
    href: "https://instagram.com/andresgarzong",
    icon: "instagram",
  },
  {
    label: "YouTube",
    handle: "Salsita with Cris",
    href: "https://youtube.com/",
    icon: "youtube",
  },
  {
    label: "TikTok",
    handle: "@andresgarzong",
    href: "https://tiktok.com/@andresgarzong",
    icon: "tiktok",
  },
  {
    label: "Email",
    handle: "andresgarzong@gmail.com",
    href: "mailto:andresgarzong@gmail.com",
    icon: "email",
  },
];
