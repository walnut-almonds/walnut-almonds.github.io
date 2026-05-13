---
name: Kinetic Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#b3c6f3'
  on-secondary: '#1c3054'
  secondary-container: '#33466c'
  on-secondary-container: '#a2b5e1'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#b3c6f3'
  on-secondary-fixed: '#031a3e'
  on-secondary-fixed-variant: '#33466c'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-mono:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  grid-columns: '12'
---

## Brand & Style

This design system is built upon a foundation of technical precision and cinematic minimalism. It targets a sophisticated audience that values clarity, performance, and the "bleeding edge" of digital expression. The aesthetic is a fusion of **High-Tech Minimalism** and **Interactive Futurism**, characterized by an aggressive use of negative space, razor-sharp alignment, and a curated "floating nodes" interaction layer that brings life to an otherwise stark, monochromatic environment.

The emotional response should be one of "quiet power"—a professional yet experimental workspace where the content is the hero, framed by a rigid grid and elevated by fluid, physics-based background elements.

## Colors

The palette is strictly high-contrast, utilizing a "void" background to maximize the impact of content. 

- **Primary:** Pure White (#FFFFFF) is reserved for critical text, primary iconography, and high-priority borders.
- **Secondary:** This slate-blue (#4A5D84) is used sparingly for interactive nodes, hover states, and subtle technical accents that suggest a digital-industrial depth.
- **Neutral:** Deep Black (#000000) forms the infinite canvas, ensuring that the "floating nodes" appear to exist in a boundless space.

Color should be used as a functional tool rather than decoration. Transparency is preferred over mid-tone grays to maintain the starkness of the black-and-white relationship.

## Typography

The typographic strategy relies on the tension between a clean, contemporary Neo-Grotesk and a technical Monospace. 

**Hanken Grotesk** serves as the primary typeface for all high-level messaging and body copy. It should be set with tight letter-spacing in larger formats to evoke a sleek, premium feel. 

**Geist** (Monospace) is the technical voice of the design system. It is used for navigational elements, metadata, labels, and small captions. This font should almost always be uppercase with generous letter-spacing to enhance legibility and reinforce the "high-tech" laboratory aesthetic.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy rooted in architectural principles. All elements are aligned to a 12-column grid on desktop and a 4-column grid on mobile.

- **The Grid:** Grid lines should occasionally be visualized as thin, 1px low-opacity borders (#FFFFFF at 10% opacity) to emphasize the structural integrity of the layout.
- **Rhythm:** A 4px baseline grid ensures vertical consistency. Margins are intentionally wide to create a sense of focus and exclusivity.
- **Floating Nodes Interaction:** While the UI is strictly grid-bound, the background features a fluid particle system. These "nodes" should drift behind the content but snap to grid intersections when interacted with, bridging the gap between rigid structure and organic movement.

## Elevation & Depth

Depth is conveyed through **Low-Contrast Outlines** and **Glassmorphism** rather than traditional shadows. In a pure black environment, shadows are invisible, so we use light to define edges.

1.  **Tier 1 (Surface):** The background (#000000).
2.  **Tier 2 (Containers):** Defined by a 1px solid border (#FFFFFF at 15% opacity). No background fill unless content requires a backdrop blur (Glassmorphism).
3.  **Tier 3 (Pop-overs/Modals):** A dark translucent fill (Black at 80% opacity) with a high-strength backdrop blur (20px) and a sharper white border (30% opacity).

Interactive elements utilize a faint "glow" or "inner stroke" in the secondary slate-blue color to indicate active states.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To maintain the futuristic, high-tech aesthetic, all corners are right angles. This creates a "blueprint" or "command center" feel. Any roundedness would soften the impact of the stark contrasts and precise grid. The only exceptions are the "floating nodes" themselves, which are small, perfect circles, and the occasional pill-shape for purely decorative, non-interactive status pips.

## Components

- **Buttons:** Rectangular with a 1px white border. Hover states should invert the colors (White background, Black text) instantly, without a transition delay, to mimic terminal responsiveness.
- **Inputs:** Simple bottom-border only, using the Geist Mono font for placeholder text. The cursor should be a solid white block.
- **Cards:** Defined by the grid. Instead of a background color, use thin 1px lines to separate cards. Content within cards should have consistent internal padding (32px).
- **Interactive Nodes:** Small 4px circles that trail the mouse or connect via thin lines. These should be colored in the secondary Slate Blue.
- **Navigation:** A minimal top-bar or side-rail where items are separated by a "pipe" character (`|`).
- **Progress Indicators:** Linear, 1px height, utilizing a sharp white fill against a low-opacity white track.