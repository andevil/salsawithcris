# Salsa With Cris — Front-End Glow-Up UI Audit & Redesign Brief

## Purpose of this document

This file is a UI/UX and front-end redesign brief for the current `salsawithcris.com` landing page.

The current website is a solid MVP/draft. The next step is to redesign the front end into a more polished, authentic, colorful, Latino, Colombian-inspired, premium experience that feels aligned with Cristhian Garzón’s salsa teaching, community, and personal brand.

This document should be used as source material by Fable5 / Claude Code to redesign the page using strong UI design judgment, modern front-end standards, and the existing page content.

---

## Brand direction

The site should feel like:

> Premium Colombian salsa experience in Budapest: colorful, warm, social, joyful, but still polished.

Not a generic dance school. Not a luxury hotel. Not a nightclub flyer.

The ideal feeling is:

> Cali street energy + Budapest nightlife + warm community + editorial premium design.

Core keywords:

- Sabor
- Movement
- Rhythm
- Colombian energy
- Community
- Warmth
- Confidence
- Social dancing
- Technique with feeling
- Glassmorphism
- Tropical premium
- Criollo but clean
- Human, joyful, and polished

The strongest differentiator is not only salsa technique. It is the feeling of Colombian energy, confidence, and the Salsita Family community in Budapest.

---

## Main design principle

Do not only make the page prettier.

Make the page feel like entering the community before the visitor books a class.

The redesign should immediately communicate:

- This is Colombian salsa with real flavor.
- The classes are social, warm, and beginner-friendly.
- The teacher has personality, technique, and community.
- The experience feels premium, but not cold or corporate.
- Visitors should feel invited, not intimidated.

---

## Current page strengths

The current page already has a good foundation:

- Clear service categories
- Strong positioning around salsa in Budapest
- Good phrase: “Salsa with sabor, technique, and a little bit of magic”
- Good community angle
- Strong offering variety: group classes, Colombian footwork, private lessons, workshops, events, weddings, and shows
- Booking functionality already exists
- Testimonials already exist
- Navigation is simple and understandable

The redesign should keep these strengths and make them visually stronger.

---

## Biggest issues to fix

Priority fixes:

1. Replace the placeholder `0+` stats immediately.
2. Make the hero section visually powerful with real photo/video.
3. Add a clear class schedule before the booking calendar.
4. Add real community/gallery visuals.
5. Add a “Choose your path” section for new visitors.
6. Upgrade the service cards into premium glass cards.
7. Add an FAQ section.
8. Make the navigation sticky and glassy.
9. Improve CTA copy so it feels warmer and more conversion-oriented.
10. Add motion, rhythm, and warm background textures.
11. Make the site feel more Colombian, more colorful, and more alive.
12. Use rounded corners, because they fit the warm premium glass direction better.

---

## Visual identity

### Desired visual feeling

The design should be colorful and Latino, but not chaotic.

Use a warm cream base, rich red and gold as primary brand accents, and tropical colors as secondary details.

The premium effect should come from:

- Glass cards
- Subtle gradients
- Soft shadows
- Elegant typography
- High-quality photography
- Smooth spacing
- Strong visual hierarchy
- Rounded corners
- Tasteful animation

The Latino / Colombian / criollo effect should come from:

- Warm color accents
- Rhythm-inspired decorative lines
- Music and movement patterns
- Spanish microcopy
- Real community photos
- Warm, emotional storytelling
- Energy and personality

Avoid:

- Generic tropical clichés
- Sombrero/cartoon Latin aesthetics
- Overuse of palm trees
- Cheap nightclub flyer visuals
- Neon overload
- Corporate minimalism with no personality
- Generic stock-photo look

---

## Suggested color palette

Use the colors carefully. The base should be soft and warm. The accent colors should add flavor without overwhelming the interface.

```css
:root {
  --color-cream: #FFF6E8;
  --color-cream-soft: #FFF9F0;
  --color-salsa-red: #B91C1C;
  --color-deep-red: #7F1515;
  --color-gold: #D4A017;
  --color-gold-soft: #F3D27A;
  --color-espresso: #1B120D;
  --color-espresso-soft: #3A261C;
  --color-tropical-green: #1F8A5B;
  --color-colombian-blue: #2454A6;
  --color-coral: #F9735B;
  --color-muted: #7C6A5A;
}
```

### Usage guidance

- Cream should be the main background.
- Espresso should be the main text color.
- Salsa red should be the main CTA color.
- Gold should be used for highlights, borders, badges, and available booking days.
- Tropical green, Colombian blue, and coral should appear only as accent colors.
- Do not make the site equally red, yellow, blue, and green everywhere.
- The page should feel colorful but still controlled.

---

## Typography

The current page feels clean but a bit generic. Use a stronger type pairing.

### Recommended font direction

Display font for headings:

- Cormorant Garamond
- Fraunces
- Playfair Display
- Recoleta-style alternative
- Editorial serif or expressive display type

Body font:

- DM Sans
- Inter
- Manrope

### Typography feeling

Headings should feel:

- Editorial
- Rhythmic
- Warm
- Premium
- Human

Body text should feel:

- Clear
- Friendly
- Easy to read
- International
- Not too formal

### Example type direction

Hero headline:

> Salsa with sabor, técnica y magia.

Subtitle:

> Colombian salsa, partnerwork, and social dance classes in Budapest for people who want to move with confidence, rhythm, and joy.

---

## Border radius direction

Rounded corners should be used.

The site should feel warm, premium, smooth, and human. Rounded corners support the glassmorphism and community-driven feeling better than sharp corners.

Suggested radius system:

```css
:root {
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-pill: 999px;
}
```

Usage:

- Buttons: pill or 16px radius
- Cards: 24px radius
- Hero images: 28px to 32px radius
- Badges: pill radius
- Gallery images: 20px to 28px radius
- Calendar card: 24px radius

Avoid using huge radius everywhere. It should feel intentional and refined.

---

## Background system

The site should not be plain white.

Use:

- Warm cream base
- Subtle radial gradients
- Soft color washes
- Very subtle noise texture
- Abstract rhythm shapes
- Blurred decorative circles
- Occasional tropical/pattern-inspired details

Example background:

```css
.page-bg {
  background:
    radial-gradient(circle at 20% 10%, rgba(249, 115, 91, 0.25), transparent 30%),
    radial-gradient(circle at 80% 20%, rgba(212, 160, 23, 0.22), transparent 28%),
    radial-gradient(circle at 50% 90%, rgba(31, 138, 91, 0.12), transparent 35%),
    #fff6e8;
}
```

Optional subtle texture:

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image: url('/noise.png');
  mix-blend-mode: multiply;
}
```

If no image texture is available, use CSS-only subtle gradients and avoid overcomplicating.

---

## Glassmorphism style

Use glass effects carefully. They should make the site feel premium, not messy.

Good areas for glass:

- Sticky navbar
- Hero badges
- Service cards
- Booking calendar
- Testimonials
- Floating CTA
- Schedule cards

Base glass style:

```css
.glass-card {
  background: rgba(255, 246, 232, 0.68);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(212, 160, 23, 0.22);
  box-shadow: 0 24px 80px rgba(80, 32, 12, 0.12);
  border-radius: 24px;
}
```

Stronger premium card:

```css
.premium-card {
  background:
    linear-gradient(rgba(255, 249, 240, 0.82), rgba(255, 246, 232, 0.68)) padding-box,
    linear-gradient(135deg, rgba(212, 160, 23, 0.65), rgba(185, 28, 28, 0.55), rgba(31, 138, 91, 0.35)) border-box;
  border: 1px solid transparent;
  border-radius: 24px;
  box-shadow: 0 24px 70px rgba(27, 18, 13, 0.12);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}
```

Button glow:

```css
.primary-cta {
  background: linear-gradient(135deg, #B91C1C, #D4A017);
  color: #FFF9F0;
  border-radius: 999px;
  box-shadow: 0 16px 40px rgba(185, 28, 28, 0.28);
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.primary-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 55px rgba(185, 28, 28, 0.34);
  filter: saturate(1.08);
}
```

---

## Animation and motion

Salsa is movement. The page should move subtly.

Use animation to create rhythm, not distraction.

Recommended animations:

- Hero image slow floating movement
- Floating badges with gentle drift
- Cards appearing with blur/fade
- Service cards lift on hover
- Buttons glow softly on hover
- Testimonials slide horizontally
- Keyword marquee
- Background gradient slowly shifts
- Calendar card lifts on hover

Avoid:

- Too many bouncy effects
- Fast nightclub-style motion
- Aggressive parallax
- Animations that hurt mobile performance

Respect reduced motion:

```tsx
const prefersReducedMotion = useReducedMotion();
```

Motion style example:

```tsx
<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>
```

Hover card example:

```tsx
<motion.article
  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
  transition={{ duration: 0.2 }}
  className="premium-card"
>
  ...
</motion.article>
```

---

## Image direction

The page needs stronger photography and video.

Use images that show:

- Cristhian teaching
- Cristhian dancing
- People laughing in class
- Partnerwork connection
- Close-up of feet for Salsa Caleña
- Social dancing moments
- Community events
- BBQ / Salsita Family moments
- Warm group energy

Image treatment:

- Warm tones
- Slight grain
- Gold highlights
- Red shadows
- Natural skin tones
- Cinematic but real
- Not too polished

Avoid:

- Empty room photos
- Corporate-looking portraits
- Random stock dancers
- Cold lighting
- Overly edited neon images

---

## Navigation redesign

Current navigation is simple, but it should feel more premium and useful.

### Recommended nav

Left:

- Logo: `Salsita with Cris` or `CG`

Center links:

- About
- Classes
- Private Lessons
- Events
- Booking
- Contact

Right:

- Primary CTA: `Book a Class`

### Style

- Sticky glass navbar
- Rounded pill container
- Transparent at top, stronger glass on scroll
- Smooth anchor scrolling
- Mobile full-screen menu
- CTA always visible on desktop

Example:

```css
.navbar {
  position: sticky;
  top: 16px;
  z-index: 50;
  margin-inline: auto;
  width: min(1120px, calc(100% - 32px));
  border-radius: 999px;
  background: rgba(255, 246, 232, 0.72);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(212, 160, 23, 0.24);
  box-shadow: 0 18px 60px rgba(27, 18, 13, 0.1);
}
```

---

## Hero section redesign

The hero is the most important section. It should immediately feel alive, Colombian, premium, and personal.

### Recommended layout

Left side:

- Small pill badge
- Big headline
- Emotional subtitle
- Primary and secondary CTAs
- Social proof / reassurance badges

Right side:

- Large photo or muted video of Cristhian dancing or teaching
- Floating glass badges
- Decorative rhythm lines
- Warm gradient glow

### Hero copy

Small badge:

> Colombian Salsa · Partnerwork · Budapest

Headline:

> Salsa with sabor, técnica y magia.

Subtitle:

> Colombian salsa, partnerwork, and social dance classes in Budapest for people who want to move with confidence, rhythm, and joy.

CTA buttons:

- Book a Class
- Explore Classes

Hero reassurance badges:

- No partner needed
- Beginner friendly
- Classes in English
- Social dance focused
- Colombian energy
- Budapest based

### Hero example structure

```txt
[Colombian Salsa · Partnerwork · Budapest]

Salsa with sabor,
técnica y magia.

Learn Colombian salsa, partnerwork, and social dancing in Budapest with a community that feels like family.

[Book a Class] [Explore Classes]

174 Salsita Family members
Colombian energy
Social dance focused
```

### Hero visual elements

- Rounded video/photo card
- Glass overlay stats
- Accent gradient behind the photo
- Warm red/gold/coral glow
- Floating badge: `con sabor`
- Floating badge: `No partner needed`
- Floating badge: `Classes in English`

---

## Keyword marquee

Add a moving horizontal ribbon/marquee to create rhythm.

Suggested keywords:

- Salsa
- Salsa Caleña
- Partnerwork
- Social Dancing
- Budapest
- Colombian Footwork
- Private Lessons
- Workshops
- Wedding Dance
- Group Classes
- Salsita Family
- Con sabor
- Dance with confidence

Design:

- Cream/gold/red background
- Text alternating between serif and sans-serif
- Small icons or separators
- Slow movement
- Accessible and not too distracting

---

## About section redesign

Current idea to keep:

> Dance first. Technique with feeling.

This is strong and should remain central.

### Layout

Left:

- Editorial photo of Cristhian
- Small handwritten-style or badge text: `From Colombia to Budapest`

Right:

- Section label: `About Cristhian`
- Heading: `Dance first. Technique with feeling.`
- Story paragraph
- Teaching philosophy cards
- Stats counters

### Suggested copy direction

```txt
Born in Colombia and based in Budapest, Cristhian brings together social partnerwork, Colombian footwork, musicality, and community energy to help dancers feel confident on the dance floor.

The goal is not to memorize endless combinations. The goal is to understand the music, connect with your partner, move with confidence, and enjoy the dance.
```

### Teaching philosophy cards

- Technique without stiffness
- Connection before complexity
- Social dancing first
- Confidence through repetition
- Community over perfection

### Stats

Use these updated stats:

- `300+` dancers trained
- `174` Salsita Family members
- `8+` years sharing salsa around the world
- `3` styles taught

Possible implementation:

```txt
300+ Dancers trained
174 Salsita Family members
8+ Years sharing salsa around the world
3 Styles taught
```

Use NumberTicker or animated counters if available.

---

## Choose your path section

This section should help visitors quickly identify where to start.

Many visitors will not know the difference between Cuban style, LA style, Salsa Caleña, partnerwork, footwork, private lessons, or social dancing.

Add a section before or after Services.

### Heading

> Not sure where to begin?

### Subheading

> Choose the path that fits your rhythm right now.

### Cards

```txt
I’m completely new
→ Beginner Partnerwork

I want fast footwork
→ Salsa Caleña

I want confidence at socials
→ Private Lessons

I need a special event or wedding dance
→ Workshops, Shows & Wedding Dance
```

### Design

- Four premium rounded cards
- Each card has icon, short text, and CTA
- Hover lift
- Accent color per card
- Very clear for mobile

---

## Services section redesign

Current services to keep:

- Group Salsa Classes
- Colombian Salsa Footwork
- Private Lessons
- Workshops and Events
- Wedding Dance and Shows

The cards should become more premium and conversion-oriented.

Each card should include:

- Number
- Icon
- Title
- Emotional benefit
- Practical details
- Price or “from” price if available
- CTA

### Example service card

```txt
01
Group Salsa Classes

Partnerwork classes for dancers who want to feel confident at socials, connect better, and stop overthinking every step.

Cuban + LA style · Weekly classes · Budapest

From 4,000 HUF
[See schedule]
```

### Service cards content

#### 01. Group Salsa Classes

Benefit:

> Learn partnerwork in a warm, international community and build confidence for real social dancing.

Details:

> Cuban + LA style · Weekly classes · Beginner to advanced

CTA:

> See schedule

#### 02. Colombian Salsa Footwork

Benefit:

> Fast, joyful Salsa Caleña footwork to improve rhythm, speed, coordination, and flavor.

Details:

> Beginner and intermediate footwork · Colombian style

CTA:

> Explore Caleña

#### 03. Private Lessons

Benefit:

> Personalized feedback to improve faster, clean your basics, and feel more confident on the dance floor.

Details:

> Solo or couple · Technique · Musicality · Confidence

CTA:

> Book private lesson

#### 04. Workshops and Events

Benefit:

> Bring Colombian salsa energy to festivals, company events, parties, and special community moments.

Details:

> Workshops · Animations · Social dance experiences

CTA:

> Plan an event

#### 05. Wedding Dance and Shows

Benefit:

> Create a meaningful, joyful, and memorable dance moment for your wedding or special occasion.

Details:

> Wedding choreographies · Shows · Private coaching

CTA:

> Ask for details

### Icons

Use simple line icons:

- Music note
- Dancing couple
- Lightning / footwork
- Spark
- Heart
- Calendar
- Star

---

## Weekly schedule section

The current booking section jumps too quickly into the calendar. Visitors first need clarity.

Add a weekly schedule before the booking calendar.

### Heading

> Weekly classes in Budapest

### Subheading

> Find the level, style, and rhythm that fits you.

### Suggested schedule card structure

Each card should show:

- Day
- Class name
- Level
- Time
- Location
- Best for
- CTA

### Example cards

```txt
Monday
A1 Partnerwork
20:00–21:30 · BackStage Studio
Best for complete beginners and dancers building strong basics
[Book this class]
```

```txt
Tuesday
A2 Partnerwork
20:00–21:30 · BackStage Studio
Best for dancers who know the basics and want smoother social dancing
[Book this class]
```

```txt
Wednesday
Salsa Fusion
20:00–21:00
Best for body movement, solo confidence, and musical expression
[Book this class]
```

```txt
Thursday
B1 / B2 Partnerwork
BackStage Studio
Best for intermediate and advanced dancers polishing technique, musicality, and combinations
[Book this class]
```

```txt
Saturday
Salsa Caleña Footwork
Roxy Studio
Best for Colombian footwork, speed, rhythm, and sabor
[Book this class]
```

Make the schedule easy to edit because class times/locations can change by season.

---

## Booking section redesign

The booking section is functional, but it needs stronger visual hierarchy and friendlier guidance.

### Heading options

Instead of:

> Find your rhythm.

Use:

> Book your next dance.

or

> Choose your rhythm.

or

> Ready to dance?

### Supportive copy

```txt
Choose a day and I’ll help you find the right class for your level.
```

Add reassurance:

```txt
Not sure which class fits you? Send me a message and I’ll guide you.
```

### Booking UI suggestions

- Calendar inside a premium glass card
- Warm gold for available days
- Salsa red for selected day
- Muted unavailable days
- Rounded calendar cells
- Sticky booking summary on desktop
- Clear steps: Date → Details → Done
- WhatsApp/Instagram fallback if someone is unsure

### Booking visual style

```css
.calendar-card {
  background: rgba(255, 249, 240, 0.78);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 160, 23, 0.28);
  border-radius: 28px;
  box-shadow: 0 30px 90px rgba(27, 18, 13, 0.14);
}

.calendar-day.available {
  background: rgba(212, 160, 23, 0.18);
  color: #1B120D;
  border: 1px solid rgba(212, 160, 23, 0.4);
}

.calendar-day.selected {
  background: linear-gradient(135deg, #B91C1C, #D4A017);
  color: #FFF9F0;
  box-shadow: 0 12px 30px rgba(185, 28, 28, 0.28);
}
```

---

## Testimonials section redesign

Testimonials are already valuable. Make them more emotional and visual.

### Heading

> People come for salsa. They stay for the family.

### Layout options

- Horizontal carousel
- 3-card grid on desktop
- Swipeable cards on mobile

### Card details

Each testimonial card should include:

- Large decorative quote mark
- Testimonial text
- Name or initials
- Class badge, for example `Partnerwork`, `Caleña`, `Private lesson`
- Colorful initials avatar
- Glass background

### Style

- Rounded glass cards
- Warm gradient background behind the section
- Subtle gold quote marks
- Soft hover lift

---

## Community gallery section

This section is missing and would make a huge difference.

A salsa website needs real people, movement, joy, and social proof.

### Section title

> The Salsita Family in motion

### Subtitle

> Classes, socials, footwork, laughter, and all the little moments that make the community feel alive.

### Visual layout

- Masonry grid or editorial grid
- 6 to 9 images
- Mix horizontal and vertical images
- Rounded corners
- Warm image treatment
- Hover overlay with short labels

### Suggested labels

- Class night
- Caleña footwork
- Social vibes
- Partnerwork flow
- Salsita Family
- Budapest nights
- Colombian energy

### Important

Use real community photos if available. This section should not use generic stock imagery.

---

## Video / reels section

Dance is movement. Add video.

### Section title

> Watch the vibe

### Subtitle

> Three moments. One family.

### Video cards

- Beginner class
- Caleña footwork
- Social night

### Style

- Vertical reel-style cards
- Rounded corners
- Play button overlay
- Warm gradient border
- Short captions
- Option to embed Instagram/TikTok/YouTube later

This can be implemented initially as static video thumbnails if embedded video is not ready.

---

## FAQ section

Add an FAQ accordion to reduce hesitation and improve conversion.

### Heading

> Before your first class

### Questions

1. Do I need a partner?
2. Is the class beginner friendly?
3. What style of salsa do you teach?
4. What is Salsa Caleña?
5. Can I join if I have two left feet?
6. Are classes in English?
7. Where are the classes?
8. Can I book private lessons?
9. Do you do weddings or company events?

### Suggested answer style

Keep answers short, warm, and reassuring.

Example:

```txt
Do I need a partner?
No. You can come alone. In partnerwork classes we rotate partners so everyone gets to practice and meet different dancers.
```

```txt
Can I join if I have two left feet?
Yes. That is exactly where many dancers start. The goal is not perfection, it is confidence, rhythm, and enjoying the process.
```

```txt
Are classes in English?
Yes. Classes are taught in English, with Colombian sabor always included.
```

---

## Contact section redesign

Current heading feels too corporate:

> Let us work together.

Replace with something warmer.

### Better heading options

- Let’s dance together.
- Ready to move?
- Bring salsa to your life, class, or event.
- Let’s bring some sabor to your next move.

### Contact content

Include:

- Instagram
- TikTok
- YouTube
- Email
- WhatsApp if available
- Class booking CTA
- Private lesson CTA
- Event inquiry CTA

### Suggested copy

```txt
Based in Budapest · Available for group classes, private lessons, workshops, weddings, shows, and community events.
```

CTA options:

- Book a Class
- Ask about private lessons
- Invite Cristhian to your event

---

## Conversion improvements

Every section should guide users toward an action.

Use CTAs throughout the page:

- Hero: Book a Class / Explore Classes
- About: See classes
- Choose your path: Find my class
- Services: See schedule / Book private lesson / Plan an event
- Schedule: Reserve your spot
- Testimonials: Join the family
- FAQ: Book your first class
- Contact: Send a message

### Important reassurance badges

Add these near hero, schedule, or booking:

- No partner needed
- Beginner friendly
- International community
- Classes in English
- Social dance focused
- Colombian energy

These are especially important for Budapest foreigners and first-time dancers.

---

## Microcopy improvements

Replace generic copy with warmer, more emotional, brand-aligned copy.

### Instead of:

> Ways to move together.

Use:

> Find your way into the rhythm.

### Instead of:

> Booking / Find your rhythm.

Use:

> Book your next dance.

### Instead of:

> Available days are highlighted.

Use:

> Choose a day and I’ll help you find the right class for your level.

### Instead of:

> Let us work together.

Use:

> Let’s dance together.

or

> Let’s bring some sabor to your next move.

---

## Suggested full page structure

1. Sticky glass navbar
2. Hero section with photo/video, badges, CTAs, and warm gradient background
3. Keyword marquee
4. About Cristhian section
5. Stats section or stats integrated into About
6. Choose your path section
7. Services section
8. Weekly schedule section
9. Booking calendar section
10. Testimonials section
11. Community gallery section
12. Video / reels section
13. FAQ accordion
14. Contact CTA section
15. Footer

---

## Components to implement

Recommended components:

- `GlassNavbar`
- `HeroSection`
- `FloatingBadge`
- `KeywordMarquee`
- `SectionHeader`
- `AboutSection`
- `StatsCounter`
- `PhilosophyCard`
- `ChoosePathCard`
- `ServiceCard`
- `ScheduleCard`
- `BookingCalendarCard`
- `TestimonialsCarousel`
- `CommunityGallery`
- `VideoCard`
- `FAQAccordion`
- `ContactCTA`
- `FloatingSocialButton`
- `Footer`

---

## Mobile-first considerations

Mobile experience is critical.

Requirements:

- Hero should stack cleanly.
- CTA buttons should be large and easy to tap.
- Schedule cards should be easy to scan.
- Booking calendar must be usable on mobile.
- Testimonials should be swipeable or stacked.
- Gallery should not be too heavy.
- Video cards should load efficiently.
- Sticky CTA or floating WhatsApp/Instagram can help conversion.
- Navbar should collapse into a clean full-screen mobile menu.

Avoid tiny text, dense cards, or calendar interactions that are hard to tap.

---

## Performance notes

Because the site is visual, performance matters.

Recommendations:

- Use optimized images.
- Lazy-load gallery and video sections.
- Use thumbnails instead of autoplay videos below the fold.
- Use `next/image` if this is a Next.js project.
- Avoid too many heavy animation libraries.
- Respect `prefers-reduced-motion`.
- Keep gradients and blur effects performant on mobile.
- Use CSS variables for theme consistency.

---

## Accessibility notes

The site should remain accessible.

Requirements:

- Strong color contrast for text.
- Keyboard-accessible navigation.
- Buttons and links must have clear labels.
- FAQ accordion should be accessible.
- Images need descriptive alt text.
- Video should not autoplay with sound.
- Motion should respect reduced-motion settings.
- Forms should have labels and helpful validation messages.

---

## Suggested front-end prompt for Fable5 / Claude Code

Use the following prompt together with this document and the existing page code.

```txt
You are an expert front-end designer and UI engineer. Redesign the existing Salsa With Cris landing page into a premium, colorful, authentic Colombian salsa website with a warm Latino/criollo identity and modern glassmorphism UI.

Use this UI audit and redesign brief as source material, but apply your own strong UI design judgment. The current page is a simple MVP. Your task is to redesign the front end so it feels alive, premium, conversion-oriented, and deeply aligned with Cristhian Garzón’s Colombian salsa brand in Budapest.

The brand should feel like Cali street energy meets Budapest social dance community: warm, joyful, rhythmic, colorful, but still polished and premium. Avoid generic dance-school templates. Avoid cheesy tropical clichés. Use Colombian flavor through color, movement, Spanish microcopy, community photography, rhythm patterns, warm storytelling, and authentic human energy.

Design direction:
- Cream base background
- Salsa red and warm gold as primary accents
- Deep espresso for text
- Tropical green, Colombian blue, and coral as small accent colors
- Rounded corners
- Premium glass cards
- Subtle radial gradients
- Soft shadows
- Warm image treatment
- Strong editorial typography
- Smooth, tasteful animation
- Mobile-first responsive design

Use rounded corners throughout the interface because they fit the warm premium glass direction better.

Typography:
- Use an expressive editorial display font for headings, such as Cormorant Garamond, Fraunces, Playfair Display, or a similar premium serif/display font.
- Use a clean sans-serif for body text, such as DM Sans, Inter, or Manrope.
- Headings should feel editorial, musical, premium, and warm.

Page structure:
1. Sticky glass navbar
   - Logo: Salsita with Cris or CG
   - Links: About, Classes, Private Lessons, Events, Booking, Contact
   - CTA: Book a Class
   - Mobile responsive full-screen menu

2. Hero section
   - Badge: Colombian Salsa · Partnerwork · Budapest
   - Headline: Salsa with sabor, técnica y magia.
   - Subtitle: Colombian salsa, partnerwork, and social dance classes in Budapest for people who want to move with confidence, rhythm, and joy.
   - CTA buttons: Book a Class, Explore Classes
   - Use a real photo or video of Cristhian dancing/teaching
   - Add floating glass badges: Colombian energy, Budapest based, Social dance focused, No partner needed, Classes in English
   - Add warm red/gold/coral gradients and subtle rhythm decorations

3. Keyword marquee
   - Include keywords like Salsa, Salsa Caleña, Partnerwork, Social Dancing, Budapest, Colombian Footwork, Private Lessons, Workshops, Wedding Dance, Group Classes, Salsita Family, Con sabor, Dance with confidence.

4. About section
   - Keep the idea: Dance first. Technique with feeling.
   - Add editorial image of Cristhian
   - Include teaching philosophy cards:
     - Technique without stiffness
     - Connection before complexity
     - Social dancing first
     - Confidence through repetition
     - Community over perfection
   - Use updated stats:
     - 300+ dancers trained
     - 174 Salsita Family members
     - 8+ years sharing salsa around the world
     - 3 styles taught

5. Choose your path section
   - Add cards:
     - I’m completely new → Beginner Partnerwork
     - I want fast footwork → Salsa Caleña
     - I want confidence at socials → Private Lessons
     - I need a special event or wedding dance → Workshops, Shows & Wedding Dance

6. Services section
   - Upgrade services into premium glass cards:
     - Group Salsa Classes
     - Colombian Salsa Footwork
     - Private Lessons
     - Workshops and Events
     - Wedding Dance and Shows
   - Each card should include number, icon, title, emotional benefit, practical details, price/from price if available, and CTA.

7. Weekly schedule section
   - Add a clear weekly schedule before the booking calendar.
   - Use cards with day, class name, level, time, location, best-for text, and CTA.
   - Include partnerwork, Salsa Caleña, Salsa Fusion, private lessons, and workshops if available.

8. Booking section
   - Redesign the booking calendar as a premium glass booking card.
   - Use warm gold for available days, salsa red for selected day, and muted style for unavailable days.
   - Add progress steps: Date → Details → Done.
   - Add supportive copy: Not sure which class fits you? Send me a message and I’ll guide you.

9. Testimonials section
   - Heading: People come for salsa. They stay for the family.
   - Use carousel or premium card grid.
   - Add initials, class badges, large quote marks, glass cards, and warm gradient background.

10. Community gallery
   - Section title: The Salsita Family in motion.
   - Use real photos if available.
   - Use masonry/editorial layout with rounded corners, warm image treatment, and hover labels.

11. Video/reels section
   - Section title: Watch the vibe.
   - Show three video cards: Beginner class, Caleña footwork, Social night.
   - Use vertical reel-style cards or thumbnails.

12. FAQ section
   - Add accordion with:
     - Do I need a partner?
     - Is the class beginner friendly?
     - What style of salsa do you teach?
     - What is Salsa Caleña?
     - Can I join if I have two left feet?
     - Are classes in English?
     - Where are the classes?
     - Can I book private lessons?
     - Do you do weddings or company events?

13. Contact section
   - Replace “Let us work together” with a warmer heading like “Let’s dance together” or “Ready to move?”
   - Include Instagram, TikTok, YouTube, email, and optional WhatsApp.
   - Add CTAs for class booking, private lessons, and event inquiries.

14. Footer
   - Include brand name, short tagline, social links, navigation, and Budapest location mention.

Implementation requirements:
- Fully responsive
- Strong mobile experience
- Smooth animations but respect reduced motion
- Use glassmorphism tastefully
- Use rounded corners
- Avoid generic stock-photo feeling
- Create a clear conversion path throughout the page
- Use strong visual hierarchy
- Make the page warm, colorful, premium, Colombian, social, and human
- Keep the code clean, componentized, and easy to maintain
- Preserve existing functionality where possible, especially booking
- Improve front-end only unless small structural changes are needed for UI quality

Do not blindly copy the old layout. Use the existing content as material and redesign the experience so it feels like a real brand, not a draft.
```

---

## Final creative direction

The site should feel like this:

> You arrive for a salsa class, but what you actually find is confidence, rhythm, Colombian flavor, and a community that feels like family.

That is the feeling the front end should communicate.
