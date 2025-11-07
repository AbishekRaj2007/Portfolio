# 3D Animated Portfolio Website - Design Guidelines

## Design Approach
**Aesthetic Direction:** Futuristic minimalism with glassmorphism effects, inspired by modern portfolio sites like Bruno Simon's portfolio and Apple's product pages. The design emphasizes depth through 3D elements, layering, and subtle transparency effects.

**Core Principle:** Visual immersion through 3D interactive elements balanced with clean, scannable content sections.

## Typography System

**Font Families:**
- Primary: 'Inter' or 'Satoshi' for body text (Google Fonts CDN)
- Display: 'Space Grotesk' or 'Outfit' for headings
- Monospace: 'JetBrains Mono' for code/technical elements

**Hierarchy:**
- Hero Title: 4xl to 6xl (responsive), bold weight (700)
- Section Headings: 3xl to 5xl, semibold (600)
- Subsection Headings: xl to 2xl, medium (500)
- Body Text: base to lg, normal (400)
- Captions/Labels: sm to base, normal (400)

## Layout & Spacing System

**Spacing Scale:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8 to gap-12
- Card padding: p-6 to p-8
- Form elements: p-4 to p-6

**Container Strategy:**
- Full-width 3D sections: w-full with inner max-w-7xl
- Content sections: max-w-6xl mx-auto
- Text content: max-w-3xl for readability

## Section-by-Section Specifications

### Hero Section (100vh)
- Full viewport height with 3D canvas background
- Centered content with name/tagline overlay
- Large display typography (text-6xl to text-8xl)
- Floating 3D elements (particles, geometric shapes, or 3D name)
- Subtle gradient overlay for text readability
- Scroll indicator at bottom with animated bounce
- No traditional hero image - 3D canvas IS the hero

### About Me Section
- Two-column layout (lg:grid-cols-2): profile image left, text content right
- Profile image with glassmorphism frame effect (rounded-2xl)
- Staggered fade-in animations for text paragraphs
- Profile image: 400x400px, floating with subtle hover tilt
- Background: Floating 3D geometric shapes in canvas layer

### Skills Section
- Grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Skill cards with glassmorphism treatment
- Each card: icon (Heroicons/Font Awesome), skill name, proficiency indicator
- Card dimensions: aspect-square or fixed height (h-32)
- Hover effect: 3D tilt transform, elevated shadow
- Staggered animation on scroll reveal

### Projects Section
- 3D card carousel/slider with Swiper.js integration
- Card layout: Featured image (16:9 ratio), title, tech stack tags, description, CTA
- Cards with depth: transform: rotateY on hover
- Grid fallback for non-carousel view: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Project images: 800x450px placeholders
- Tilt.js effect on card hover

### Experience/Timeline Section
- Vertical timeline with alternating left/right content
- Timeline connector: Vertical line with animated dots
- Experience cards: Company logo, role title, duration, description bullets
- Cards animate in from sides on scroll (left cards from left, right from right)
- Card dimensions: max-w-md per side

### Contact Section
- Two-column layout: Animated form (left), 3D floating elements/social links (right)
- Form fields: Name, Email, Message (all full-width within form column)
- Input styling: Glassmorphism with backdrop-blur, rounded-lg, p-4
- Submit button: Large, prominent with animated hover state
- Social icons: Fixed size (w-12 h-12), circular, with hover lift effect
- 3D element canvas as background layer

### Footer
- Single row layout with centered content
- Scroll-to-top button: Fixed bottom-right position (bottom-8 right-8)
- Footer content: Copyright, quick links, social media icons
- Minimal padding: py-8
- Scroll-to-top icon: Arrow up with circular background

## Component Library

### Glassmorphism Cards
- backdrop-blur-md to backdrop-blur-lg
- Semi-transparent background treatment
- Border with subtle glow
- rounded-xl to rounded-2xl
- Shadow: shadow-xl with slight spread

### Navigation
- Fixed top position (sticky or fixed)
- Glassmorphism background with backdrop-blur
- Logo left, nav links center/right
- Dark/light mode toggle: Animated icon (sun/moon)
- Mobile: Hamburger menu with slide-in drawer

### Buttons
- Primary: Large padding (px-8 py-4), rounded-full
- Secondary: Ghost style with border
- Icon buttons: Circular (w-12 h-12), centered icon
- All buttons: Smooth transform on hover (scale-105)

### Cursor Animation
- Custom cursor: Large circular glow (40-60px diameter)
- Follows mouse with slight lag (GSAP delay)
- Expands on interactive element hover
- Blend mode: screen or lighten

## 3D Elements Technical Specs

### Hero 3D Scene
- Canvas covers full viewport
- Floating particles (100-200 count)
- Low-poly geometric object (rotating slowly)
- Camera: Perspective with subtle mouse-follow parallax

### Background 3D Layers
- Depth layers: Foreground (fast parallax), background (slow parallax)
- Particle systems: Small, glowing spheres
- Geometric shapes: Wireframe or solid low-poly

## Animation Guidelines

**GSAP ScrollTrigger:**
- Fade-in: opacity 0 to 1, y: 50 to 0
- Stagger delay: 0.1-0.2s between elements
- Ease: power2.out or power3.out

**Framer Motion:**
- Page transitions: Fade with subtle slide
- Component mount: Spring animations (stiffness: 100)
- Hover states: Scale transforms (1.0 to 1.05)

**Performance:**
- Lazy load 3D scenes below fold
- Use React.memo for heavy components
- Debounce scroll listeners
- Optimize 3D models (< 10k polygons)

## Responsive Breakpoints
- Mobile: < 768px (single column, simplified 3D)
- Tablet: 768px - 1024px (two columns)
- Desktop: > 1024px (full experience)
- Mobile 3D: Reduce particle count by 50%, disable some effects

## Icons
Use **Heroicons** via CDN for UI icons (menu, social media, arrows)
Skill icons: Use SVG tech logos from Simple Icons or similar

## Accessibility
- Provide "Reduce Motion" toggle respecting prefers-reduced-motion
- Ensure 3D canvas has fallback text content
- Form labels properly associated
- Keyboard navigation for all interactive elements
- Focus indicators with visible outline

This design creates a visually striking, immersive portfolio experience that balances cutting-edge 3D technology with clean, professional presentation of content.