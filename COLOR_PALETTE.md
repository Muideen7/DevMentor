# DevMentor AI — Complete Color Palette

> Every color extracted from the full design system across all pages: landing, auth, onboarding, and app UI. Use this as the source of truth when configuring Stitch or any design tool.

---

## PRIMARY BRAND COLORS

| Name | Hex | Usage |
|---|---|---|
| Coral Primary | `#E8736A` | Main accent, active states, CTA highlights, icons, progress bars, left border accents |
| Coral Light | `#F2B8C6` | Hero gradient left, left column gradient start, decorative backgrounds |
| Peach Warm | `#F5C4A8` | Hero gradient right, left column gradient end |
| Coral Tint | `#FDF0EF` | Selected pill backgrounds, hover states, light coral card fills |
| Coral Dark | `#C45D55` | Hover state on coral buttons, pressed states |

---

## NEUTRAL BASE COLORS

| Name | Hex | Usage |
|---|---|---|
| Warm Gray Base | `#F5F4F2` | Page background across all app pages and dashboard |
| Pure White | `#FFFFFF` | All cards, sidebar, right panel, inputs, nav bar, modals |
| Near Black | `#1A1A1A` | Primary CTA buttons, dark charcoal buttons, main headlines |
| Dark Elevated | `#242424` | Feature cards in dark section, dark mode card backgrounds |
| Dark Section BG | `#1A1A1A` | Features grid section background on landing page |

---

## TEXT COLORS

| Name | Hex | Usage |
|---|---|---|
| Text Primary | `#1A1A1A` | Headlines, bold labels, card titles, nav wordmark |
| Text Secondary | `#6B6B6B` | Body text, subtext, descriptions, form labels |
| Text Muted | `#9B9B9B` | Timestamps, meta info, placeholder hints, small footnotes |
| Text White | `#FFFFFF` | Text on dark buttons, text on coral backgrounds, dark section copy |
| Text Coral | `#E8736A` | Section labels, small caps, links, active nav label, coral CTAs |
| Text Light Gray | `#B0B0B0` | Inactive nav items, divider text, secondary ghost elements |

---

## BORDER AND DIVIDER COLORS

| Name | Hex | Usage |
|---|---|---|
| Border Light | `#E0E0E0` | Input field borders, card borders, Google button border, sidebar right border |
| Border Subtle | `#F0F0F0` | Divider lines within cards, section separators, bottom nav border |
| Border Coral | `#E8736A` | Selected pill borders, focused input rings, active roadmap week border |
| Border Dark | `#2E2E2E` | Borders inside dark-background sections |

---

## BACKGROUND VARIANTS

| Name | Hex | Usage |
|---|---|---|
| Gradient Start (Pink) | `#F2B8C6` | Hero left, auth left column top, onboarding decorative bg |
| Gradient End (Peach) | `#F5C4A8` | Hero right, auth left column bottom, final CTA section |
| Sidebar Background | `#FFFFFF` | Fixed left sidebar across all app pages |
| Right Panel BG | `#FFFFFF` | Fixed right contextual panel across all app pages |
| Card Background | `#FFFFFF` | All content cards, form cards, conversation cards |
| Dark Card BG | `#242424` | Feature grid cards on dark landing section |
| Upgrade Nudge BG | `#FDF0EF` | Sidebar upgrade card, light coral nudge backgrounds |
| Code Editor BG | `#1E1E2E` | Dark code editor area on Code Review page |
| Selected Pill BG | `#FDF0EF` | Active/selected goal pill in onboarding, selected filter tags |

---

## STATUS AND FEEDBACK COLORS

| Name | Hex | Usage |
|---|---|---|
| Success Green | `#22C55E` | Completed checkmarks, fixed code highlights, completed roadmap weeks |
| Success Light | `#DCFCE7` | Green highlight background in code fix blocks |
| Warning Amber | `#F59E0B` | Edge case warnings, caution states |
| Error Red | `#EF4444` | Bug/issue warning icon in code review, error form states |
| Error Light | `#FEE2E2` | Light red background behind issue section in code review |
| Info Blue | `#3B82F6` | Concept explainer icon accent, informational badges |
| Info Light | `#EFF6FF` | Light blue icon background tint |

---

## INTERACTIVE STATE COLORS

| Name | Hex | Usage |
|---|---|---|
| Button Primary BG | `#1A1A1A` | Default dark pill button background |
| Button Primary Hover | `#2D2D2D` | Hovered dark button background |
| Button Coral BG | `#E8736A` | Coral filled buttons ("This makes sense") |
| Button Coral Hover | `#C45D55` | Hovered coral button |
| Button Ghost Border | `#E0E0E0` | Ghost outlined buttons (Google, "Review", "Export") |
| Button Ghost Hover BG | `#F5F4F2` | Ghost button hover background |
| Input Focus Ring | `#E8736A` | Coral ring on focused input fields |
| Nav Active BG | `#FDF0EF` | Coral tint background behind active sidebar nav item |
| Nav Active Icon | `#E8736A` | Icon color for active nav item |
| Nav Inactive Text | `#6B6B6B` | Default nav item text color |

---

## SHADOW DEFINITIONS

| Name | Value | Usage |
|---|---|---|
| Shadow Card | `0px 4px 24px rgba(0,0,0,0.06)` | Standard white content cards |
| Shadow Floating | `0px 8px 32px rgba(0,0,0,0.10)` | Floating hero cards, modals, dropdown |
| Shadow Button | `0px 2px 12px rgba(0,0,0,0.08)` | CTA buttons subtle lift |
| Shadow Sidebar | `1px 0px 0px #F0F0F0` | Right edge of sidebar |

---

## CODE SYNTAX COLORS (Code Review Page Only)

| Name | Hex | Usage |
|---|---|---|
| Code BG | `#1E1E2E` | Code editor dark background |
| Code Text Default | `#CDD6F4` | Default code text color |
| Code Keyword | `#CBA6F7` | async, await, const, function keywords |
| Code String | `#A6E3A1` | String values |
| Code Number | `#FAB387` | Numeric values |
| Code Comment | `#6C7086` | Code comments |
| Code Line Numbers | `#45475A` | Left gutter line number color |
| Code Highlight Fix | `#22C55E` | Green highlight on corrected lines |
| Code Highlight Error | `#EF4444` | Red underline or highlight on buggy lines |

---

## TYPOGRAPHY SCALE (Reference)

| Role | Weight | Size (approx) | Color |
|---|---|---|---|
| Display Headline | 800 | 56–64px | `#1A1A1A` |
| Section Headline | 700 | 36–44px | `#1A1A1A` |
| Card Headline | 700 | 20–24px | `#1A1A1A` |
| Body Default | 400 | 15–16px | `#6B6B6B` |
| Label Small Caps | 600 | 11–12px | `#E8736A` |
| Button Text | 600 | 14–16px | `#FFFFFF` or `#1A1A1A` |
| Timestamp / Meta | 400 | 12px | `#9B9B9B` |

---

## STITCH COLOR CONFIGURATION SHORTLIST

When setting up Stitch, configure these as your named palette:

```
Primary:        #E8736A
Primary Light:  #F2B8C6
Primary Tint:   #FDF0EF
Accent Peach:   #F5C4A8
Background:     #F5F4F2
Surface:        #FFFFFF
Dark:           #1A1A1A
Text:           #1A1A1A
Text Muted:     #6B6B6B
Border:         #E0E0E0
Success:        #22C55E
Error:          #EF4444
Code BG:        #1E1E2E
```
