# Hairline.app — Website Sitemap & Section Inventory

**Source:** Design Brief v2.0 (May 2026)  
★ = SEO-critical, must be templated first (Brief §4)

---

## Zone 1 — Marketing

---

### `/` — Homepage ★

**Brief ref:** §5.1

| # | Section |
|---|---------|
| 1 | **Hero** (Patient-focused) — headline (~6–9 words), sub-headline, primary CTA: app download badges, secondary text link: 'Find a clinic near you →', tertiary top-right: 'For clinics →', phone mockup visual, trust strip below fold |
| 2 | **Tile Grid: Routes In** — 4 rounded tiles: Start your hair assessment / Find a verified clinic / Compare treatments / Track your recovery |
| 3 | **Scroll-Synced App Showcase** — phone-in-hand scroll module, 4–6 screens with synced headline + support copy per scroll-stop (§3.2) |
| 4 | **How It Works** — 4-step horizontal strip: Assess → Match → Treat → Recover, each with illustration + one line |
| 5 | **Provider Network** — world map with clinic pins, hover-reveal, headline + stats strip (providers, countries, procedures booked) |
| 6 | **Editorial / Resource Showcase** — 3 featured article cards (image, category tag, headline, reading time) |
| 7 | **Testimonials / Success Stories** — real patient stories, photographic, long-form quotes (2–3 sentences) |
| 8 | **For Clinics** (B2B door) — single full-width band, darker background, headline: 'Are you a clinic?', one CTA: 'Partner with Hairline →' |
| 9 | **Final CTA + Footer** — repeat app download, newsletter signup, full sitemap footer with legal, social, language switcher |

---

### `/how-it-works` — How It Works

**Brief ref:** §4.1 (Patient journey, step-by-step. Section structure not specified in brief.)

---

### `/about` — About

**Brief ref:** §4.1 (listed, section structure not specified in brief)

---

### `/careers` — Careers

**Brief ref:** §4.1 (listed, section structure not specified in brief)

---

### `/press` — Press

**Brief ref:** §4.1 (listed, section structure not specified in brief)

---

### `/contact` — Contact

**Brief ref:** §4.1 (listed, section structure not specified in brief)

---

## Zone 2 — Patient (B2C)

---

### `/for-patients` — For Patients

**Brief ref:** §4.2 (Consumer landing, section structure not specified in brief)

---

### `/find-a-clinic` — Find a Clinic ★

**Brief ref:** §4.2 (Provider directory + map), §6.3 (deliverable: Find-a-clinic directory + map template)

Section structure not specified in brief. Confirmed deliverable: directory listing with map interface.

---

### `/find-a-clinic/[city]` — City Pages ★

**Brief ref:** §4.2 (e.g., London, Dubai, Istanbul, Doha), §6.3

Section structure not specified in brief. Template reuses Find-a-Clinic structure filtered by city.

---

### `/providers/[clinic-slug]` — Clinic Profile Page ★

**Brief ref:** §5.5

| # | Section |
|---|---------|
| 1 | **Hero gallery** — real clinic photos (not stock) |
| 2 | **Clinic header** — clinic name, location, verification badge, star rating, total reviews |
| 3 | **About** — 3-paragraph description |
| 4 | **Lead surgeons** — photo, credentials, years of experience |
| 5 | **Services offered** — pill links to relevant treatment pages |
| 6 | **Pricing transparency** — typical cost ranges |
| 7 | **Patient reviews** — verified-purchase only |
| 8 | **Photo gallery** — facility images |
| 9 | **Before-and-after gallery** — consent-gated, faces blurred by default |
| 10 | **Map + how to get there** |
| 11 | **Book consultation CTA** — app deep link or in-page form |

---

### `/aftercare` — Hairline Aftercare

**Brief ref:** §4.2 (Hairline Aftercare service page), referenced as link target from /how-it-works Step 6. Section structure not specified in brief.

---

### `/travel` — Hairline Travel

**Brief ref:** §4.2 (Hairline Travel service page), referenced in /how-it-works Step 5. Section structure not specified in brief.

---

### `/assessment` — Assessment Entry

**Brief ref:** §4.2 (Hair-loss assessment flow entry — links to app). Functions as a deep-link entry point or minimal handoff page to the in-app assessment flow. Section structure not specified in brief.

---

## Zone 3 — Treatments Hub ★

---

### `/treatments` — Treatments Hub

**Brief ref:** §4.3 (Hub), §7.2 (Pillar-and-Cluster Architecture)

Explicit section list not specified in brief. Per §7.2, hub page must include:
- Explore section linking to all cluster children
- Sidebar navigation showing cluster structure (desktop)

---

### `/treatments/hair-transplant` — Hair Transplant ★
### `/treatments/hair-transplant/fue` — FUE ★
### `/treatments/hair-transplant/fut` — FUT ★
### `/treatments/hair-transplant/dhi` — DHI ★
### `/treatments/finasteride` — Finasteride ★
### `/treatments/minoxidil` — Minoxidil ★
### `/treatments/prp` — PRP ★
### `/treatments/scalp-micropigmentation` — Scalp Micropigmentation ★
### `/treatments/laser-therapy` — Laser Therapy ★

**Template:** Treatment Page Template — applies to all 9 pages above (Brief §5.2)

| # | Section |
|---|---------|
| 1 | **Hero** — treatment name, one-line definition, average cost range, average recovery time |
| 2 | **What it is** — 2–3 paragraph editorial-style explanation |
| 3 | **How it works** — step-by-step illustration |
| 4 | **Who it's for** — eligibility checklist |
| 5 | **What to expect** — timeline (immediate / 1 month / 6 months / 12 months) |
| 6 | **Cost breakdown** — table with low / mid / premium ranges |
| 7 | **Side effects & risks** — honest, medically reviewed |
| 8 | **Compare with…** — links to comparison articles |
| 9 | **Find a provider** — embedded clinic shortlist filtered to this treatment |
| 10 | **FAQ accordion** — 5–10 questions, schema-marked-up |
| 11 | **Reviewed by** — Dr. [Name] block with date and credentials |

---

## Zone 4 — Hair-Loss Conditions Hub ★

---

### `/hair-loss` — Hair Loss Pillar Page

**Brief ref:** §4.4 (Pillar page), §7.2 (Pillar-and-Cluster Architecture)

Explicit section list not specified in brief. Per §7.2, pillar page must include:
- Explore section linking to all cluster children
- Sidebar navigation showing cluster structure (desktop)

---

### `/hair-loss/male-pattern-baldness` — Male Pattern Baldness ★
### `/hair-loss/female-pattern-hair-loss` — Female Pattern Hair Loss ★
### `/hair-loss/alopecia-areata` — Alopecia Areata ★
### `/hair-loss/postpartum-hair-loss` — Postpartum Hair Loss ★
### `/hair-loss/stress-related-hair-loss` — Stress-Related Hair Loss ★
### `/hair-loss/traction-alopecia` — Traction Alopecia ★
### `/hair-loss/receding-hairline` — Receding Hairline ★
### `/hair-loss/crown-thinning` — Crown Thinning ★

**Template:** Condition Page Template — applies to all 8 pages above (Brief §5.3)

| # | Section |
|---|---------|
| 1 | **Hero** — condition name, prevalence statistic, one-line description |
| 2 | **Symptoms checklist** — interactive self-assessment, captures email |
| 3 | **Causes** — bulleted with citations |
| 4 | **Diagnosis** — what a clinician will do |
| 5 | **Treatment options** — linked tiles to relevant treatment pages |
| 6 | **Prevention & lifestyle** |
| 7 | **Related articles** |
| 8 | **Find-a-clinic call-out** |

---

## Zone 5 — Resources / Editorial Hub ★

---

### `/resources` — Resource & Article Index

**Brief ref:** §4.5 (Article index, filterable by category), §6.3 (deliverable: Resource hub / category index)

Explicit section list not specified in brief. Must support filtering by category.

---

### `/resources/[category]` — Category Pages ★

**Brief ref:** §4.5, §6.3

Section structure not specified in brief.

---

### `/resources/[slug]` — Individual Article ★

**Template:** Resource Article Template (Brief §5.4)

| # | Section / Component |
|---|---------------------|
| 1 | **Sticky table of contents** — desktop left rail, mobile collapsible |
| 2 | **Author + medical reviewer block** — photos, credentials, last-reviewed date (at top) |
| 3 | **Article meta** — reading time, category breadcrumb, share buttons |
| 4 | **Article body** — editorial typography: serif, 1.7 line-height, max 70-character line length |
| 5 | **Inline citations** — hover-reveal source previews |
| 6 | **Pull-quote and key-takeaway components** — in-body |
| 7 | **In-article CTA modules** — assessment, find-a-clinic (non-ad treatment, per Healthline pattern) |
| 8 | **Related articles rail** — foot of page |

---

### `/resources/comparisons/[slug]` — Comparison Pages ★

**Brief ref:** §4.5 (e.g., FUE vs FUT), §6.3 (Comparison page template listed as deliverable)

Section structure not specified in brief.

---

## Zone 6 — Provider (B2B)

---

### `/for-providers` — For Providers Landing

**Brief ref:** §5.6, §6.3

| # | Section |
|---|---------|
| 1 | **Hero** — '[X] verified clinics use Hairline to fill their books', CTA: 'Book a demo' |
| 2 | **Logo wall** — existing partner clinics |
| 3 | **Three-pillar value prop** — Pre-qualified patients · Lower CAC · Operational tools |
| 4 | **Dashboard showcase** — scroll-synced module showing provider dashboard screens (mirrors consumer scroll module, different content) |
| 5 | **Case studies** — real clinics with before/after metrics |
| 6 | **Pricing teaser** — or commission model explanation |
| 7 | **Compliance & security** — HIPAA, GDPR, data-protection statements |
| 8 | **FAQ for clinic owners** |
| 9 | **Final CTA** — 'Book your demo' |

---

### `/for-providers/features` — Features

**Brief ref:** §4.6 (listed, section structure not specified in brief)

---

### `/for-providers/enterprise` — Enterprise

**Brief ref:** §4.6 (listed, section structure not specified in brief)

---

### `/for-providers/case-studies` — Case Studies

**Brief ref:** §4.6 (listed, section structure not specified in brief)

---

### `/for-providers/pricing` — Pricing *(future)*

**Brief ref:** §4.6 (marked future, section structure not specified in brief)

---

### `/for-providers/book-demo` — Book a Demo

**Brief ref:** §4.6 (listed), linked from /for-providers Hero CTA and Final CTA (§5.6). Section structure not specified in brief.
