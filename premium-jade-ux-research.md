# Premium E-Commerce / Luxury UI-UX Research
## For a high-end Chinese antique jade selling website

**Method note.** Everything marked **[VERIFIED]** was extracted directly from the live production CSS/HTML/font-kits of the named site (via `curl` + parsing), not from secondary write-ups. Hex values, font stacks, px sizes, easing curves and label strings in those sections are literal production values. **[REPORTED]** means it comes from an industry source and is directional.

---

## CONTENTS

| § | Section | Read this if you want… |
|---|---|---|
| **0** | The ten rules that separate luxury from mid-market | The one-page summary |
| **1** | Premium jewelry auction houses — **Christie's, Sotheby's, Bonhams, Phillips** | Verified design tokens + lot-page anatomy |
| **2** | High-end jade / Chinese art dealers — **1stDibs**, Artsy, Gagosian, Asian art dealers | PDP anatomy, filter facets, vetting architecture |
| **3** | Luxury DTC maisons — **Cartier, VCA, Boodles, Piaget, Tiffany** | Palettes, fonts, the luxury web-design law |
| **4** | Premium marketplace UX | Filtering quantity-1 items, offer/enquire flows, saved items |
| **5** | **"Price on request" / enquire** for high-value unique items | The evidence-based policy + the hybrid to implement |
| **6** | Chinese / Asian art conventions | Bilingual layout, Chinese typography, **vertical text**, **seal motifs** |
| **7** | Consolidated design system — ready to build | Palette, type scale, motion, photography, PDP component list |
| **8** | Source list (primary + secondary) | |
| **9** | Jade-specific substance | The `/authenticity` page spec, colour vocab, measurement |
| **10** | **Gap analysis vs. the existing 玉語軒 build** | What's already right, and the 18 concrete gaps |
| **11–12** | Jade sources; technical/SEO for a price-on-request catalog | JSON-LD, hreflang, bilingual slugs |
| **13** | **What to do first** — prioritised build order | The 10-item action list |
| **14** | **Jade appendix** — corrections, quantifications, legal flags | 🔴 Read §14.1 and §14.10 before publishing listing copy |

⚑ **If you read only three things:** §0 (the rules), §13 (the build order), and §14.1 + §14.10 (the correctness and legal flags).

---

# 0. THE TEN RULES THAT ACTUALLY SEPARATE LUXURY FROM MID-MARKET

Distilled from everything below. If you implement nothing else, implement these.

| # | Rule | Concrete implementation |
|---|---|---|
| 1 | **Whitespace is the price signal.** | Section vertical padding 96–160px desktop / 48–64px mobile. Never fill a row because it looks empty. Content column ≤ 1128px, article column ≤ 684px. |
| 2 | **Two typefaces, no more.** One high-contrast serif for display; one neutral sans for UI/labels. | Serif at weight 300–400 only. Sans never above weight 500. |
| 3 | **Labels are tiny, uppercase, sans — with *either* wide tracking or none at all.** | 11–12px, `text-transform: uppercase`, weight 400–500. **Sotheby's & 1stDibs track them 1px; Christie's tracks them ZERO** (exactly one `letter-spacing` declaration exists in 511KB of their CSS). Both read as luxury. What they share: small size + uppercase + light weight. |
| 4 | **Headings are large, light, tightly leaded, serif.** | 32–80px, weight 300–400, `line-height: 1.05–1.2`. Negative tracking only on very large serif display (−0.5 to −2px), as 1stDibs does. |
| 5 | **The palette is monochrome + exactly one metal accent.** | Ink + ivory + 1 gold/brass. No second brand colour. Christie's uses literally zero colour. |
| 6 | **Photography is the product.** Object silhouetted against flat ground, consistent lighting direction, no props, no lifestyle clutter on the object shot. | Two backgrounds per object: warm ivory and near-black. |
| 7 | **Motion is slow, short-distance and ease-out.** | 0.3–0.6s, 8–24px translateY, opacity 0→1, `cubic-bezier(0.39, 0.58, 0.57, 1)`. Never bounce, never parallax-jack. |
| 8 | **Every object has a dossier, not a description.** | Ordered sections: Provenance / Condition / Literature / Expert note. |
| 9 | **Scarcity replaces price.** | "Unique piece", "1 of 1", "On hold", "Sold", "Price on request". |
| 10 | **One human, named, reachable.** | A specialist card with photograph, title, direct phone and email — not a generic `info@`. |

---

# 1. PREMIUM JEWELRY AUCTION HOUSES

## 1.1 Christie's — **[VERIFIED, from their public design system CSS]**

Christie's ships a public design-system stylesheet (`dsl.assets.christies.com/design-system-library/production/christies-design-system-library.css`). These are literal production values.

### Typography
Two faces, both from **Dinamo**:

```css
/* Display / editorial */
font-family: "ABCArizonaSerif", serif;   /* weight 300 only */
/* UI / labels / body */
font-family: "ABCArizonaSans", sans-serif;
```

| Token | Family | Size | Weight | Line-height |
|---|---|---|---|---|
| `.chr-heading-m-serif` | ABCArizonaSerif | 20px → 24px → **32px** | 300 | 1.2 |
| `.chr-heading-s-sans` | ABCArizonaSans | 16px → 18px | 300 | 1.2 |
| `.chr-heading-xs-serif` | ABCArizonaSerif | 16px → 18px | 300 | 1.2 |
| `.chr-heading-xs-sans` | ABCArizonaSans | 14px → 20px | 300 | 1.2 |
| `.chr-body-medium` | ABCArizonaSans | 16px | 400 | 1.4 |
| `.chr-body-s` | ABCArizonaSans | 14px → 16px | 300 | 1.4 |
| `.chr-body-xs` | ABCArizonaSans | 12px → 14px | 300 | 1.4 |
| `.chr-body-link` | ABCArizonaSans | 14px | 500 | underline |
| **`.chr-label`** | ABCArizonaSans | **14px** | 300 | **UPPERCASE** |
| **`.chr-label-s`** | ABCArizonaSans | **12px** | 400 | **UPPERCASE** |
| **`.chr-label-caps`** | ABCArizonaSans | **12px** | 500 | **UPPERCASE**, lh 1.3 |
| `.chr-action` | ABCArizonaSans | 12px | 500 | UPPERCASE |
| `.chr-action-m` | ABCArizonaSans | 16px | 400 | UPPERCASE |
| `.chr-action-l` | ABCArizonaSans | 18px | 300 | UPPERCASE |

**Note the counter-intuitive thing:** headings are *lighter* than body copy (300 vs 400). The typographic "luxury" comes from weight contrast and size, not tracking.

⚑ **Verified negative finding, and it matters:** searching all **511KB** of Christie's production design-system CSS returns **exactly ONE `letter-spacing` declaration** — `-0.001em`. Their `.chr-label`, `.chr-label-s` and `.chr-label-caps` have **zero tracking**. They achieve the luxury-label look with **small size + `text-transform: uppercase` + light weight (300/400/500)** alone. Sotheby's and 1stDibs, by contrast, use **1px**. Both approaches read as expensive — so **do not treat wide tracking as a requirement.** For CJK this is doubly relevant: Chinese glyphs *should not* be tracked, so a system that relies on size/weight/case rather than tracking is more portable to a bilingual build.

### Colour palette — **[VERIFIED]**
```css
:root{
  --c-accent:      0, 0%, 100%;      /* #FFFFFF */
  --c-dominant:    0, 0%, 13.3%;     /* #222222  ← the ink */
  --c-grey:        0, 0%, 97%;       /* #F7F7F7  ← the surface */
  --c-black:       0, 0%, 0%;        /* #000000 */
  --c-grey-alpha-10: rgba(0,0,0,.10);
  --c-grey-alpha-40: rgba(0,0,0,.40);
  --c-grey-alpha-60: rgba(0,0,0,.60);
  --c-grey-alpha-80: rgba(0,0,0,.80);
  --c-white-alpha-10/40/60/80: rgba(255,255,255,.1/.4/.6/.8);
}
```
Accent utilities (the *only* chromatic values in the system):
- `.chr-color-red-brand` → **`#990000`** (Christie's red)
- `.chr-color-red` / `.chr-color-red-alert` → **`#D70C00`**
- `.chr-color-positive-teal-dark` → **`#0A7F7F`**
- `.chr-color-turquoise-light` → **`#1CD6D9`**

**Takeaway: the entire Christie's interface is black, white and one grey. Colour is reserved for state (sold / alert / positive), never for decoration.**

### Spacing & grid — **[VERIFIED]**
- Scale (px): `4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 88, 128`
- Most-used values in order: **16, 24, 12, 8, 4** (mobile) → **40, 32, 48, 80, 64** (desktop)
- Component section padding: `.chr-section { padding: 24px 0 }` mobile → `40px 0` desktop
- Container widths: **1128px** (page), 940 / 900 / 886 / 776 / 736px (text columns), 552px (form/modal)
- Aspect ratios in use: `8/5`, `16/9`, `7/8`, `1128/680`, `8/3`
- `object-fit: contain` and `cover` used in equal measure (contain for objects, cover for editorial)

### Motion — **[VERIFIED]**
```css
transition-duration: 0.15s;  /* hover / micro  — 42 uses */
transition-duration: 0.3s;   /* standard       — 64 uses */
transition-duration: 0.5s;   /* large reveals  — 28 uses */
transition-duration: 1s;     /* hero / curtain — 18 uses */
transition-timing-function: cubic-bezier(0.39, 0.58, 0.57, 1);  /* 152 uses — THE house easing */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);       /*  6 uses — standard */
scroll-behavior: smooth;
backdrop-filter: blur(12px) saturate(0.5);   /* sticky header */
will-change: transform;
```
`cubic-bezier(0.39, 0.58, 0.57, 1)` ≈ easeOutSine. **Adopt this exact curve.**

### Component inventory — the ones that matter for a lot page **[VERIFIED class names]**
```
chr-button-enquire-lot          ← "Enquire" is a first-class design-system button
chr-enquiry-form
chr-lot-header                  chr-lot-header--collapsed    chr-lot-header--full
chr-lot-header-gallery-button
chr-lot-navigation              chr-lot-number               chr-lot-section
chr-lot-details                 chr-lot-info                 chr-lot-video
chr-lot-essay                   chr-shorthand-lot-essay      chr-lot-article(s)
chr-lot-disclaimer (--grey / --red)   chr-lot-restriction     chr-lot-legal-symbols (+modal)
chr-gallery                     chr-gallery-quick-view       chr-scale-viewer
chr-art-viewer                  chr-art-viewer-title-bar
chr-cross-fading-images         chr-cross-fading-media__video
chr-specialist (--large)        chr-specialist-info          chr-specialist-list
chr-contact-accordion           chr-white-glove              ← literally named
chr-live-chat                   chr-saved-lots               chr-my-lots
chr-price-range                 chr-quick-filters            chr-selected-filters-block
chr-anchor-link-vertical        ← vertical section nav
chr-countdown-timer             chr-lot-timer
chr-accordion                   chr-drawer                   chr-modal
chr-section--black / --grey / --white
chr-editorial-layout            chr-ed-text-3col             chr-ed-media-2col
chr-immersive-banner            chr-hero-video
chr-language-selector
```

### Christie's lot-page section order — **[VERIFIED, live lot page]**
`/en/lot/lot-5549063` extracted in document order:

1. **Auction breadcrumb bar** — `Live Auction 3503 · 500 Ans : Arts Décoratifs Européens`
2. **Prev / Next lot pagination** — `‹ Lot 34 ›` (arrows + lot number, no titles)
3. **Hero image** — single dominant image, `?w=1` responsive param (progressive by width)
4. **Lot title, two-part** — headline (object type) then a second line in the same heading block for the inscription/marks
5. **`Details`** — long object description; ends with a **measurement line in two units**: `Longueur: 34 cm. (13 3/8 in.)`
6. **`Provenance`** — its own headed block, prose
7. **`Further details`** — italic English translation of the lot title
8. **`Brought to you by`** — roundel avatar + specialist name, then the sentence *"Check the condition report or get in touch for additional information about this"*, then **direct email link** and **direct tel link** (`tel:+33(0)140768372`)
9. **Condition report (gated)** — *"If you wish to view the condition report of this lot, please sign in to your account."* → `Sign in` → `View condition report`
10. **`Lot Essay`** — long-form scholarship with **bold inline subheads** (`L'historique`, `La conception`, `Eléments de comparaison`) — a 3-part structure: history → conception/craft → comparables
11. **`More from <Auction>` → View All** — related lots carousel

**Key insight:** no price anywhere on this page. The estimate is deliberately withheld and replaced by a sign-in + specialist contact. This is the "price on request" pattern implemented as institutional policy.

### Christie's production i18n label strings — **[VERIFIED, EN + ZH]**
Extracted verbatim from their JS label dictionaries:

```json
// English
{ "lot_txt": "Lot", "lot_ended_txt": "Lot has ended", "current_bid_txt": "Current bid",
  "estimate_txt": "Estimate", "estimate_on_request_txt": "Estimate on request",
  "price_on_request_txt": "Price on request", "price_realised_txt": "Price realised",
  "save_txt": "Save", "saved_txt": "Saved",
  "follow_txt": "Follow", "followed_txt": "Followed", "unfollow_txt": "Following",
  "closed_txt": "Closed", "closing_txt": "Closing",
  "happening_now_txt": "Happening Now", "starting_txt": "Starting",
  "days_txt": "days", "hours_txt": "h", "minutes_txt": "m", "seconds_txt": "s",
  "item_current_of_total_txt": "Item {current} out of {total}",
  "previous_txt": "Slide to previous item", "next_txt": "Slide to next item" }

// Traditional Chinese (zh-Hant) — same file
{ "lot_txt": "Lot", "view_all_txt": "瀏覽更多",
  "follow_txt": "關注", "followed_txt": "已關注", "unfollow_txt": "關注中",
  "section_title": "熱門拍品", "trending_top_searches_txt": "時下熱搜",
  "login_modal_title_txt": "登入您的帳戶",
  "login_modal_title_from_live_chat_txt": "请登录或创建帐户以与客户服务代表聊天",
  "refresh_modal_title_txt": "您已退出登录！",
  "aria_notification_center_txt": "通知中心",
  "aria_main_nav_txt": "主", "aria_menu_txt": "菜單", "aria_search_txt": "搜索" }
```

Two things worth stealing outright:
- **`"Item {current} out of {total}"`** — the gallery counter, templated.
- **Live chat is login-gated**, and the copy explains why: *"Sign in or create an account to chat with a customer service representative."* Concierge is a privilege, not a widget.
- Note their ZH site is **zh-Hant (Traditional)** throughout, and several strings are still untranslated English — bilingual sites don't have to be 100% translated, but labels should be.

---

## 1.2 Sotheby's — **[VERIFIED, from their webfont kit + production styleguide CSS]**

### Typography — the definitive bilingual answer
Sotheby's loads from a Monotype `fonts.net` kit:

```css
font-family: "MercuryDisplay";          "MercuryDisplayRegular";
font-family: "MercuryDisplaySemibold";  "MercuryDisplayItalic";
font-family: "BentonSansProBook";       "BentonSansProRegular";
font-family: "BentonSansProMedium";     "BentonSansProBold";
```

Per Pentagram's own case study (Abbott Miller, 2013–14):
> "Mercury is the primary typeface, with **Benton Sans** as the secondary font. **Freight Display** is a tertiary typeface employed for display and headlines. Miller commissioned the acclaimed type designer **Akira Kobayashi of Monotype to draw custom Chinese characters for Sotheby's Hong Kong wordmark that would pair gracefully with the Mercury**."

⚑ **This is the single most important typographic lesson for your project.** Sotheby's did not pick a Chinese font — they *commissioned Chinese glyphs drawn to match the Latin serif*. A jade house's Chinese wordmark should be a custom-drawn 篆刻/宋體-style mark designed against the chosen Latin serif's skeleton, not a Google Font.

### The Chinese font stacks — **[VERIFIED, straight from their CSS]**
```css
/* Chinese DISPLAY — Ming/Song serif paired with Mercury */
:lang(zh) h1, :lang(zh) h2, :lang(zh) h3, :lang(zh) h4, :lang(zh) h5, :lang(zh) h6 {
  font-family: PMingLiu, MercuryDisplayRegular, "Mercury Display A",
               "Mercury Display B", MercuryDisplay, serif;
}
/* Chinese UI / BODY — Hei sans paired with Benton Sans */
.SomeComponent:lang(zh) {
  font-family: Jhenghei, BentonSans, sans-serif;
}
```
- **`PMingLiu` (新細明體)** = Traditional Chinese Ming/Song serif → pairs with the Latin serif
- **`Jhenghei` (微軟正黑體)** = Traditional Chinese Hei/gothic sans → pairs with the Latin sans

⚑ **The rule to copy: `宋體/明體 serif → serif`, `黑體 sans → sans`.** Never cross them. And use `:lang()` selectors so the swap is automatic and the Latin fallback stays in the stack for mixed runs.

### Colour palette — **[VERIFIED, frequency-ranked from production CSS]**
| Hex | Role | Uses |
|---|---|---|
| **`#00253E`** | **Deep ink navy** — primary text + dark surfaces | 206 |
| **`#23448D`** | Royal / lapis blue — links, active | 236 |
| **`#C29B40`** | **Muted gold / brass** — premium accent | 132 |
| **`#D6BC7E`** | Light gold — hover / secondary accent | 6 |
| **`#B29041`** | Dark gold | 1 |
| **`#F1F1F1`** | Light grey surface | 134 |
| **`#CECECE`** | Border / divider | 110 |
| **`#E9EEF9`** | Pale blue tint surface | 6 |
| **`#748794`** | Slate blue-grey — secondary text | 57 |
| `#677883` | Slate grey — meta text | 1 |
| `#6B6B6B` | Mid grey | 45 |
| `#333333` / `#2A2A2A` / `#292929` | Near-black alt | 3 |
| **`#F24F5A`** | Coral — live / urgent | 7 |
| **`#DD2415`** | Alert red | 2 |

Also used as alpha: `rgba(0,37,62,·)` (19×), `rgba(194,155,64,·)` (3×).

⚑ **`#00253E` deep ink navy + `#C29B40` muted brass is a ready-made, fully-verified luxury palette for jade** — the blue reads as Chinese porcelain/lapis, the brass reads as gilt bronze. Both are culturally native to Chinese antiques.

### Type scale & tracking — **[VERIFIED]**
- Font sizes present: `10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 60, 64px`
- Most used: **14px (276×)**, 16px (203×), 20px (102×), 12px (95×), 24px (70×), 32px (52×)
- Letter-spacing: **`1px` (201 uses — the default label tracking)**, `.5px` (84), `.2px` (70), `.8px` (17), `.57px` (15), `3px` (3 — hero eyebrows)

Literal label recipes **[VERIFIED]**:
```css
/* primary link/label */
.Link{ color:#00253e; font:500 14px/30px BentonSans,sans-serif;
       text-transform:uppercase; letter-spacing:1px; }

/* micro-label */
.QuickCard-details{ color:#000; font:350 12px/24px BentonSans,sans-serif;
                    text-transform:uppercase; letter-spacing:1px; }

/* tab */
.tabTitle{ color:#333; font:500 14px/20px BentonSans,sans-serif;
           letter-spacing:1px; text-transform:uppercase; padding-right:24px; }

/* timestamp */
.AuctionShowingTime{ font:350 14px/20px BentonSans,sans-serif; letter-spacing:1.16px; }

/* price/estimate line */
.QuickCard-salePrice{ font:200 14px/20px BentonSans,sans-serif;
                      letter-spacing:.5px; text-transform:uppercase; }
```
⚑ Note `font-weight: 200` and `350` in production — **non-standard weights on a variable font**. Benton Sans Pro ships as a variable face, so they dial in 350/200 for a whisper-thin look. If you use a static face, map these to 300.

### Exact colour roles — **[VERIFIED, traced through their rules]**
| Hex | Actual role in production |
|---|---|
| **`#00253E`** | **Ink.** Headings, links, labels, meta text — e.g. `.QuickCard-catalogue a{color:#00253e}`, `.RegisterToBidAuctionLink-label{color:#00253e}` |
| **`#23448D`** | **Primary CTA / default link.** `.QuickCard-cta a:hover{background:#23448d}`, carousel active dot, base `<a>` colour |
| **`#C29B40`** | **Gold = hover + ornament.** Primary buttons flip **navy → gold on hover**; the `[data-gold]` module background; and — most usefully — **a decorative rule under section headings**: `.CollapsibleList-title:after{content:"";display:block;margin-top:8px;width:91px;height:2px;background:#c29b40}` |
| `#F1F1F1` / `#CECECE` | Surface / border |
| `#748794` / `#6B6B6B` | Secondary and meta text |

⚑ **The 91px × 2px gold hairline under a section heading is Sotheby's signature ornament.** 玉語軒 already implements the same idea at `.eyebrow::after{height:1px;width:46px;background:var(--gold);opacity:.5}` — consider nudging toward a 2px weight and a longer run (~72–91px) at section level for a slightly more authoritative cadence, and keep the 46px version on eyebrows.

⚑ And the **navy → gold button hover** is a cheap, high-impact micro-interaction worth copying directly: `.btn::before` is already a `translateY` wipe — changing the wipe's target colour from `--gold` to a deep ink (or vice versa) reproduces it, but 玉語軒's wipe is arguably more distinctive. Keep the wipe.

### Grid — **[VERIFIED]**
- `grid-template-columns: repeat(12, 1fr)` (10×), `repeat(8,1fr)` (5×), `repeat(4,1fr)` (5×)
- Container `max-width: 1440px`; article column `684px`; sidebar/aside `548px`; card `330px`
- Breakpoint container caps: 767 / 920 / 1440px

### Sotheby's lot-page section order — **[VERIFIED, live lot page]**
`/en/buy/auction/2024/magnificent-jewels-ii/sapphire-and-diamond-bracelet-…` in document order:

1. **Bilingual page title** — `Sapphire and Diamond Bracelet | 藍寶石 配 鑽石 手鏈`
2. **Lot number + bilingual title** — `1604. Sapphire and Diamond Bracelet / 藍寶石 配 鑽石 手鏈`
3. **`Log in to view results`**
4. **Sale name link** — `Magnificent Jewels II`
5. **`Lot 1604`**
6. **Credit line / provenance teaser** — `Property of a Private Collector`
7. **Title repeated (large)** — EN then ZH on separate lines
8. **Status** — `Lot Closed`
9. **Closing datetime** — `October 8, 02:05 AM GMT`
10. **`Estimate` — `40,000 - 80,000 HKD`** ← *estimate appears BEFORE the description*
11. **Legal micro-notice** — `We may charge or debit your saved payment method subject to the terms set out in our Conditions of Business for Buyers. Read more.`
12. **`Lot Details` → `Description`** — prose, ending with `length approximately 153mm.`
13. **`Condition report` → `Please log in`** ← gated
14. **`You May Also Like`** — related lots, each with bilingual title + estimate

**Sotheby's lot UI strings [VERIFIED]:**
```
"Authenticity guaranteed"
"Save lot"  /  "Bid details"  /  "Set your maximum bid"
"Bids will be entered on your behalf up to your selected max bid."
"For further information on the condition of this lot please contact"  [specialist]
"Select your maximum bid. Your bid will remain private until the lot opens.
 At the live auction, the auctioneer will bid on your behalf, up to this maximum amount."
"Buy Now"   "Current bid amount"   "{{ numberOfBids }} Bids"   "Lot closing extended"
"Conditions of sale"
```
Lot tags in the data model: `["NoReserve"]`, plus `premiumLotState`.

**Sotheby's bilingual lot-title convention [VERIFIED]** — the pattern is `English Title | 中文標題`, with Chinese characters **space-separated for legibility**:
```
Sapphire and Diamond Bracelet | 藍寶石 配 鑽石 手鏈
Buccellati Group of Diamond Jewellery | 吉安馬里亞 布契拉提 及 布契拉提 | 品牌鑽石珠寶一組
Ruby and Diamond Brooch and Cultured Pearl … 
Cultured Pearl and Diamond Demi-Parure | 養殖珍珠 配 鑽石 掛墜 配 戒指 及 耳環套裝
Fancy Deep Yellowish Orange Diamond and Diamond Ring | 1.24克拉 深彩黃橙色鑽石 配 鑽石 戒指
Spinel and Diamond Ring | 5.82克拉 天然「緬甸」未經加熱尖晶石 配 鑽石 戒指
```
Dismantle that last one, because **this is exactly the grammar you need for jade**:
- `5.82克拉` = carat weight *first*
- `天然` = natural (treatment disclosure — **mandatory**)
- `「緬甸」` = origin in **corner brackets 「」**
- `未經加熱` = unheated (treatment)
- `尖晶石` = species
- `配` = "accompanied by / matched with" (the universal connector)
- `鑽石 戒指` = accent stones + object type

→ For jade: **`天然翡翠 配 鑽石 戒指`** / **`天然翡翠手鐲`** / `緬甸天然翡翠 蛋面 配 鑽石 掛墜`. Use `「」` for origin, `配` for accents, and always lead with `天然` when untreated.

**URL slugs [VERIFIED]** mix English + pinyin: `/sapphire-and-diamond-bracelet-lan-bao-shi-pei-zuan/`, `/diamond-necklace-ka-de-ya-zuan-shi-xiang-lian/`. Good for SEO in both markets.

**Sotheby's lot data model [VERIFIED keys]:** `lotId, lotSlug, lotNumber, lotDisplayNumber, title, images, imageSize, lowEstimate, highEstimate, estimateV2, currency, currencyV2, currentBidV2, latestBid, startingBidV2, finalPriceV2, isSold, sold, numberOfBids, bidState, bidMethod, bidTypeV2, bidPhase, timedBidPhase, auctionBidPhase, premiumLotState, lotTags, acceptsBids, conditionsOfSale, exhibitions, enrichedCatalogueContentEnabled`

---

## 1.3 Bonhams — **[VERIFIED, live lot page]**

Section order:
1. Breadcrumb: `Auction name / Lot name`
2. **`Previous Lot` / `Next Lot`** (full text links, not arrows)
3. **Image gallery** — large image + thumbnail strip; image URL pattern carries `width=` and `angle=` params (`&angle=180.00&width=650`) → they support **multi-angle rotation views**
4. `Lot 4*` (asterisk = lot symbol)
5. **Title** (large serif)
6. **Auction name link**
7. **`Ending from 22 September 2026, 10:00 BST`** — verbose, unambiguous datetime
8. **Location** — `Online, London, Knightsbridge` (linked)
9. **Estimate** — `£700 - £900` — *prominent, standalone*
10. **`Follow` · `Share`**
11. **Action bar (4 inline text links):**
    - `How to bid`
    - `Get shipping quote` ← *deep-links into a third-party shipping calculator widget*
    - `Request condition report` ← *mailto with a pre-filled subject*
    - `How to buy`
12. **`Keep me updated`** — `Follow this lot` → "Follow to get an email when this lot is open for bidding."
13. **`Ask about this lot`** — specialist card: **photo**, name, **`Head of Department`**, `Tel:` link, obfuscated email link
14. **Title repeated** + **date** (`Circa 1st-2nd Century A.D.`) + **dimensions in italic** (`9.5cm high`)
15. **`Footnotes` → `Provenance:`** — prose
16. **Accordion:** `Auction information` · `Lot Symbols` · `Related Departments` · `Conditions of Sale`

⚑ Bonhams is the best model for the **action bar** pattern: four equal-weight text links under the estimate, each a distinct high-intent action (bid / ship / condition / how). And **`Get shipping quote` as a first-class action** is directly applicable to shipping jade internationally.

---

## 1.4 Phillips — **[VERIFIED, live lot page]**

Section order:
1. Breadcrumb `Jewels / Jewels & More: Online Auction / Lot 261`
2. **`Select lot`** — a *horizontal scroller of every lot number in the sale* (201…335) for instant jumping. Excellent for a collection of jade pieces.
3. Image gallery (`?fit=cover&offset-x=50&offset-y=100&width=928`)
4. **Consignment credit** — `From a Private Collection`
5. **Badge** — `No Reserve`
6. `261` (lot number, oversized) then **title** `Turquoise Necklace`
7. **`Estimate`** `$2,000–4,000` • **`Sold For`** `$756` (sold price shown adjacent to estimate for comparison)
8. **`Favorite`** (not "Save")
9. **`Lot Details`** — description with material callout in italics: *"…mounted in silver, length approximately 25 inches."*
10. **`Read Conditions of Sale`** (PDF link)
11. **`Specialist`** — deliberately sparse; just the heading
12. Footer with `weixin.qq.com` and `xiaohongshu.com` links ← **Chinese social channels in the global footer**

---

## 1.5 Cross-house synthesis: the canonical premium lot page

Merging all four, in the order that maximises trust and minimises bounce:

| # | Section | Why |
|---|---|---|
| 1 | Breadcrumb (sale / department / lot) | Orientation + SEO |
| 2 | Prev / Next lot + **lot-number scroller** | Keeps collectors browsing the collection |
| 3 | **Hero gallery** — 1 dominant image + thumb strip + counter `Item 3 of 24` | The product *is* the page |
| 4 | Lot number (oversized, sans, letterspaced) | Catalogue identity |
| 5 | **Bilingual title** `EN | 中文` | Dual-market credibility |
| 6 | **Credit line / provenance teaser** (`Property of a Private Collector`) | Instant legitimacy |
| 7 | **Status pill** — Available / On hold / Sold / No Reserve | Scarcity |
| 8 | **Price block** — Estimate range, OR `Price on request` + Enquire button | See §5 |
| 9 | **Primary CTA row** | Enquire · Book a viewing · Request condition report · Share |
| 10 | **`Details`** — description prose, ending with **dimensions in dual units** | |
| 11 | **`Provenance`** — headed, prose, dated | The #1 value driver for antiques |
| 12 | **`Condition Report`** — summary + gated full report | |
| 13 | **`Certificate / Authentication`** — lab, report number, verifiable link | Jade-specific, see §2 |
| 14 | **`Literature` / `Exhibited`** — citations | Museum-grade credibility |
| 15 | **`Expert Note` / `Lot Essay`** — signed, 3-part: history → craft → comparables | |
| 16 | **Specialist card** — photo, name, title, direct tel, direct email | |
| 17 | **`Shipping & Import`** — quote CTA, not a policy dump | |
| 18 | **`Enquire` form** — the durable lead capture | |
| 19 | **`More from this collection`** carousel | |
| 20 | Legal micro-notice (conditions of business) | |

---

# 2. HIGH-END JADE / CHINESE ART DEALERS

*(Jade-specific grading, certification and photography detail is in §7 and the companion section appended below.)*

## 2.1 1stDibs — **[VERIFIED, live product page + production CSS]**

### Typography
```css
/* Display serif */
font-family: "Cardinal Classic Short", Georgia, "serif";
/* UI/body sans — Adobe Typekit kit mkk3fxh */
font-family: proxima-nova, "Helvetica Neue", helvetica, arial, "sans-serif";
```
| Token | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Banner / hero serif | **80px** | 400 | `-2px` normal, `0` italic | 1.1 |
| Banner serif small | **52px** | 400 | `-1px` normal | 1.4 |
| H1 serif | **32px** | 400 | | 1.4 |
| H2 serif | **24px** | 400 | `-0.5px` | 1.4 |
| H3 serif | **20px** | 400 | `-0.5px` | 1.4 |
| Sans sizes present | 10, 12, 14, 16, 18, 20, 24, 28, 32, 38px | | **`1px` on labels** | |

⚑ **1stDibs is the only one of the four that uses NEGATIVE letter-spacing** — but only on the large serif display (−0.5 to −2px), to tighten big type. Labels still get +1px. This is the correct, professional pattern: **negative tracking on display serif, positive tracking on small sans caps.**

### Colour palette — **[VERIFIED]**
| Hex | Role |
|---|---|
| **`#C2A661`** | **Gold** — primary accent |
| **`#A48E45`** | Dark gold |
| **`#F6F3EB`** | **Warm ivory / cream** — the signature surface |
| **`#950808`** | **Oxblood / deep red** — brand |
| `#204664` `#436B93` | Slate / steel blue |
| `#0D7D77` `#0F8D88` | Deep teal |
| `#2A7140` `#66A559` | Green (state) |

⚑ **`#F6F3EB` warm ivory + `#C2A661` gold + `#950808` oxblood** is a directly applicable jade-house palette — the ivory flatters green jade, the gold reads as gilt bronze mounts, the oxblood reads as 朱砂 seal paste.

### 1stDibs PDP anatomy — **[VERIFIED, exact document order]**
1. **Breadcrumb** — `Home › Furniture › Case Pieces and Storage Cabinets › Dressers`
2. **Mega-menu header** — filter-entry nav: `Shop by Category` / `Shop by Style` / `Shop by Creator` / `New Arrivals` / `More Ways to Shop`
3. **`Items Similar to <title>` → `View More`** — a related-items rail. ⚑ **Verified by DOM offset, this sits *before* the breadcrumb and the gallery** (offset 65,684 vs breadcrumb 78,642) — so it is either a visually-collapsed/mobile-only module or a deliberate cross-sell placed ahead of the product. Either way it is worth knowing that 1stDibs ships it *above* the product in the markup.
4. **Image gallery** — `1 of 24` counter (verified order: `Want more images` → `Contact Seller` → `1 of 24` → `<h1>` title)
5. **Gallery-level service CTA (inside the gallery panel):**
   > **`Want more images or videos?`**
   > `Request additional images or videos from the seller`
   > **[ `Contact Seller` ]**
   
   ⚑ *This is the single best idea on the page.* A pre-emptive, low-commitment ask placed where the doubt occurs, with a copy line that names the exact hesitation ("more images or videos").
6. **Title** (`h1`, serif)
7. **Sticky tab bar** — `Item Details` · `Seller Information` · `Shipping & Returns`
8. **`About the Item`** — prose. Ends with a **condition statement + a photo directive**:
   > "Good vintage condition with light wear consistent with age and use. The drawers open and close properly. **Please review every photograph for the most complete condition record.**"
9. **Spec table** — in this exact order:
   - `Dimensions:` — **dual units**, e.g. `Height: 49.5 in (125.73 cm)`
   - `Style:` (linked)
   - `Materials and Techniques:` (linked, comma-separated)
   - `Period:` (linked)
   - `Date of Manufacture:`
   - `Condition:` (linked)
   - `Seller Location:`
   - **`Reference Number:` — two of them: `Seller: vendoo:4RmT2fFHBtLJl8GDoYb6` and `1stDibs: LU9796242935072`**
10. **`About the Seller`** — the trust block, in order:
    - `4.5` ★ + `2 Reviews`
    - `Located in Rancho Cucamonga, CA`
    - **`Vetted Professional Seller`** badge, with tooltip: *"Every seller passes strict standards for authenticity and reliability"*
    - `1stDibs seller since 2024`
    - `23 sales on 1stDibs`
    - **`Typical response time: <1 hour`** ← ⚑ *excellent, rarely-copied signal; converts a human into a service level*
11. **`Shipping`** — `Retrieving quote…`, `Shipping from:`
12. **`Return Policy` → `Details`**
13. **`Categories`** / **`Creators`**
14. **`Questions & Answers`**
15. **`Trade` → `Trade Program`**

### 1stDibs filter facets & sort — **[VERIFIED, production strings]**
Facets (exact labels):
```
Category · Creator · Jewelry Type · Stone Cut · Style · Period · Gender
Dimensions · Price
Returnable Items Only
This Week's Listings Only
Recognized Seller Listings
Top Seller Listings
Strategic Partner Listings
Store-To-Door Shipping
```
Sort: **`Sort by`** → `Price: Low - High` · `Price: High - Low` · (+ relevance/newest)
Also present: **`Items per page`**, and a `Selected filters` chip block.

⚑ Note the facets that are *commercial*, not *descriptive*: `Recognized Seller Listings`, `Returnable Items Only`, `This Week's Listings Only`, `Store-To-Door Shipping`. **For jade, the equivalents are: `Certified (NGTC/GIA)`, `Type A (untreated)`, `With provenance`, `Ships from Hong Kong`, `Returnable`.** These filters do more trust work than "Material".

### 1stDibs trust architecture — **[VERIFIED, from `/about/vetted-sellers/`]**
The four-part argument, verbatim structure:
1. **"An Industry-Leading Vetting Process"** → *"1stDibs works with more than 6,000 trusted sellers… we only admit sellers who are respected professionals in their fields and we do not allow consumer-to-consumer listings."*
2. **"Our Review Process"** → *"All sellers must submit an application for review by our experts in contemporary and vintage furniture, fine art, jewelry and fashion… requests for samples… in-person visits to prospective sellers' workshops, audits of social media accounts and industry editorial coverage."*
3. **"We Stand By Our Listings"** → *"Our team of in-house experts proactively audits inventory to ensure accurate representation… If a seller fails to meet our standards… the seller will be removed."*
4. **"Best-in-Class Expertise"** → *"experts… hailing from the top auction and retail houses… degrees in such areas as fine art, design, **gemology**, restoration and art business and certifications in appraisal services, jewelry expertise, connoisseurship… we work with more than 25 leading estates and foundations."*
   Then an explicit **specialism list** that includes **`Asian Art + Artifacts`**, **`Antiquities`**, and **`Jewelry + Watches`**.

⚑ Copy this four-part structure for a jade house's "Our Guarantee" page: *Who we admit → How we examine → What happens when we're wrong → Who our experts are.* Name gemology and the labs explicitly.

Other trust strings on the homepage **[VERIFIED]**: `1stDibs Promise`, `Authenticity Guaranteed`, `Money Back Guarantee`, `1stDibs Purchase Protection`, `Our Vetting Process`, `Recognized Dealers`, `1stDibs Reviews`, `/about/1stdibs-reviews/`.

---

## 2.2 Artsy / Gagosian / gallery conventions — **[REPORTED]**

- **Gagosian's identity by Graphic Thought Facility (2017)**: a near-invisible system — the wordmark is set very wide, and the *artwork owns every page*. Navigation is minimal, thumbnails are edge-to-edge.
- **Exhibea (gallery ecommerce guide)** states the operating policy that most galleries converge on:
  > "publish prices for primary-market works under a chosen threshold, hold 'price upon request' for major pieces and secondary-market works where discretion genuinely serves the deal, and make the inquiry path frictionless either way — **a beautiful inquiry drawer capturing the work, the collector, and the question in one motion**. POR as default is a habit, not a strategy; use it where it earns its friction."
- **Works need honest commerce states**: `available` (with price or inquiry) · `on hold` · `sold`. "Sold works shown proudly; **the red dot is social proof, not lost inventory**."
- Gallery site architecture: **Exhibitions** (current/upcoming/past, with installation photography — "the single most trust-building imagery a gallery publishes"), **Artists** (scholarship: bio, statement, CV, selected works, press), **Works**, **Viewing Rooms** ("time-bound, editorially framed presentations").
- **Product/catalog as metafields**: `artist, year, medium, dimensions, edition, provenance` — a consistent, machine-readable work schema.

⚑ **Direct translation for your site:** treat each jade piece as a "work", each themed grouping as an "exhibition"/"viewing room" (e.g. *"Imperial Green: A Private Hong Kong Collection"*), and keep a permanent **Sold Archive** — it is the most persuasive page on an antiques site.

## 2.3 Asian art dealer conventions — **[VERIFIED, observed]**

Sampling dealer/aggregator sites for actual CSS:
- **asianart.com** → `#800000` **deep maroon** used 5× as the primary brand colour. Arial/Helvetica/Verdana. ⚑ The maroon-on-cream "Chinese gallery" convention is real and widespread; it reads as seal paste (朱砂) and lacquer.
- **Chairish** → `Europa` sans; `#CC4639` red, `#2E5167` / `#456F8A` blue, `#EBEBEB` grey.
- **The RealReal** → `Roboto`; brand red **`#CE0E2D`**, surface `#F0F1F2` / `#FAFBFC`. ⚑ Note: The RealReal's base typeface is *Roboto* — a commodity sans. Luxury perception comes from the photography, spacing and the red, not the font.
- **Boodles** → `'Cormorant Garamond'` (serif display, self-hosted `.woff2`) + `'Futura PT'` (sans). Palette `#1C1C1C`, `#141414`, `#333333`, `#F0F0F0`, `#C6C6C6`, `#6C757D`, `#FFFFFF`. `letter-spacing: .08em` on buttons.
- **Gump's** (legacy San Francisco Asian art/luxury) sells through 1stDibs and Chairish with the standard marketplace PDP.

---

# 3. LUXURY DIRECT-TO-CONSUMER MAISONS

## 3.1 Verified palettes and fonts

| House | Typefaces | Verified hex | Source |
|---|---|---|---|
| **Cartier** | Flowing script wordmark (custom lettering; **Newsreader** is a good free stand-in). Motif: **la Panthère**. | **`#A6001C`** Cartier Red · **`#C6A15B`** Gold · `#7A0014` deep red · `#FFFFFF` | Brand guideline analysis |
| **Van Cleef & Arpels** | Fine high-contrast serif wordmark (custom; **Cormorant Garamond** is the documented stand-in). Motif: **Alhambra quatrefoil** (1968). | **`#1A1A1C`** Ink · **`#B9975B`** Gold · **`#0F5E4E`** Emerald · **`#CDC6BA`** Stone · **`#F2EEE4`** Ivory | Brand guideline analysis |
| **Boodles** | **`Cormorant Garamond`** + **`Futura PT`** *(verified from their own @font-face)* | `#1C1C1C` `#141414` `#333333` `#F0F0F0` `#C6C6C6` `#6C757D` | **[VERIFIED CSS]** |
| **Piaget** | — | `#100F0F` near-black, `#DFE2E6` light grey | **[VERIFIED HTML]** |
| **Tiffany & Co.** | — | Tiffany Blue is a protected colour mark; packaging-led identity | — |

⚑ **The VCA palette `#1A1A1C / #B9975B / #0F5E4E / #CDC6BA / #F2EEE4` is the closest thing in luxury to a purpose-built jade palette** — the `#0F5E4E` emerald is the exact family of 帝王綠, the `#B9975B` gold matches gilt-bronze mounts, and the ivory/stone neutrals are what you shoot jade *on*. Steal it directly (it is an approximation, not a protected asset).

## 3.2 The luxury web-design law — **[REPORTED, DEUS Marketing]**

- **"Space is the message."** The most reliable luxury indicator is the negative-space-to-content ratio. "Research on visual perception consistently shows that generous spacing around an object increases its perceived value."
- Wider margins, **taller section heights**, more vertical rhythm, and "a deliberate resistance to the urge to fill space with additional information."
- Typography: headlines in serif/high-contrast at generous sizes; **body copy with more generous line-height than standard web conventions suggest**; "Font weights are used sparingly: one weight for emphasis, one for body, and perhaps one for navigation."
- **Photography:** "consistent lighting direction, controlled colour temperature, deliberate depth of field." Lifestyle: "real locations over studios, natural light over artificial."
- **Animation: restraint.** "Subtle entrance animations, smooth scroll-triggered reveals, and elegant hover states create a sense of polish. Parallax effects, auto-playing video backgrounds, and aggressive scroll-jacking create a sense of a brand trying too hard." Page transitions: "a smooth crossfade between pages, even a brief one, communicates care."
- **Navigation minimalism:** "Few top-level categories. Clean dropdown menus or full-screen overlays rather than complex mega-menus… we have a curated selection, and we trust you to find what you're looking for."
- **Anti-patterns:** website-as-brochure with no CTA; unoptimised hero images (5MB when it should be 200KB); render-blocking custom fonts; heavy JS animation libraries; trend-driven design (brutalism, neon, glitch).
- **Performance budget:** `LCP < 2.5s`, `CLS ≈ 0`. "Luxury audiences are less patient than average, not more."
- **Mobile:** ">70% of luxury brand website traffic comes from mobile devices."

## 3.3 Font selection for a luxury house — **[REPORTED]**

The consensus ranking and rationale:
- **What makes a font luxurious:** high stroke contrast (hairline↔thick), generous letterspacing in caps, classical proportions, restraint, large display sizes.
- **Tier 1 (paid):** **Didot** (the definitive Didone — Linotype/Monotype), **Trajan** (inscriptional caps, Adobe/Monotype), **Optima** (humanist sans with subtle contrast), **Mercury** (Hoefler&Co — Sotheby's), **Freight Display** (Sotheby's tertiary).
- **Tier 1 (free, Google Fonts):** **Bodoni Moda** (best free Didone, has optical sizes), **Playfair Display** (softer, screen-friendly Didone-ish), **Cormorant / Cormorant Garamond** (couture, literary — *used in production by Boodles*), **Cinzel** (free Trajan stand-in), **EB Garamond** (quiet body companion).
- **Pairing rule:** one high-contrast display serif for logo/headlines + one quiet body face. "A high-contrast serif over EB Garamond feels purely classical; the same serif over a restrained neutral sans like a wide-tracked Inter reads as modern luxury."
- **Avoid:** Didot/Bodoni for small body text ("the hairlines disappear"); heavy/bold/condensed weights ("feel discount-retail"); Arial as the primary face; novelty/handwritten faces.

⚑ **Concrete recommendation for a Chinese antique jade house:** **Cormorant Garamond** (or Bodoni Moda) for Latin display + **EB Garamond** for Latin body + **a Ming/Song Chinese serif** for Chinese display + a system Hei sans for Chinese UI. Justification: Cormorant is *proven in production luxury jewelry* (Boodles), free, and its thin-stroke/wide-counter skeleton is the closest reasonable match to 宋體's modulated strokes.

---

# 4. PREMIUM MARKETPLACE UX

## 4.1 Filtering for unique (quantity-1) items

Every premium marketplace has the same structural problem: no variants, no stock, no size grid. Their solutions:

| Pattern | 1stDibs | Translation for jade |
|---|---|---|
| **Commercial/trust facets, not just descriptive** | `Recognized Seller Listings`, `Returnable Items Only`, `Store-To-Door Shipping` | `Certified (NGTC/GIA)`, `Type A – untreated`, `With provenance`, `Ships from HK`, `Returnable` |
| **One-of-a-kind status filter** | `Sold` items stay browsable | `Available` / `On hold` / `Sold` (sold archive is a trust asset) |
| **Price as bands + slider** | `chr-price-range` (Christie's) / 1stDibs slider | Use bands for jade: `<5万 / 5–20万 / 20–100万 / 100万+ / Price on request` |
| **"This week's listings"** | `This Week's Listings Only` | `New this week` — freshness signal for a dealer |
| **Sort stack** | `Sort by`: Price Low→High / High→Low / Newest | Add `Recently added` first (default for unique goods) |
| **Selected-filters chip row** | `chr-selected-filters-block` | Removable chips + `Clear all`, sticky above the grid |
| **Results count** | `7,438 For Sale` in the H1 | `<n> pieces` in the H1 — reassurance in a curated catalog |

## 4.2 Make-an-offer / enquire flows

See §5 for the full treatment. Design constraints that matter:
- **Offer/enquiry must be a modal, never a page navigation** — you lose the object. (Christie's ships `chr-drawer--right/left/bottom`; 1stDibs uses a pop-up for "Ask the Seller" and an inline panel in the gallery.)
- **The form must carry context automatically**: object title, reference number, image thumbnail. The user should never have to re-identify what they're asking about.
- **Confirmation must be reassuring and specific** — tell them the response time (see 1stDibs: `Typical response time: <1 hour`).

### ⚠️ Label correction — do NOT use "Make an Offer"

**[VERIFIED from the live 1stDibs PDP]** The offer CTA has been renamed. 1stDibs' purchase box, in exact order:
```
price  →  [ Buy Now ]  →  [ Suggest a Price ]  →  "Shipping & Returns / Retrieving quote…"
       →  trust line: "Orders on 1stDibs are protected"
       →  seller card  →  [ Message the Seller ]
```
- **`Suggest a Price`** — not "Make an Offer". Confirmed by 1stDibs' own help doc: *"If a seller is willing to negotiate, you'll see a **Suggest a Price** button **below the Buy Now button**. Click it, enter your price **or discount percentage**, and proceed to checkout… You won't be charged unless your offer is accepted."*
- ⚑ Three structural lessons: the offer CTA is **secondary and below** the primary action; the buyer can enter **either an absolute price or a discount %**; and payment details are captured **up front but not charged** — a strong commitment signal.
- `"Make an Offer"` survives only in 1stDibs' Trade / Net-Pricing docs — i.e. it is now **B2B vocabulary**, not consumer.
- **1stDibs "Ask the Seller" is a modal** — it sends to the seller and the buyer is notified **by email** on reply.
- **Christie's Private Sales** uses **`Request price`** as the CTA for immediately-purchasable works — *not* "Inquire". ([Christie's — buying privately](https://www.christies.com/en/help/buying-guide/buying-privately))

**Recommended CTA hierarchy for 玉語軒** (all prices are 面議, so there is no Buy Now to sit above):
```
Primary:    [ 預約鑑賞 · Book a Private Viewing ]
Secondary:  [ 洽詢此藏品 · Enquire ]
Tertiary:   [ 提出您的價格 · Suggest a Price ]      ← only where you will negotiate
```
⚑ Because `面議` replaces the price, `Suggest a Price` becomes *more* prominent than on 1stDibs — but keep it visually secondary: a **viewing is the higher-value conversion** than a price offer.

### Enquiry micro-copy — 1stDibs' exact pattern

**[VERIFIED]** In the gallery area, a text prompt sits **directly above** the `[Contact Seller]` button:
> **Want more images or videos?**
> `Request additional images or videos from the seller`
> **[ Contact Seller ]**

This is effectively a **free-text question launcher**, not a form — and it is 1stDibs' best-in-class micro-copy. The Chinese equivalent for jade:
> **想看得更仔細？/ Want a closer look?**
> `索取更多角度、透光照或影片 · Request more angles, backlit shots or video`
> **[ 聯絡賣家 · Contact Seller ]**

### Saved-search / alert copy — **[VERIFIED 1stDibs strings]**
```
"Save Search"
"Get Updated with New Arrivals — Save <Category>, and we'll notify you
 when there are new listings in this category."
```
⚑ Let a collector **save a search** like `和田白玉 帶皮籽料 手把件` and email them when a matching piece is added. For a small dealer with slow inventory turns, saved searches are the only realistic way to build a returning audience.

### Conversion evidence for offer/enquiry flows — **[REPORTED, Greentoe CRO program]**
Source: [ConvertCart — Greentoe case study](https://www.convertcart.com/case-study/greentoe) — a 35-experiment program on an offer-based PDP:

| Intervention | Result |
|---|---|
| **Objection-handling FAQs surfaced on the mobile PDP** | **+34% offers placed** |
| Surface/flow work overall | **+79% offers placed** |
| Mobile PDP redesign | +10.76% |
| **A "How it works" explainer video** | **+4% conversions** |

⚑ **The highest-leverage element on an offer/enquiry PDP is the explainer + FAQ block, not layout polish.** For 玉語軒 that means a compact **`面議是甚麼意思？/ How price-on-request works`** block with answered objections directly on the PDP:
1. 為何不公開價格？ *Why isn't the price shown?* — price depends on 種/水/色/工/來源/證書
2. 洽詢後會怎樣？ *What happens after I enquire?* — reply within 4 business hours, in your language
3. 價格可議嗎？ *Is the price negotiable?* — yes, within a range; here's how
4. 可以親自看貨嗎？ *Can I view it in person or by video?* — yes, including daylight video viewing
5. 有證書與保證嗎？ *Certificate and guarantee?* — exactly what is and isn't covered

Plus a ~40s silent-captioned **「如何洽詢 / How to enquire」** video. This block is worth more than any amount of typographic polish.

## 4.3 Saved items

Christie's has `chr-saved-lots` and `chr-my-lots`; Sotheby's has `SaveLot` / `UnSaveLot` with copy `"Save lot"` and a `Save`/`Saved` toggle. Phillips uses **`Favorite`** not "Save". The label choice is a positioning decision: `Save` = utility, `Favorite` = affection, `Watch`/`Follow` = tracking. Christie's uses **`Follow`** for the email-triggered version and **`Save`** for the shortlist — *two different verbs for two different intents*. Copy that.

---

# 5. "PRICE ON REQUEST" / ENQUIRE FOR HIGH-VALUE UNIQUE ITEMS

## 5.1 The evidence-based policy

**[REPORTED — Exhibea, gallery ecommerce]** The market has moved toward transparency, with a clear threshold policy:
> "collectors — especially newer ones — increasingly expect visible pricing, and platform data consistently shows **priced works convert dramatically better online**. The working policy for most galleries: publish prices for primary-market works **under a chosen threshold**, hold 'price upon request' for **major pieces and secondary-market works where discretion genuinely serves the deal**, and make the inquiry path frictionless either way… **POR as default is a habit, not a strategy; use it where it earns its friction.**"

**[REPORTED — Shopify pricing research]** Artworks with **visible prices sell 2–6× more often** than price-on-request equivalents.

**[REPORTED — Peekaboo Pricing]** The strategic rationale for hiding price:
- Protects brand perception — "publicly displaying a price tag, especially a high one, can sometimes diminish this perception, turning a valuable asset into a commodity."
- Pre-qualifies buyers — "An enquiry form acts as a natural filter."
- Enables a personalised sale — "Introduce the product's unique craftsmanship, features, and benefits before any pricing is revealed."
- Required for MAP compliance.

Their diagnosis of **enquiry-only** (the right model for unique antiques):
- ✅ High-touch sales opportunity; custom quotes; maximum lead qualification; brand control
- ❌ Slower sales cycle; resource-intensive; drop-off risk; limited scalability
- **Ideal for:** "Highly customisable products… **High-Value Art or Collectibles — items where authenticity, provenance, and condition significantly influence price, often requiring direct consultation.**"

⚑ **Jade is the textbook case for enquiry-led pricing**, because price is a function of 种/水/色/工/证书/来源 — none of which a number can express.

## 5.2 The recommended hybrid (implement this)

| Item tier | Display | CTA |
|---|---|---|
| Entry pieces, < ~¥50k | Visible price with `¥` and a currency toggle | `Add to Bag` + `Enquire` |
| Mid tier, ~¥50k–500k | Visible price range: `¥180,000 – ¥220,000` | `Enquire` primary, `Reserve` secondary |
| **One-of-a-kind / > ~¥500k / museum-grade** | **`Price on request`** + `Estimate on request` alternative | **`Enquire About This Piece`** (modal drawer) |
| Consigned / private-treaty | `Price on request` + `Private sale` badge | `Speak to a Specialist` / `Arrange a Private Viewing` |

**Copy variants to A/B (all verified as real-world usage):**
- `Price on request` / `Estimate on request` — Christie's, exact production strings
- `Enquire About This Item`
- `Request Pricing` / `Discover Pricing`
- `Speak to a Specialist`
- `Schedule a Consultation`
- `Make an Offer` — 1stDibs
- `Request additional images or videos from the seller` — 1stDibs, best-in-class micro-copy
- `Request condition report` — Bonhams
- `Ask about this lot` — Bonhams

**Never:** `Call for price` (reads as discount retail), `Contact us` (unclear intent), `Buy Now` (wrong for unique objects).

## 5.3 Implementation mechanics

1. **Threshold config per item**, not per site. One CMS field: `price_display: visible | range | on_request`.
2. **Time-limited price reveal** — submit the enquiry, receive a branded email with a secure 72-hour link that unlocks the price on the product page. ([REPORTED — Peekaboo Pricing]) Preserves exclusivity, regains the self-serve path, and captures the lead either way.
3. **The enquiry form fields** (synthesised from all sources):
   - `Name` (required)
   - `Email` (required)
   - `Phone / WhatsApp` (optional but prominent)
   - **Auto-attached:** piece name, reference number, image
   - `I'm interested in` — dropdown: `Purchasing` / `More photographs` / `Condition report` / `Certificate details` / `Shipping & import` / `Private viewing`
   - `Message` (textarea, pre-filled with a helpful default)
   - `Preferred contact method` — Email / Phone / WhatsApp / WeChat
   - `Timeline` — `Ready to purchase` / `Within 3 months` / `Researching`
   - Consent checkbox for the privacy policy
4. **Response-time promise**, stated in the UI and in the confirmation: `We respond within 4 business hours, Hong Kong time.`
5. **Gating conditions behind sign-in is a legitimate pattern** (Christie's and Sotheby's both do it) — but gate the *PDF*, not the summary. Show a 2–3 line condition summary publicly and gate the full report.
6. **Track** submissions, reveal-link clicks, and post-reveal conversion separately.

---

# 6. CHINESE / ASIAN ART WEBSITE CONVENTIONS

## 6.1 Bilingual layout — the working pattern

**[VERIFIED — Christie's]** Their Chinese site is `christies.com.cn/zh/` with `<html lang="zh">` using **Traditional Chinese (繁體中文)** throughout, and a `chr-language-selector` component. Nav pattern: a persistent language switcher in the utility bar labelled `Language` / `語言` with the current value shown (`English` / `繁體中文`, per their production labels).

**[VERIFIED — Sotheby's]** `sothebys.com/zh/` with `<html lang="zh-Hant">`. Their CSS *keys every font off `:lang(zh)`*, which is the correct technical approach — one markup tree, automatic font swapping.

**[VERIFIED — Sotheby's / Christie's lot pages]** The dominant **bilingual title** pattern is a single line with a delimiter:
```
English Title | 中文標題
```
- English first, Chinese second
- `|` or `|` as the separator (Sotheby's uses `|` with spaces)
- `／` or a line break is also acceptable
- **Chinese characters get spaces between them in jewelry/lot titles** for legibility: `藍寶石 配 鑽石 手鏈`

⚑ **Recommended for the jade site:**
- **Primary market = Chinese.** Put Chinese first if your buyers are Greater China; English first if Western.
- Use a **stacked, two-line bilingual title** for hero products (Chinese at 48–72px serif, English at 14–16px sans caps, letterspaced, in a muted ink). This is more elegant than inline and lets the Chinese type breathe.
- Use **inline `中文 | English`** for cards, breadcrumbs and list rows.
- Language switch must carry the user to the **same object**, not the homepage.

## 6.2 Chinese typography rules — **[VERIFIED, W3C clreq / Ant Design / Apple HIG synthesis]**

### Font loading — the hard rule
> "**Chinese webfonts are 5–20 MB per file.** Users almost certainly don't have decorative Chinese fonts installed. Loading them from a CDN severely slows first paint. **Default: always use the system font stack for Chinese** (zero bytes, best rendering)."

```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
             "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
```
Chinese serif equivalent: `"Songti SC", "STSong", "SimSun", "Noto Serif SC", serif` — and for Traditional, `"PingFang TC", "Microsoft JhengHei", "PMingLiU", "Noto Serif TC"`.

**Decorative Chinese webfonts are permitted in exactly two cases:**
1. The **headline phrase** of a creative/brand hero page
2. An explicitly requested calligraphic / vintage / handwritten mood

…and then only with **all three** of: title-only usage (never body/UI) · **subsetting** (`Google Fonts &text=` parameter loads only the characters used) · `font-display: swap` + system fallback.

**Subsetting example [VERIFIED]:**
```html
<link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&text=每场会议都值得铭记&display=swap" rel="stylesheet">
```
⚑ Even importing full **Noto Serif SC / Noto Sans SC** counts as a violation — also multi-MB, also subset it.

**Curated decorative Chinese faces for the headline-only exception:**
`Noto Serif SC` (elegant, scholarly) · `ZCOOL XiaoWei` (light, fashionable) · `ZCOOL QingKe HuangYou` (round, warm) · `ZCOOL KuaiLe` (playful) · `Ma Shan Zheng` (brush kaishu) · `Long Cang` (casual hand) · `Zhi Mang Xing` (running script)

⚑ **For a high-end antique jade house I would break the rule exactly once:** subset a Ming/Song serif (Noto Serif SC or Noto Serif TC) to only the ~200 characters used in headings and the logotype, and load it as the *display* face only. A Song serif is not decoration — it is the correct register for antiquities, and it is what Sotheby's pairs with Mercury.

### Weight traps
- Most Chinese fonts ship **only 400 / 700**. Intermediate weights are engine-synthesised and render fuzzy/fake-bold.
- **PingFang has Ultralight→Semibold but NO Bold** — so `font-weight: 700` silently falls back to 600.
- **Rule:** Chinese body `400`; headings/emphasis **`500` or `600`** — never `bold`. Hierarchy comes from **size + colour**, weight only assists.

### Typographic parameters
| Property | Value |
|---|---|
| Body size | Web **≥14px**, prefer **16px** for dense reading; App 17pt |
| **Line-height** | **1.5–1.75** (larger than Latin's 1.4–1.6) — Chinese strokes are dense and need more air |
| Letter-spacing | Body **`0`**; large headings may go **`+0.05em`**; **negative tracking is forbidden** (Chinese glyphs smudge when compressed) |
| Characters per line | Desktop **30–40**, mobile **18–25** → `max-width ≈ 36em` |
| Paragraphs | `margin-bottom: 1em`; do **not** rely on `text-indent` first-line indent |
| Weight | Only 400 / 500 / 600 |
| Italics | **Forbidden** — Chinese has no true italic; forced slant distorts strokes |
| Underline | Links only |

### 盘古之白 — the "Pangu whitespace" rule
Insert a thin space between Chinese and Latin/numerals:
- `在 Lumina 上使用 SDK`
- `共 500 件藏品`
- `20 TB`
- **Exceptions:** `90°`, `15%` — no space before the degree/percent sign
- No space around full-width punctuation

### Punctuation
- Chinese sentences use **full-width** punctuation `，。？！` — never mix half-width
- `——` em-dash occupies two character widths and must not break across lines; `……` likewise
- **No repeated punctuation** (`！！！` is forbidden)

### Colour & contrast
- Neutral text via alpha (Ant Design system): light pages `rgba(0,0,0,.88)` primary / `.65` secondary / `.25` disabled; border `#D9D9D9`
- **Dark pages: never pure white body text** — use `rgba(255,255,255,.85)` to cut glare
- **Chinese strokes lose more detail at low contrast** → dark-mode body text must meet **7:1 (AAA)**, not the usual 4.5:1
- Brand colour must never be used directly as dark-background body text

### Traditional Chinese colour vocabulary — **[REPORTED]**
| Name | Hex | Note |
|---|---|---|
| 朱砂 cinnabar / vermilion | `#C0392B` | seal paste — the classic Chinese accent |
| 松花绿 pine-flower green | `#3B7A57` | jade-adjacent green |
| 靛青 indigo | `#1A3A4A` | deep blue — matches Sotheby's `#00253E` family |
| 琉璃黄 glazed yellow | `#F0C040` | imperial yellow / gilt |
| 深栗 / 紫檀 rosewood | ~`#4A2C2A` | wood mounts |

⚑ These suit **accents and marketing/banner atmosphere**; the neutral interface skeleton stays ink/ivory/grey.

### Numbers
- Digits always **half-width ASCII** — never full-width `１２３`
- UI figures (prices, dimensions, weights): **`font-variant-numeric: tabular-nums`**
- Large figures: pair with a tabular/mono Latin face (small filesize, safe to load)
```css
.metric { font-family: "Roboto Mono", "SF Pro Display", monospace;
          font-variant-numeric: tabular-nums; }
```

### Chinese-page preflight checklist
- [ ] Chinese body/UI uses the **system stack**; decorative Chinese face appears only in headings and is subset
- [ ] Line-height **≥1.5**; body **≥14px**; **no negative letter-spacing**
- [ ] Space between Chinese↔Latin and Chinese↔digits; space between digits and units (except `°`, `%`)
- [ ] Full-width punctuation; no italics; no repeated punctuation
- [ ] Chinese weights are only 400/500/600 (no synthetic bold)
- [ ] Dark-page body text `rgba(255,255,255,.85)` with contrast **≥7:1**

## 6.3 Vertical text (竖排) — the authoritative CSS

**[VERIFIED — W3C i18n, "Styling vertical Chinese, Japanese, Korean and Mongolian text"]**

```css
/* Basic vertical CJK — fully supported in Blink, Gecko, WebKit */
.vertical-panel {
  writing-mode: vertical-rl;   /* lines top→bottom, columns right→left */
}
```
- `vertical-rl` for Chinese/Japanese/Korean (columns progress **right to left**)
- `vertical-lr` for Mongolian
- Han characters remain **upright**; embedded Latin typically rotates clockwise; graphics stay upright
- ⚠️ **Use `sideways-rl` / `sideways-lr` for horizontal-script text set vertically** (book spines, table headers) — *not* `vertical-*`

**Keeping embedded Latin upright:**
```css
.upright { text-orientation: upright; }        /* ✅ all engines */
.upright { text-transform: full-width; }       /* ✅ but Latin-only, no accents */
/* Or use fullwidth code points directly: Ｗ３Ｃ */
```

**Horizontal-in-vertical (縦中横 / tate-chū-yoko) — the pattern you want for dates and lot numbers:**
```css
.tcy { text-combine-upright: all; }   /* ✅ all engines — for non-digit runs, ≤3 chars */
time { text-combine-upright: digits 2; }  /* ❌ not supported by any engine yet */
.no-tcy { text-combine-upright: none; }
li::marker { text-combine-upright: all; }  /* upright list markers; Blink+Gecko, not WebKit */
```
- `text-combine-upright: all` squeezes the run into one character width — **keep to ≤3 characters** or it becomes unreadable
- For `<select>` options in vertical text: `select { appearance: base-select; } ::picker(select) { appearance: base-select; }` (Blink only; WebKit 27+)

**Use logical properties throughout** — `text-align: start|end`, `margin-inline`, `margin-block` — so the same CSS works in both writing modes. All engines support these.

**Practical recommendation:** use `writing-mode: vertical-rl` for **one** element per page — a vertical Chinese title or artist/piece name along the gallery's left or right edge — not for body content. Vertical text is a *gesture*, and it will break your layout in ways you don't want at scale. Also: vertical text needs generous `padding-block` and a capped height, plus `text-orientation: upright` if any Latin appears.

## 6.4 Seal / 印章 / signet motifs

**[REPORTED]** 篆刻 (seal-carving) typography in contemporary logo design is an established Chinese branding idiom — the seal is used for (a) the logotype itself, (b) a secondary "chop" mark, and (c) red-dot/verification badges, precisely because a seal historically *is* a mark of authentication and ownership.

**Concrete implementation patterns:**
1. **The house chop** — a square seal mark, ~44–64px, in 朱砂 `#C0392B`–`#9E2B25`, used as the logotype or as a secondary mark. Set in 篆書 (seal script) or a modernised seal-script face. Because carved seals are inverted, the mark should be **white characters on a solid red ground** (陽文/朱文) — that is the authentic construction, and it also gives you a clean, ownable glyph.
2. **Seal as authentication badge** — next to `Authenticity guaranteed`, a small red seal reading `真` / `保真` / `鑑定` does more trust work than a green checkmark. This is the single highest-leverage motif for a jade site.
3. **Seal as image watermark** — a low-opacity chop in the image corner, 20–30% opacity, for provenance photography.
4. **Seal-motif loading/label devices** — the chop as a small rotating/revealing element, or as the icon preceding section headings (`Provenance` / `來源`).
5. **Never** set a decorative 篆書 face for body text or navigation — seal script is illegible at UI sizes. Subset it to the ~10 characters actually used.

⚑ Pair the chop with the **red dot convention** from the gallery world (`sold` marker) — the red dot and the red seal are the same visual language, and using both makes the site read as native to the art world rather than to e-commerce.

---

# 7. CONSOLIDATED DESIGN SYSTEM — ready to build

## 7.1 Recommended palette (a synthesis of the verified ones)

```css
:root {
  /* ── Surfaces ───────────────────────────── */
  --ivory:        #F6F3EB;  /* 1stDibs warm ivory — PRIMARY page ground */
  --ivory-deep:   #EFEAE0;  /* section alternation */
  --stone:        #CDC6BA;  /* VCA stone — borders, dividers on ivory */
  --paper:        #FFFFFF;
  --ink-deep:     #0E1A22;  /* near-black for full-bleed dark sections */
  --ivory-on-dark:#F2EEE4;  /* VCA ivory — text on dark */

  /* ── Ink ────────────────────────────────── */
  --ink:          #1A1A1C;  /* VCA ink — primary text */
  --ink-88:       rgba(26,26,28,.88);
  --ink-65:       rgba(26,26,28,.65);   /* secondary text */
  --ink-45:       rgba(26,26,28,.45);   /* meta / labels */
  --ink-25:       rgba(26,26,28,.25);   /* disabled */
  --on-dark:      rgba(255,255,255,.85);/* body text on dark — 7:1 target */

  /* ── Metal (the ONE accent) ─────────────── */
  --gold:         #B9975B;  /* VCA gold — primary accent */
  --gold-deep:    #A48E45;  /* 1stDibs dark gold — hover/pressed */
  --gold-pale:    #D6BC7E;  /* Sotheby's light gold — hairlines */
  --gold-12:      rgba(185,151,91,.12);
  --gold-24:      rgba(185,151,91,.24);

  /* ── Jade (semantic only, for grading tags) ─ */
  --jade-imperial:#0F5E4E;  /* VCA emerald — 帝王綠 tag */
  --jade-apple:   #6E9B6A;  /* 陽綠 */
  --jade-lavender:#9B8AA8;  /* 紫羅蘭 */
  --jade-ice:     #C9D6D2;  /* 冰種 / 晴水 */

  /* ── Seal / accent ──────────────────────── */
  --cinnabar:     #C0392B;  /* 朱砂 — seal, sold dot, alerts */
  --cinnabar-deep:#9E2B25;

  /* ── State ──────────────────────────────── */
  --available:    #0A7F7F;  /* Christie's positive teal */
  --on-hold:      #B9975B;
  --sold:         #6B6B6B;
  --error:        #D70C00;  /* Christie's alert red */
  --divider:      rgba(26,26,28,.10);
  --divider-dark: rgba(255,255,255,.10);
}
```

## 7.2 Type system

```css
/* Latin */
--font-display: "Cormorant Garamond", "Bodoni Moda", Didot, Georgia, serif;
--font-body:    "EB Garamond", Georgia, serif;      /* long-form editorial */
--font-ui:      "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Chinese — system by default (zero bytes) */
--font-cn-serif: "Songti SC", "STSong", "SimSun", "Noto Serif SC", "Source Han Serif SC", serif;
--font-cn-sans:  -apple-system, BlinkMacSystemFont, "PingFang SC",
                 "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
/* Traditional */
--font-cn-serif-tc: "PingFang TC", "Songti TC", "PMingLiU", "Microsoft JhengHei", "Noto Serif TC", serif;

/* Numerals */
--font-mono: "Roboto Mono", "SF Mono", ui-monospace, monospace;
```

**Latin display stack (headings, piece titles, English titles).**
**Chinese display stack (`宋體/明體`) for Chinese headings — pairs with the Latin serif, exactly as Sotheby's pairs PMingLiu with Mercury.**
**UI stack (`黑體` + Latin sans) for all labels, nav, buttons, prices, and metadata.**

### Scale — desktop / mobile
| Role | Size | Weight | LH | Tracking | Family |
|---|---|---|---|---|---|
| Hero display | 72–80px / 40px | 300–400 | 1.05 | −0.02em | serif |
| H1 piece title | 40–48px / 30px | 300 | 1.15 | −0.01em | serif (CN: cn-serif) |
| H2 section | 28–32px / 24px | 300 | 1.2 | 0 | serif |
| H3 | 20–24px / 20px | 300 | 1.3 | 0 | serif |
| Body L (editorial) | 18px / 17px | 400 | **1.7** | 0 | body serif |
| Body | 16px / 16px | 400 | **1.65** | 0 | body serif / UI |
| Body S | 14px / 14px | 400 | 1.55 | 0 | UI |
| **Label / eyebrow** | **11–12px / 11px** | **500** | 1.2 | **0.14em** | **UI, UPPERCASE** |
| **Meta / caption** | **12–13px** | **400** | 1.4 | **0.06em** | UI |
| **Button** | **12–13px** | **500** | 1 | **0.12em** | **UI, UPPERCASE** |
| Price | 20–24px | 400 | 1.2 | 0.02em | **mono, tabular-nums** |
| Chinese body | 16–17px | 400 | **1.7** | **0** | cn-sans / cn-serif |
| Chinese char-spaced title | as heading | 400–500 | — | **0.08em** | cn-serif |

⚑ **Do not exceed two Latin families and two Chinese stacks.** Cormorant Garamond + Inter (Latin), Songti + PingFang (Chinese). That's it.

## 7.3 Motion tokens

### Verified easing curves — measured across the luxury sites' own CSS
| Site | Dominant easing | Occurrences | Named as |
|---|---|---|---|
| **Christie's** | `cubic-bezier(0.39, 0.58, 0.57, 1)` | **156** | easeOutSine |
| Christie's (2nd) | `cubic-bezier(0.4, 0, 0.2, 1)` | 6 | Material standard |
| **Sotheby's** | `cubic-bezier(.33, 1, .68, 1)` | 2 | easeOutCubic |
| **1stDibs** | `cubic-bezier(0, 0, .2, 1)` | 3 | Material decelerate |
| **Boodles** | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 5 | = CSS `ease` |
| Boodles (2nd) | `cubic-bezier(0.42, 0, 0.58, 1)` | 2 | = `ease-in-out` |

**Durations measured:** Boodles `0.1s / 0.2s / 0.25s / 300ms` · 1stDibs `0.15s / 0.2s / 0.3s / 0.5s` · Christie's `0.15s / 0.3s / 0.5s / 1s`

⚑ **Two firm conclusions from the measurements:**
1. **The luxury motion range is 100–500ms with an ease-out family curve.** `easeOutSine`, `easeOutCubic` and Material-decelerate dominate. Anything above ~600ms reads as sluggish; anything below ~100ms reads as cheap.
2. **Overshoot / spring / bounce easing is essentially absent.** Sotheby's entire stylesheet contains **one** overshoot curve (`cubic-bezier(.54, 1.5, .38, 1.11)`). This independently confirms the "no bounce, no parallax-jack" rule — **do not use spring physics.**

✅ 玉語軒's existing `--ease-out: cubic-bezier(.16,1,.3,1)` (easeOutExpo) and `--ease: cubic-bezier(.22,.61,.36,1)` (easeOutQuad) both sit squarely inside this family and are, if anything, more refined than Christie's. **Keep them; do not switch.**

```css
--ease-house:  cubic-bezier(0.39, 0.58, 0.57, 1);  /* Christie's — the reference curve */
--ease-out:    cubic-bezier(0.4, 0, 0.2, 1);       /* Material decelerate — for drawers/modals */
--dur-micro:   150ms;   /* hover, focus, colour */
--dur-base:    300ms;   /* reveals, drawer, accordion */
--dur-slow:    500ms;   /* gallery crossfade, section reveal */
--dur-hero:    1000ms;  /* hero image curtain / page transition */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Motion inventory:**
| Interaction | Spec |
|---|---|
| Scroll reveal | `IntersectionObserver`, threshold 0.15, `translateY(20px)→0` + `opacity 0→1`, 500ms, `--ease-house`, stagger 80ms per item, `once: true` |
| Card hover | Image `scale(1.03)` 500ms + swap to secondary image (crossfade 300ms); title colour → `--gold-deep`; gold hairline underline draws left→right 300ms |
| Gallery change | Crossfade 300ms (Christie's uses `chr-cross-fading-images`) |
| Image zoom | Click → full-screen lightbox, pinch-zoom + drag-pan on touch; desktop hover-magnifier at 2× inside the frame (never a separate popup-window zoom) |
| Sticky header | Shrinks 88px→64px on scroll past 120px, 300ms; `backdrop-filter: blur(12px) saturate(0.5)`; gold hairline appears at bottom |
| Drawer (enquire) | Slide from right, 400px wide (100% on mobile), 400ms `--ease-house`, backdrop `rgba(14,26,34,.5)`, body scroll locked, Esc closes, focus trapped |
| Accordion | Height auto-animate 300ms; `+`/`−` rotates 180° |
| Page transition | Crossfade 300ms (never a spinner) |
| Seal chop | On hover, scale 1.0→1.06 with a 150ms pulse — the *only* decorative motion allowed |

## 7.4 Photography specification

From the auction/dealer conventions and the lighting research:
- **Two grounds per object, always:** warm ivory `#F6F3EB` and near-black `#0E1A22`. Some jade only reads correctly against one or the other — translucency blooms on dark, colour and inclusions read on light.
- **Consistent lighting direction** across the whole catalog (single key, 45° from upper-left is the auction-house default).
- **Soft, diffuse, large-source lighting.** Jade is translucent — hard light blows out the surface and destroys 水頭 (depth). Use diffusion and a gradient falloff.
- **Backlight/edge-light frame** for every piece to demonstrate translucency (水頭) and 起光/起膠. This is non-negotiable for jade and no Western marketplace does it.
- **Colour management:** shoot and deliver **sRGB**, use a **ColorChecker / neutral grey card** in every setup, and state the white balance (≈5500K daylight-balanced is the honest default). Jade colour deception is the #1 buyer complaint — publish a colour-accuracy statement.
- **Macro for inclusions** (棉/石紋) at 1:1 — this is *evidence*, not decoration. Show flaws.
- **Never** colour-grade jade for saturation. Slight +contrast, no vibrance.
- Reference the Chinese trade principle **灯下不观玉** ("do not judge jade under artificial light") — **offer a daylight-viewing guarantee or a video call in natural light.**
- Required shot list per piece (10–14 images):
  1. Front, ivory ground
  2. Front, dark ground
  3. Backlit / edge-lit (translucency)
  4. 45° three-quarter
  5. Macro — colour/种 detail
  6. Macro — inclusions/flaws, annotated
  7. Side profile / thickness (caliper or ruler in frame)
  8. Scale reference — on the hand / with a coin
  9. Certificate, flat-lay
  10. Certificate number, macro
  11. Original box / mount / stand
  12. Provenance documents / prior sale catalogue page
  13. Styled in-context (worn / displayed) — natural light
  14. Optional: 24–48-frame 360° spin for pieces > ~¥100k

## 7.5 Video & 360° — **[REPORTED + VERIFIED]**
- **24 frames** = minimum acceptable spin; **36–48** = optimal balance of fluidity and file size; the older "24–72" figure is the upper bound for maximum fidelity.
- **Photography beats CAD renders** for trust — organic reflections and real metal texture. Renders are "sterile / too perfect," which undermines belief.
- **Lazy-load aggressively**: never let the spin sequence block first render of title, price or CTA. Use a **single optimized sprite sheet**, or fetch frames only after the user interacts with the hero.
- **Affordance is mandatory**: an icon plus an **automatic micro-spin on load** (or a subtle wobble) — "Users will not interact with what they do not notice."
- Mobile: touch gestures (swipe to spin, pinch to zoom) **must not hijack page scroll**.
- **Video and 360° are complementary, not substitutes** — video shows how a piece moves on a body and communicates scale/drape; 360° enables *self-directed technical inspection*.
- Video element: `<video autoplay muted loop playsinline poster="…">` with a `WebM`+`MP4` pair; keep under ~3MB for hero loops.
- AR/try-on is a **secondary engagement layer, not a conversion driver** — imperfect edge detection and scale accuracy "increases friction instead of reducing it."
- Budget: **LCP < 2.5s**, **CLS ≈ 0**, hero images ≤ 200KB (not 5MB), no render-blocking fonts.

## 7.6 PDP component list (build order)

```
<LotPage>
  <Breadcrumbs>                     Home › 翡翠 › 手鐲 › 天然翡翠手鐲
  <LotNav>                          ‹ Prev · Lot 012 · Next ›  + horizontal lot scroller
  <Gallery>                         1 of 14 · thumbs · backlit toggle · 360 badge · video badge
    └ <GalleryServiceCTA>           "Want more images or videos?" → Contact Seller
  <LotHeader>
    ├ LotNumber                     012  (mono, tabular-nums, letterspaced)
    ├ BilingualTitle                天然翡翠手鐲 / Natural Jadeite Bangle
    ├ CreditLine                    Property of a Private Hong Kong Collection
    ├ StatusPill                    Available · On hold · Sold · No Reserve
    └ PriceBlock                    ¥ — or — Price on request + [ Enquire ]
  <ActionBar>                       Enquire · Book a Private Viewing · Request Condition Report · Share
  <TrustStrip>                      NGTC Certified · Type A (untreated) · Authenticity Guaranteed · 14-day returns
  <Section id="details">            Details / 詳情  → prose + dual-unit spec table
  <Section id="specs">              Spec table (see below)
  <Section id="provenance">         Provenance / 來源  → dated prose + prior catalogue refs
  <Section id="condition">          Condition / 品相  → public summary + gated full report
  <Section id="certificate">        Certification / 證書  → lab, report no., verify link, image
  <Section id="literature">         Literature & Exhibited / 著錄與展覽
  <Section id="expert">             Expert Note / 專家評述  → signed, 3-part essay
  <SpecialistCard>                  photo · name · title · direct tel · direct email · WhatsApp · WeChat QR
  <ShippingBlock>                   Get a shipping & import quote (opens calculator)
  <EnquiryDrawer>                   the durable lead capture
  <RelatedRail>                     More from this collection / 同系列藏品
  <LegalMicro>                      Conditions of sale · export/CITES notice
</LotPage>
```

**Jade spec table rows (in order):**
```
Object            手鐲 (Bangle)
Material          天然翡翠 (Natural Jadeite), Type A — untreated
种 / Texture      玻璃種 / 冰種 / 糯種 / 豆種
水 / Translucency 水頭 description
Colour            帝王綠 / 陽綠 / 紫羅蘭 / 白底青 / 油青 / 墨翠
Dimensions        Inner Ø 57.2 mm · W 12.4 mm · Th 8.1 mm  (57.2 × 12.4 × 8.1 mm)
Weight            68.4 g / 342 ct
Period            清中期 (Mid-Qing, 18th–19th c.)  · or 民國 · 當代
Carving           手工雕刻 (hand-carved) / 素面 (undecorated)
Certification     NGTC report no. XXXXXXXXXXXX — verify ↗
Provenance        ...
Condition         ...
Reference         SKU + internal ref
```
Dual units throughout — mm *and* inches, grams *and* carats — exactly as Christie's does `34 cm. (13 3/8 in.)`.

## 7.7 Trust & authenticity signals — the full stack

| Signal | Implementation |
|---|---|
| **Certificate** | Lab name (NGTC / GIA / HKJSL), **report number**, issue date, **clickable online verification**, and a photograph of the physical certificate |
| **Treatment disclosure** | A dedicated field: `Type A — natural, untreated` / `Type B` / `Type C`. Never buried. This is the #1 jade trust issue. |
| **Provenance** | Dated prose with named prior owners, prior auction house + lot number + date. Link to the archived catalogue page where possible. |
| **Condition report** | Public 2–3-line summary + full report behind email capture. Photo-annotated flaws. |
| **Expert note** | Signed essay, three parts: history → craft/connoisseurship → comparables (the Christie's `Lot Essay` structure) |
| **Named specialist** | Photo, real title, direct phone, direct email, WhatsApp. Not `info@`. |
| **Response-time promise** | `Typical response time: < 4 business hours (HKT)` |
| **Guarantee page** | The 1stDibs four-part structure: Who we admit → How we examine → What if we're wrong → Who our experts are (name gemology + the labs) |
| **Return policy** | Explicit window and process for high-value items, stated on the PDP not just in the footer |
| **Sold archive** | Permanent, browsable, with realised prices where permitted — the strongest credibility asset you can own |
| **Press / institutional refs** | Museum exhibitions, publications, dealer memberships |
| **Secure payment / escrow** | Named escrow or authentication intermediary for consigned pieces |
| **Export / CITES** | A plain-language page on cross-border shipping for jade |

---

# 8. SOURCE LIST

### Primary — live production code inspected directly (highest confidence)
- [Christie's design system CSS](https://dsl.assets.christies.com/design-system-library/production/christies-design-system-library.css) — fonts, palette, type scale, spacing, motion, component inventory, i18n labels
- [Christie's lot page](https://www.christies.com/en/lot/lot-5549063) — lot anatomy, provenance, gated condition report, specialist card, Lot Essay
- [Christie's Chinese site](https://www.christies.com.cn/zh/) — zh-Hant layout, production Chinese labels
- [Sotheby's production styleguide CSS](https://sothebys-com.brightspotcdn.com/resource/00000169-4eb2-d078-adfb-6eb2e0750000/styleguide/All.min.56149a1f7cd73db3bebeb262a155579f.css) — palette, type scale, tracking, grid, `:lang(zh)` font stacks, lot UI strings
- [Sotheby's Monotype webfont kit](https://cdn.fonts.net/kit/604aed6c-1d0b-4404-bedd-e585cecd62fc/604aed6c-1d0b-4404-bedd-e585cecd62fc.css) — Mercury Display + Benton Sans Pro
- [Sotheby's lot page](https://www.sothebys.com/en/buy/auction/2024/magnificent-jewels-ii/sapphire-and-diamond-bracelet-lan-bao-shi-pei-zuan) — bilingual title convention, section order, estimate placement
- [Sotheby's sale page](https://www.sothebys.com/en/buy/auction/2024/magnificent-jewels-ii) — lot data model, bilingual lot titles, pinyin slugs
- [Bonhams lot page](https://www.bonhams.com/auction/32281/lot/4/a-roman-bronze-applique-head-of-a-maenad-with-rosettes-in-her-hair/) — action bar, specialist card, footnotes/provenance
- [Phillips lot page](https://www.phillips.com/detail/176953) — lot scroller, estimate/sold adjacency, Chinese social links
- [1stDibs PDP](https://www.1stdibs.com/furniture/storage-case-pieces/dressers/1970s-chippendale-style-maple-tallboy-dresser/id-f_42935072/) — full PDP anatomy, gallery service CTA, seller trust block
- [1stDibs layout CSS](https://a.1stdibscdn.com/dist/dibs-buyer-layout/dibs-buyer-layout-buyer-3090a3b9-739b-4598-b445-d105f3d87546-180d3eae700f943d.css) — Cardinal Classic Short + Proxima Nova, serif scale, palette
- [1stDibs Typekit kit](https://use.typekit.net/mkk3fxh.css) — Proxima Nova
- [1stDibs jewelry browse](https://www.1stdibs.com/jewelry/bracelets/bangles/) — filter facets, sort labels
- [1stDibs Vetted Sellers](https://www.1stdibs.com/about/vetted-sellers/) — four-part trust architecture
- Boodles production HTML/CSS — Cormorant Garamond + Futura PT, palette
- Chairish, The RealReal, Piaget, asianart.com production HTML — comparative palette/font sampling

### Secondary — industry guidance
- [Pentagram — Sotheby's identity](https://www.pentagram.com/work/sothebys-1) — Mercury + Benton Sans, white-silhouette catalogue treatment
- [Fonts In Use — Sotheby's 2014 Redesign](https://fontsinuse.com/uses/6387/sotheby-s-2014-redesign) — Freight Display tertiary; Akira Kobayashi's custom Chinese characters for the HK wordmark
- [W3C i18n — Styling vertical CJK text](https://www.w3.org/International/articles/vertical-text/index.en) — authoritative vertical-text CSS
- [Chinese typography & colour spec](https://github.com/joeseesun/qiaomu-design/blob/main/references/chinese-typography.md) — clreq/Ant Design/Apple HIG synthesis: webfont discipline, 盘古之白, line-height, contrast, traditional colours
- [DEUS — Web Design for Luxury Brands](https://www.deusmarketing.io/blog/web-design-luxury-brands) — negative space, typography, photography, motion restraint, performance budgets
- [Van Cleef & Arpels brand guidelines](https://madegooddesigns.com/van-cleef-arpels-brand-guidelines/) — verified hex set, fine serif
- [Cartier brand guidelines](https://madegooddesigns.com/cartier-brand-guidelines/) — `#A6001C` / `#C6A15B`, script wordmark
- [Best Fonts for Luxury Brands](https://madegooddesigns.com/best-fonts-for-luxury-brands/) — Didot/Bodoni/Cormorant/Trajan ranking and pairing rules
- [Exhibea — Art Gallery Ecommerce & Branding](https://exhibea.com/blogs/shopify-plus-blog/art-gallery-ecommerce-branding) — POR policy, commerce states, viewing rooms, work schema
- [Peekaboo Pricing — Premium Enquiry Experience](https://peekaboopricing.com/articles/building-a-premium-enquiry-experience-on-your-shopify-product-pages) — enquiry form fields, CTA copy, reveal links
- [Peekaboo Pricing — Enquiry-Only vs Reveal Links](https://peekaboopricing.com/articles/enquiry-only-vs-reveal-links-choosing-the-right-approach-for-expensive-items) — when each model fits
- [Useryze — 360° Product Views in Jewelry CRO](https://www.useryze.com/blog-quirks-conversions/the-reality-of-360-degree-product-views-in-jewelry-cro-moving-beyond-the-20-lift-myth) — frame counts, photography vs render, lazy-loading, video/360 complementarity
- [Sotheby's Guide for Buyers — Glossary & Important Notices](https://sothebyshelp.freshdesk.com/en/support/solutions/articles/44002518846-guide-for-buyers-glossary-important-notices)

---
---

# 9. JADE-SPECIFIC SUBSTANCE
### Sources: [BMjade — How to Verify Your NGTC Jade Certificate](https://bmjade.com/pages/ngtc-certificate-verification) · [Valentin Magro — Jade](https://www.valentinmagro.com/gemstones/different-types-of-gemstones/jade/)

## 9.1 The certificate page is the highest-leverage trust asset you can build

BMjade's certification guide is the single best pattern found in this entire research. They dedicated a whole page to teaching buyers how to verify a certificate — **including publishing three real certificate numbers so anyone can test the process before buying.** That hands the buyer the means to catch you out, and in doing so makes you the only credible party in the conversation.

**Recommended page `/authenticity`（真偽與鑑定）, structured as:**

**1. Acknowledge the doubt out loud.**
> *"If a seller mentions an NGTC certificate, your first thought is probably: I've never heard of them."*

**2. NGTC vs GIA comparison table** (this structure is excellent — reproduce it):

| | NGTC | GIA |
|---|---|---|
| Full name | National Gemstone Testing Center 国家珠宝玉石质量检验检测中心 | Gemological Institute of America |
| Based | China, **state-operated** | United States, non-profit |
| Primary authority in | The Asian jade trade | Western diamond and coloured-stone markets |
| Core jadeite output | Material ID + **Type A/B/C treatment status** | Material ID + treatment detected |
| Recognised by | Asian jade dealers, **auction houses**, Chinese customs, retail | Western insurers, appraisers, estate/probate |
| **Verification** | **ngtc.com.cn** — report no. **+ anti-counterfeit code** | GIA Report Check |
| Turnaround for jade | Days | Weeks, often longer |
| Best for | Confirming a piece is **natural and untreated** | Documenting a holding for Western financial purposes |

**3. The one-line translation:** *"NGTC answers 'is this real and untreated'. GIA answers 'can I show this to an insurer in Ohio'."*

**4. Accreditation marks to display as badges:** **CMA · CNAS · ilac-MRA** — printed top-right on every genuine NGTC report. CMA (China Metrology Accreditation), CNAS (China National Accreditation Service), **ilac-MRA** (the international mutual-recognition arrangement covering 100+ countries). ⚑ Rendering these three as small marks beside the certificate image is concrete, cheap and high-impact.

**5. The volume argument:** *"NGTC sees more jadeite in a month than most Western laboratories see in a decade."*

**6. Treatment classification — state it on every product page:**

| Code | Meaning | Note |
|---|---|---|
| **Type A / A貨** | Natural. Structure intact, surface wax only. **The only grade sold as untreated.** | The standard to sell |
| **Type B** | Acid-bleached, then **polymer-resin impregnated** | Resin yellows with age |
| **Type C** | **Dyed** | Dye fades |
| **Type B+C** | Both | |

**7. Name the instrument, not the opinion:**
> *"What settles it is **infrared spectroscopy**, which detects the polymer's absorption signature inside the stone, with **Raman spectroscopy** confirming the species. Neither is a judgement call — which is why a laboratory report ends the argument and a seller's assurance doesn't."*

**8. Cite the precedent.** The **Hutton-Mdivani jadeite necklace**, Sotheby's Hong Kong, April 2014 — the world auction record for jadeite — carried certificates from the **Hong Kong Jade & Stone Laboratory** ("A jade") and **SSEF** (Switzerland, no indications of impregnation). **Not GIA.** ⚑ Use this to justify naming HKJSL and SSEF alongside NGTC — the top of the market runs on specialist labs.

**9. Publish a line-by-line certificate translation table.** This is the highest-value table on the site:

| On the certificate | English label | Example | What to check |
|---|---|---|---|
| 检测结论 | Conclusion | 银S925翡翠耳饰 | Species **and metal** must match the product page |
| 总质量 | Total Mass | 3.154g | The **whole submitted piece incl. metal** — not the jade alone |
| 形状 | Shape | 雕件 (carved piece) | A category, **not a measurement** |
| 颜色 | Colour | 浅绿 (pale green) | **Descriptive — not a grade, not a trade name** |
| 贵金属检测 | Precious Metal | 银S925 | A dash = no metal submitted |
| **放大检查** | Magnification | **纤维交织结构** (fibrous interlocking texture) | **The structural signature of natural jadeite** |
| 备注 | Remarks | 另配翡翠 (additional jadeite fitted) | A dash = nothing further to note |
| — | **翡翠（A货）** | **Jadeite, Type A** | **The line that determines value** |
| 检测依据 | Normative References | GB/T 16553, GB 11887, GB/T 18043 | The national standards tested under |
| Photograph | — | — | **Must be recognisably your piece** |
| Accreditation marks | CMA / CNAS / ilac-MRA | — | Printed top-right on every genuine report |

⚑ **The photograph row is a fraud warning worth stating:** *"A certificate can be entirely genuine and still be attached to a different object than the one you're holding — moving a real report onto a similar-looking piece is a known fraud. Look at the photograph."*

**10. Explain the two NGTC layouts** so a buyer isn't alarmed:
- **Full-size** — certificate number + photograph at top, results below, QR code + issue date + security code + barcode along the bottom edge
- **Compact card** — number top-right, photograph on the right, results down the left, QR/date/code/barcode in the lower-right corner
- *"The fields are identical in both — only the arrangement differs."*

**11. Two verification methods, with the critical security warning:**
- **QR scan** — *"Scanning is the fast way to check a certificate that came to you sealed in the box from a seller you've already decided to trust. It is **not** the way to check a certificate a stranger has sent you a photograph of. A forged certificate can carry a forged QR code pointing at a page the forger controls — which will confirm the fake beautifully."*
- **Manual lookup at `ngtc.com.cn`** → section **检测证书/报告查询** → field **证书编号** (Certificate No. — *include the letter prefix and the hyphen*, e.g. `Y-PLDY224598`) + field **防伪码** (Security Code — *the eight digits printed above the **right-hand** end of the barcode*, e.g. `77839765`).
- ⚑ **The gotcha to document:** *"Two eight-digit numbers sit side by side above the barcode. The left one is the **issue date** (20260725 = 25 July 2026). The security code is on the **right**. Entering the date into the security code field is the most common reason a lookup returns nothing."*

**12. A "what the certificate does NOT cover" section** — the most credible block on the page:
- ❌ **No geographic origin.** *"A listing offering 'certified Burmese jade' is almost certainly certified as jadeite and almost certainly not certified as Burmese."* → ⚑ **Never claim certified origin.** Separate *our sourcing account* from *certified fact*.
- ❌ **No beauty grade.** *"Type A is a treatment classification, not a quality ranking. Judge the material with the certificate; judge the piece with your eyes and the price."*
- ❌ **No dimensions or ring size.** *"The certificate records mass only."* → measurements must come from you.
- ❌ **No valuation.**

**13. Pre-empt the colour-vocabulary gap.** NGTC records plain standardised terms — `浅绿` pale green, `绿` green, `白` white, `紫` purple — and **does not use trade names**. So trade "blue water jade" is recorded merely as `浅绿`. *"The certificate classifies the stone; it doesn't market it. A gap between a trade description and a certificate term is normal. A gap in **species** or **treatment** is not."*

**14. An unconditional guarantee.** *"If it verifies but contradicts the product page on species, treatment or metal, that's covered without argument. Send your order number and we'll refund the purchase price, your laboratory fee, and return shipping."* ⚑ Note they refund **the buyer's independent lab fee** — a real, costly, credible commitment.

**15. The question that outranks the lab.** *"Who issued this, and do they work for the seller?"* A certificate from a laboratory the seller owns is worthless.

⚑ **Build the PDP to auto-render the certificate table.** If each piece stores its certificate fields as structured data, the Certificate section prints the translated table + certificate photograph + a `Verify at ngtc.com.cn ↗` deep link. No Western competitor does this.

## 9.2 Jade colour & quality vocabulary for filters, tags and copy

Two species — **be explicit about which**:
- **Jadeite 硬玉 / 翡翠** — the valuable one; full colour range including lavender and black.
- **Nephrite 軟玉 / 和田玉** — more common, more affordable; most often dark green, also grey/blue/brown/yellow/white.

**Evaluation order: colour → texture → transparency.** Colour matters most.

### Green
| Chinese | English | Description | Tag hex *(UI approximation — not a gemological standard)* |
|---|---|---|---|
| **帝王綠** | **Imperial green** | **Medium tone, pure green** — the most coveted. Not dark, not yellowish | `#0F5E4E` |
| **陽綠 / 蘋果綠** | Apple / grassy green | **Vivid yellowish-green**, lower saturation. More available than imperial | `#6E9B6A` |
| **菠菜綠** | Spinach green | Dark, muted green | `#2F4F3A` |
| **油青** | Oil green | Greyish blue-green, oily lustre | `#4A6B5F` |
| **白底青** | White-background green | Vivid green patches on a white ground | `#8FBF7A` on `#EDEAE0` |
| **藍水 / 晴水** | Blue water / clear water | Cool blue-green. NGTC records it merely as `浅绿` | `#6E8F96` |
| **墨翠** | Ink jadeite | **Black in reflected light, green in transmitted light** | `#1C2B2A` |
| **雪花棉** | Moss-in-snow | White cotton-like inclusions in a green ground | `#DCE5E0` on `#5E8A6E` |

### Non-green
| Term | English | Note |
|---|---|---|
| **紫羅蘭 / 春** | Lavender / purple | Prefer **vivid saturation + medium tone**. Ideal lavender can exceed some green jadeite in value; pale or bluish-purple lavender is cheaper. |
| **春帶彩** | Lavender with green | Two-colour material |
| **紅翡 / 黃翡** | Red / yellow jadeite | *"Looks its best with low brownish colouring"* |
| **無色** | Colourless | Can resemble moonstone; gives an ethereal quality |

**Colour distribution is its own criterion.** The most sought-after jadeite has **evenly distributed colour with no visible variation**. Uneven material is **mottled**; carvers exploit colour zoning deliberately (cameos with a green/lavender foreground on a white ground). ⚑ Add a field: `均勻 Even` / `花色 Mottled` / `巧色 Zoned (carved to exploit zoning)`.

### Texture / 種
| Term | Meaning |
|---|---|
| **玻璃種** | Glass type — finest, near-transparent, mirror polish |
| **冰種** | Ice type — highly translucent, icy |
| **糯種** | Glutinous type — milky, semi-translucent |
| **豆種** | Bean type — coarse, opaque, most common |

**The mechanism to explain in copy:** *"The smaller the crystals that make up a piece of jadeite, the smoother the consistency. Finer texture also helps jadeite take on a stronger polish."* → ⚑ Write texture copy as **crystal size → smoothness → polish → the look**. That converts a trade term into a reason.

### Transparency / 水頭 — and a test you can teach buyers
Jadeite may be **opaque / translucent / semi-transparent**. *"With semitransparent gems, light is able to travel into the stone, giving the jadeite a delicate, glowing appearance."* **"If the transparency is high enough, even jade with less desired colouring may fetch a high price."**

**The printed-page test — teach this on the PDP.** *"Print that is hidden behind the jadeite is probably opaque. If the words are difficult to see, the jewel has a measure of translucence; stones with clearly visible print behind them are semitransparent."*

⚑ **This is an outstanding, free, objective product-page feature.** Publish a photograph of the piece resting on printed text, captioned `透光度實測 / Translucency test`. It is verifiable by the buyer, costs nothing, and pairs perfectly with the mandatory **backlit shot**. No competitor is doing it.

### Physical handling
Mohs hardness ≈ **7**, with exceptional **toughness** — which is why jade is carved into bangles, rings and vessels from a single piece. Jadeite rough is often massive, allowing beads, cabochons, bangles and rings cut from one stone. It is evaluated **by feel** as well as by eye — jade is a contact material.

## 9.3 Jade measurement & spec conventions
- **Bangle inner diameter 圈口** — in **mm**, always the first number a bangle buyer checks (*內徑 57.2mm*). Ship a **bangle size guide** with the paper-strip and existing-bangle methods.
- **Dimensions** — dual units throughout, exactly as Christie's does (`34 cm. (13 3/8 in.)`): `57.2 × 12.4 × 8.1 mm (2¼ × ½ × ⅜ in.)`
- **Weight** — **both grams and carats**: `68.4 g / 342 ct`. (NGTC records `总质量` in grams.)
- **Width / thickness 環寬 / 厚度** for bangles and pendants — thickness drives perceived 水頭.
- **Carving** — `手工雕刻` hand-carved · `素面` undecorated · `機雕` machine-carved · `巧色` carved to exploit colour zoning. State it: hand-carving is a major value driver.
- **Attribution** — state the **basis**, not just the claim (see §10.2).

---

# 10. GAP ANALYSIS vs. THE EXISTING BUILD (`assets/css/main.css`)

The site — **玉語軒 JADE & SILENCE** — is already unusually good and independently converged on most of the verified benchmarks. Below: what is **already right**, and the **concrete gaps**.

## 10.1 Already aligned with the benchmarks ✅

| Existing implementation | Benchmark it matches |
|---|---|
| `--ink:#14110F` + `--paper:#F7F4EE` + `--gold:#B08D57` + `--cinnabar:#A3372A` | The monochrome + one-metal rule; palette sits right between 1stDibs (`#F6F3EB`/`#C2A661`) and VCA (`#F2EEE4`/`#B9975B`) |
| `--serif-cjk:"Noto Serif TC","Songti TC","STSong"` + `--serif-lat:"Cormorant Garamond"` | **Exactly** Sotheby's `PMingLiu → Mercury` pairing logic, and Cormorant is production-proven at Boodles |
| `--sans:"Jost","Noto Sans TC","PingFang TC"` | The 黑體↔sans pairing; system CJK fallbacks avoid the 5–20MB webfont trap |
| `.eyebrow` 10.5px / `letter-spacing:.34em` / uppercase | The universal luxury label recipe (Sotheby's 1px tracked caps, Christie's `.chr-label`) |
| Body `line-height:1.85` on CJK | Beats the clreq minimum of 1.5 — correct for dense Chinese strokes |
| `.seal` — 96px cinnabar square, `rotate(-3deg)`, `--seal--sm`, `--seal--lt` | The 印章 motif, implemented properly (white-on-red 陽文 and outlined variants) |
| `.vtext` | Vertical CJK — the Sotheby's/Christie's convention |
| `.rv` reveal with `translateY(26px)`, `0.95–1.05s`, staggered `.rv-d1..d4` | Matches the "slow, short-distance, ease-out, staggered" rule |
| `--ease-out: cubic-bezier(.16,1,.3,1)` and `--ease:cubic-bezier(.22,.61,.36,1)` | Both are **better** than Christie's `cubic-bezier(0.39,0.58,0.57,1)` — keep them |
| `@media (prefers-reduced-motion:reduce)` at line 469 | Present and correct ✅ |
| `.gal__stage{aspect-ratio:4/5;cursor:zoom-in}` + `.lb` lightbox with prev/next | The click-to-zoom lightbox pattern |
| `.specs dl` two-column definition grid, `<h3>` gold label | Matches the 1stDibs/Bonhams spec-table convention |
| `.imgdesc` figure with `figcaption` per shot | Matches the dossier's `影像展示描述` section |
| `.enq` dark enquiry panel with `.enq__rows` contact rows | The enquiry-drawer pattern |
| `.card__fig` + `.card__cta` on hover, `.card__no`, `.card__era` | Matches the auction lot-tile anatomy |
| `.trust` band, `.stat`, `.tl` timeline | The institutional trust architecture |

## 10.2 GAPS — ordered by impact

### 🔴 CRITICAL

**1. No structured data layer.** `assets/data/` is empty; all 14 dossiers live in `.docx`. Christie's, Sotheby's and 1stDibs all render PDPs from typed fields, not prose. **Action:** convert each dossier to JSON with this schema (derived from their actual dossier structure + the 1stDibs/Sotheby's field models):

```json
{
  "id": "Antique-Jade-015",
  "category": "翡翠類",
  "slug": "feicui-pingankou",
  "title_zh": "【珍藏釋出】近代清韻：翡翠「歲歲平安」經典圓滿平安扣玉墜",
  "title_en": "Jadeite 'Peace Throughout the Years' Classic Halo Pendant",
  "auspicious_phrase": "歲歲平安",
  "material": { "zh": "翡翠", "en": "Jadeite", "species": "jadeite",
                "texture_zh": "質地細膩，水頭充足，色澤清透帶淡綠" },
  "type_zh": "糯種", "water_zh": "水頭充足", "colour_zh": "晴水 / 淡綠",
  "craft_zh": "素面拋光、圓雕（平安扣制式）", "carving": "plain",
  "age_zh": "近代工藝", "age_basis_zh": "……",
  "attribution_strength": "style_of",
  "dimensions": { "mm": "20 x 20 x 4", "weight_g": 3.15, "weight_ct": 15.75 },
  "accessories_zh": "無",
  "certificate": { "lab": "NGTC", "report_no": null, "security_code": null,
                   "verifiable": false, "treatment": "Type A" },
  "provenance_zh": null,
  "condition_zh": "整體保存近乎完美……",
  "symbolism_zh": "平安扣自古寓意「平平安安、圓圓滿滿」……",
  "use_zh": "極適合製作成項鍊吊墜、手串隔珠或隨身平安掛飾",
  "price": { "display": "on_request", "label_zh": "面議",
             "label_en": "Price on request" },
  "images": [
    { "src": "assets/images/feicui-pingankou-01.jpg",
      "srcset": ["…-520.jpg 520w", "…-800.jpg 800w"],
      "view": "front_transmitted",
      "caption_zh": "正面透光視角",
      "description_zh": "翡翠質地清潤……" }
  ],
  "views_present": ["front_transmitted", "overall"]
}
```

**2. No attribution-honesty layer — the single biggest credibility risk.**
Every one of the 14 pieces is attributed as **`X風格`** — 明代風格, 清代風格, 宋代風格, 戰漢風格, 唐宋風格, 唐代風格, 民國風格 — i.e. **"in the style of"**, *not* a verified period. Read cold, a Western collector sees an evasive date; a Chinese collector reads `風格` correctly. **Action:** add a persistent, well-designed explainer and a PDP badge:

- Badge: `風格參照 · Style reference` (not "Song Dynasty")
- Tooltip / explainer page `年代說明 / On Dating`:
  > **風格 / In the style of** — the form, tool marks, patina and carving idiom are consistent with this period. This is an informed stylistic attribution, not a laboratory or archival authentication. Where a piece has a documented provenance or a period-authenticated basis, it is stated explicitly.
- Add an explicit **`attribution_strength`** field so pieces can be ranked: `documented` > `tested` > `style_of` > `decorative`.
- ⚑ **This is also a differentiation opportunity.** No competitor states this honestly. Being the dealer that distinguishes `風格` from authenticated is exactly the BMjade move — it makes every other claim on the site believable.

**3. No floating WhatsApp / WeChat contact.** The only contact path is the inline `.enq` panel at the bottom of a PDP. The real channels are **WhatsApp `63405393`** and **WeChat ID `Roychan-Aurora`** (contact: 聰). **Action:**

```html
<!-- fixed bottom-right, 56x56, above content, below the lightbox (z-index 800) -->
<a class="wa" href="https://wa.me/85263405393?text=%E6%82%A8%E5%A5%BD%EF%BC%8C%E6%83%B3%E8%AB%AE%E8%A9%A2%20Antique-Jade-015%20%E7%8E%89%E5%99%A8"
   target="_blank" rel="noopener" aria-label="WhatsApp 洽詢此藏品">
  <!-- WhatsApp glyph -->
</a>
```
```css
.wa{position:fixed;right:24px;bottom:calc(24px + env(safe-area-inset-bottom));
    width:56px;height:56px;border-radius:50%;background:#25D366;color:#fff;
    display:grid;place-items:center;z-index:800;
    box-shadow:0 8px 28px rgba(0,0,0,.22);
    transition:transform .4s var(--ease), box-shadow .4s var(--ease);}
.wa:hover{transform:scale(1.06);box-shadow:0 12px 34px rgba(0,0,0,.28)}
@media(max-width:620px){ .wa{right:16px;width:52px;height:52px} }
```
- ⚑ **Pre-fill the message with the piece ID and title** — every enquiry then arrives already identified.
- ⚑ **WeChat has no web deep link.** The only mechanism is a QR code. Add a `WeChat` tab in `.enq` that reveals a 200×200 QR captioned **`長按識別二維碼`** on mobile ("long-press to recognise" — mobile users cannot scan their own screen) and `微信掃碼添加專屬顧問` on desktop. Attempt `weixin://` first for desktop users who have it installed.
- Add **微信公眾號 / 小紅書 / 微博** to the footer social row (Phillips lists WeChat and Xiaohongshu globally; Christie's Chinese site has a whole 中文社交媒體全覆蓋 section).

### 🟠 HIGH

**4. No certificate / authenticity page.** See §9.1. For the nephrite pieces, the equivalent page is the **dating & attribution** explainer (§10.2 gap 2) plus a **material-species** explainer (和田白玉 vs 地方白玉 vs 碧玉 vs 翡翠 — the collection spans all of them and a buyer cannot tell them apart).

**5. No `面議` bilingual standard.** Every piece carries `建議鑑賞價 (Reference Price)：面議`. `面議` is the canonical Chinese trade term for price-on-request. **Action:** formalise the display and never leave it as bare `面議`:

| Field | Chinese | English |
|---|---|---|
| Label | 建議鑑賞價 | Reference price |
| Value | **面議** | **Price on request** |
| Sub-note | 歡迎預約鑑賞，價格另議 | Available for private viewing; price on application |
| CTA | **預約鑑賞 / 洽詢此藏品** | **Enquire / Book a private viewing** |

Also add `Estimate on request` and `Price on request` as separate tokens — these are Christie's exact production strings and both are useful (the first for auction-style listings, the second for private treaty). **Never use `Call for price`.**

**6. No lot navigation.** Sotheby's/Christie's/Bonhams all have `‹ Prev · Next ›` plus Phillips' **horizontal lot-number scroller**. With 14 pieces this is cheap and high-value: a persistent `藏品 07 / 14` counter with prev/next, and a jump strip of lot numbers.

**7. No condition / provenance / literature sections in the PDP body.** `.pdp__body` currently carries the dossier's sections. Ensure the full auction-grade sequence is present and, where a field is genuinely empty, **say so explicitly** (`來源：暫無可考文獻記錄` / *No documented provenance; acquired from a Hong Kong private collection, 2019*) rather than omitting the block. **An absent provenance section reads as concealment; a stated absence reads as scholarship.**

**8. No backlit / translucency-test imagery.** The collection is largely **nephrite 和田玉 hand pieces (手把件)** where **油性 (oiliness), 包漿 (patina) and 沁色 (stain colour)** are the value drivers — plus two jadeites where **水頭** is. The shot list must be species-appropriate:
- **Jadeite:** front-lit ivory, front-lit dark, **backlit**, macro 纖維交織結構, printed-page translucency test
- **Nephrite:** raking side-light to reveal **油脂光澤 / 包漿**, macro of **沁色 / 牛毛沁 / 皮色**, transmitted light to check for 棉/裂, and a **hand-held scale shot** (all pieces are 手把件 — the hand *is* the scale reference)

**9. No `object-fit` / art-direction discipline in the gallery.** `.card__fig` is `aspect-ratio:3/3.9` and `.gal__stage` is `4/5` — both appear to `cover`-crop. Christ Christie's uses **`contain` for objects** and `cover` only for editorial. ⚑ For jade, cropping the object is unacceptable — a 手把件's silhouette and a 平安扣's roundness are the whole point. **Add `object-fit:contain` with a deliberate ground colour on all object imagery**, and reserve `cover` for lifestyle/editorial shots.

**10. No sold / reserved archive.** The gallery world's rule: *"Sold works shown proudly; the red dot is social proof, not lost inventory."* Add a permanent `已藏 / Archive` section with realised prices where permitted — the strongest credibility asset an antiques dealer can own.

### 🟡 MEDIUM

**11. CJK body `letter-spacing:.01em`.** The clreq-based rule is **`0` for Chinese body text** (Chinese glyphs smudge when tracked). Keep positive tracking on Latin labels and headings, but set Chinese body and prose to `0`:
```css
:lang(zh-Hant) .prose p, :lang(zh-Hant) .lead { letter-spacing: 0; }
```

**12. Chinese body `font-weight`.** `strong{font-weight:600}` is correct (avoids synthetic bold). Verify no `font-weight:700` reaches CJK anywhere — PingFang TC has no Bold and Noto Serif TC will fake it.

**13. No 360° / video.** At these weights (up to 336g, 105mm) a 24–36 frame spin for the top pieces is worth it. If you skip 360°, at least add a **slow rotating hero video** for the 3–4 highest-value pieces — with `<video autoplay muted loop playsinline poster>` and a **poster image so LCP is not blocked**, and no autoplay under `prefers-reduced-motion`.

**14. No response-time promise.** Add beside `.enq`: `Typically replies within 4 business hours (HKT) / 一般於 4 小時內回覆`.

**15. Filter facets are category-only.** The chips need trust/attribute facets, not just categories — using fields you already have:
`全部` · `和田白玉` · `白玉籽料` · `碧玉` · `翡翠` · `其他材質` · `明代風格` · `清代風格` · `戰漢風格` · `唐宋風格` · `民國風格` · `手把件` · `佩件` · `珠串` · `鼻煙壺` · `附證書` · `可預約鑑賞`
…plus `Trust-relevant` facets modelled on 1stDibs: **`可預約鑑賞 / Viewing available`**, **`附來源 / With provenance`**, **`已鑑定 / Examined`**, **`本週新增 / New this week`**. And a results count in the H1: `14 件藏品`.
Sort: `最新上架 Newest` (default) · `重量 Weight` · `尺寸 Size` — **not** price, since everything is 面議.

**16. No hover-magnifier on `.gal__stage`.** Cursor is `zoom-in` and opens `.lb` (good). Consider adding a desktop 2× hover-magnifier *inside* the frame as well — the standard for evaluating inclusions without leaving the page. Never open a separate browser popup window.

**17. Language coverage.** Everything is **Traditional Chinese (zh-Hant)**. Christie's and Sotheby's both run zh-Hant, but mainland buyers need **Simplified (zh-Hans)**. Add a third locale or at minimum render Simplified via a `zh-Hans` content field. The existing `.lang` control is already there — wire it to a real three-way `繁 / 简 / EN`.

**18. Marquee.** `.marq` runs a 46s infinite horizontal scroll. This is the one element that brushes against the "no scroll-jacking, restraint" rule. It is defensible if it carries **auspicious phrases / 吉祥語** (歲歲平安 · 馬上封侯 · 靈羊跪臥 · 富貴肥豬) rather than marketing copy — and it must respect `prefers-reduced-motion` (it does ✅).

## 10.3 Collections already in the inventory — note for content strategy

The 14 dossiers form unusually coherent **thematic clusters**, and each is a ready-made "viewing room" in the gallery sense:

| Cluster | Pieces |
|---|---|
| **白玉籽料 · 帶皮沁色** (white jade seed material with natural skin) | 005 靈羊跪臥 · 006 淡黃玉 · 007 喜鵲登梅 · 017 牛毛沁 |
| **圓雕手把件** (hand-held round carvings) | 004 祥龍盤踞 · 005 · 006 · 010 · 011 和合二仙 |
| **戰漢 / 唐宋 風格** (archaic-style) | 008 地方白玉 水銀沁 · 009 灰白玉 風化包漿 · 017 唐代風格 |
| **吉祥寓意** (auspicious rebus) | 馬上封侯 · 富貴肥豬 · 靈羊跪臥 · 歲歲平安 · 狐蝠雙瑞 · 瑞犬抱寶 · 喜鵲登梅 · 和合二仙 |
| **翡翠** | 014 翠綠花件 · 015 平安扣 |
| **其他材質 / 工藝** | 013 剔紅鼻煙壺 · 016 天然碧玉珠串頸鏈 |

⚑ **The 「」auspicious-phrase naming convention is your single strongest content asset.** Every title already follows the trade convention `<material>「<4-char rebus>」<form + technique>` (e.g. `白玉「馬上封侯」`, `翡翠「歲歲平安」經典圓滿平安扣玉墜`). **Build a `/symbolism`（吉祥寓意）index page** that decodes each rebus — 馬上封侯 (a monkey on a horse → "may you soon be ennobled"), 富貴肥豬, 靈羊跪臥 (filial piety), 和合二仙 (marital harmony), 歲歲平安 (a pendant → peace year after year). **Nothing in the Western luxury benchmark does this, and it is the most persuasive, most shareable, most SEO-valuable content a Chinese antique jade house can publish.** It is also exactly what makes a jade piece worth a premium over a materially identical one.

---

# 11. SOURCE LIST (jade-specific, continued)
- [BMjade — How to Verify Your NGTC Jade Certificate](https://bmjade.com/pages/ngtc-certificate-verification) — NGTC vs GIA, certificate line-by-line, both layouts, `ngtc.com.cn` verification steps, treatment codes, "what the certificate doesn't cover", the Hutton-Mdivani precedent
- [BMjade — NGTC vs GIA: Asia's Jade Authority](https://bmjade.com/blogs/news/ngtc-vs-gia-asia-jade-authority) — Type A/B/C, infrared + Raman spectroscopy
- [Valentin Magro — Jade](https://www.valentinmagro.com/gemstones/different-types-of-gemstones/jade/) — jadeite vs nephrite, colour/texture/transparency evaluation, the printed-page translucency test, imperial vs apple green
- [GM4 — WhatsApp floating button snippet](https://fwdtools.com/ui-snippets/whatsapp-floating-button/) and [PayPerWA — WhatsApp chat button 2026](https://payperwa.com/blog/how-to-add-whatsapp-chat-button-to-website-2026) — `wa.me` link format and placement
- [Red Ant Asia — How brands use WeChat](https://redantasia.com/2020/09/07/how-brands-use-wechat-for-impact-and-engagement/) — WeChat QR/QR-scan conventions for Western brands in China

---

# 12. TECHNICAL / SEO NOTES FOR A PRICE-ON-REQUEST CATALOG

⚑ *Validate these against current Google documentation before shipping — the product structured-data requirements change.*

**The core conflict:** Google's Product structured data wants a `price`, and a `Product` markup without one generally will not earn a shopping rich result. Google's documented rule is that **if you supply `price` you must also supply `priceCurrency`; otherwise supply `priceSpecification`.** ([Google Search Central — merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), [product snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet))

**Practical approach for a 面議 catalog:**

1. **Prioritise `Product` + `ImageObject` + `Brand`/`Material` + `description` over price markup.** For antiques, image and entity markup (Google Images / Google Lens on jade) will drive more qualified traffic than a shopping carousel ever would.
2. **Express availability, not price:**
   ```json
   {
     "@context":"https://schema.org",
     "@type":"Product",
     "sku":"Antique-Jade-015",
     "name":"【珍藏釋出】近代清韻：翡翠「歲歲平安」經典圓滿平安扣玉墜",
     "alternateName":"Jadeite 'Peace Throughout the Years' Classic Halo Pendant",
     "material":["翡翠 Jadeite","天然 A 貨"],
     "category":"翡翠類",
     "image":["…-520.jpg","…-800.jpg"],
     "description":"…",
     "offers":{
       "@type":"Offer",
       "availability":"https://schema.org/InStock",
       "url":"https://…/collection/feicui-pingankou",
       "priceCurrency":"HKD",
       "priceSpecification":{
         "@type":"PriceSpecification",
         "valueAddedTaxIncluded":false,
         "description":"面議 — Price on request"
       },
       "seller":{"@type":"Organization","name":"玉語軒 JADE & SILENCE"}
     }
   }
   ```
   ⚑ Use `InStock` for available, `OutOfStock` for sold, `SoldOut` where supported — **do not use `PreOrder` for a unique piece.**
3. **Mark up the certificate and provenance as structured claims**, not prose — this is what makes a jade page citable by AI answer engines:
   ```json
   "additionalProperty":[
     {"@type":"PropertyValue","name":"Treatment","value":"Type A — natural, untreated"},
     {"@type":"PropertyValue","name":"Certificate","value":"NGTC report no. …"},
     {"@type":"PropertyValue","name":"Attribution","value":"清代風格 — in the style of the Qing period"},
     {"@type":"PropertyValue","name":"Weight","value":"3.15 g / 15.75 ct"},
     {"@type":"PropertyValue","name":"Dimensions","value":"20 × 20 × 4 mm"}
   ]
   ```
4. **`BreadcrumbList`** on every PDP — mirrors the visible `Home › 翡翠 › 佩件 › …` crumb.
5. **`ImageObject` with `caption` and `contentUrl` per angle** — Google uses captions, and captioned multi-angle imagery is exactly what an authenticator or a buyer's search query matches on.
6. **`Person` markup for the specialist** and **`Organization` for the house** — feeds the E-E-A-T signals that every benchmark site expresses visually.
7. **Do not mark up a `Review`/`AggregateRating` you cannot substantiate.** An antiques dealer with fabricated review markup is a trust liability.
8. **`hreflang`** for `zh-Hant`, `zh-Hans`, `en`, with `x-default` → `en`. The three-locale split matters for Chinese search.

**Bilingual URL slugs.** Sotheby's pattern is English + pinyin (`/sapphire-and-diamond-bracelet-lan-bao-shi-pei-zuan/`). For a Traditional-Chinese-first dealer, prefer **`/collection/<pinyin-slug>/`** with the Chinese title in `<title>` and `og:title`, and add **`hreflang` alternates** rather than duplicating the tree. Keep the internal ID (`Antique-Jade-015`) in the page as a visible reference number — it is what a buyer quotes in a WhatsApp message, so it must be on the page and in the `sku`.

---

# 13. WHAT TO DO FIRST — PRIORITISED BUILD ORDER

| Priority | Task | Why |
|---|---|---|
| **1** | **Populate `assets/data/`** — convert all 14 `.docx` dossiers into the JSON schema in §10.2 | Nothing else can be built reproducibly until the content is typed. This is the blocker. |
| **2** | **PDP `面議` explainer + FAQ block** (5 objections + short "how to enquire" video) | Highest measured ROI: **+34% offers placed**, more than any layout work (§4.2) |
| **3** | **Attribution-honesty layer** — `風格參照 · Style reference` badge + `attribution_strength` field + `/on-dating` explainer | The biggest credibility risk in the inventory; also your clearest differentiator |
| **4** | **Floating WhatsApp with pre-filled piece ID + WeChat QR modal** | There is currently no persistent contact path; all 14 pieces are 面議 |
| **5** | **`/authenticity` page** (NGTC/attribution/species/guarantee — §9.1) | Turns the hardest objection into the strongest asset |
| **6** | **Lot navigation** (`藏品 07 / 14` + prev/next + number strip) and **sold archive** | Cheap with 14 pieces; the archive is the strongest long-run trust asset |
| **7** | **Species-appropriate photography** — object `contain` (not `cover`), backlit, raking-light for 包漿, macro 沁色, hand-held scale, printed-page translucency test | Jade cannot be sold on `cover`-cropped front-lit images |
| **8** | **`/symbolism`（吉祥寓意）index** decoding all 14 「」 rebuses, bilingual | Unique content no competitor has; highest SEO and shareability value |
| **9** | **Facet upgrade** — material / period-style / object-type + trust facets (`可預約鑑賞`, `附來源`, `本週新增`) | Modelled on 1stDibs' commercial facets, not just categories |
| **10** | **Micro-fixes** — CJK body `letter-spacing:0`; response-time promise; `hreflang` + 繁/简/EN; JSON-LD | Polish and discoverability |

**Deliberately NOT recommended:** 360° spin for the whole catalog (do it for the top 3–4 only), AR try-on, auto-playing hero video on every page, mega-menu navigation, and any parallax. All were explicitly identified as anti-patterns or low-ROI in the sources.

---
---

# 14. JADE APPENDIX — CORRECTIONS, QUANTIFICATIONS & LEGAL FLAGS
### Second research pass. Sources cited inline; full list at the end of this section.

## 14.1 🔴 THREE OUTRIGHT ERRORS TO AVOID — these would damage credibility

**① "Moss-in-snow" is NOT 雪花棉.** They are **two different phenomena**.
- **GIA's "moss-in-snow"** = *translucent white with bright green veining, patches or spots* → **green in white**.
- **Chinese 雪花棉** = *snow-white, light, flake/dot inclusions* suspended inside **冰種/玻璃種** → **white in white/clear**.
⚑ **Never translate one as the other.** Publishing `雪花棉 / Moss-in-snow` as a bilingual pair is a technical error an expert buyer will catch immediately. Use `雪花棉 / Snowflake cotton` and reserve `moss-in-snow` for the GIA meaning. ([GIA jade quality factors](https://www.gia.edu/jade-quality-factor))

**② "Chicken-blood" is not jade at all.** 鸡血石 (chicken-blood stone) is a **cinnabar-bearing dickite/kaolinite** from Changhua (Zhejiang) / Balin (Inner Mongolia); 桂林鸡血玉 is a separate **red quartz–hematite rock**. Neither is jadeite or nephrite. ⚑ **Never list jade with a "chicken-blood" colour name.** ([IGS](https://www.gemsociety.org/article/chicken-blood-stone-jewelry-and-gemstone-information/), [雅昌](https://news.artron.net/20140724/n632632.html))

**③ "Ming jadeite" is a red flag.** **Jadeite only came into wide use in China from the mid-18th century.** Ming-dynasty jade is **nephrite/和田玉**, not 翡翠.
⚑ Directly relevant to the inventory: the two 翡翠 pieces (014, 015) are attributed **近代風格 / 近代工藝** — correct. The earlier attributions (戰漢/唐宋/唐代/明代/清代) are all on **nephrite 白玉/青黃玉/灰白玉**, which is consistent. **Keep that separation absolute** — the moment a 明代 attribution appears on a 翡翠 piece, the whole catalogue loses credibility. ([Mason-Kay](https://www.masonkay.com/natural-vs-treated-jade))

**Bonus trap:** **`油青` looks markedly better under warm lamp light than in daylight** — lamp light amplifies its good 種水, daylight exposes its grey 色. This is the single strongest argument for publishing a daylight frame on every piece (see §14.6).

## 14.2 水頭 (translucency) — now quantifiable, so stop describing it vaguely

**The trade rule of thumb (widely cited):**
> **一分水 ≈ 3 mm of full transparency · 二分水 ≈ 6 mm · 三分水 ≈ 9 mm** (3 fen = most transparent). Pieces under 1 mm of transparency are called `水差 / 水干`.

**National-standard 5 transparency grades (翡翠分級國標):**
`透明 Transparent` · `亞透明 Sub-transparent` · `半透明 Semi-transparent` · `微透明 Slightly transparent` · `不透明 Opaque`

(For reference: HKJSL reports use only **three** — Transparent / Translucent / Opaque. GIA runs "completely opaque to semitransparent," with the best described as *"text you can read through it would be slightly blurred."*)

⚑ **Publish `几分水` as a numeric field.** `水頭：二分水（約 6mm）· 亞透明` is enormously more credible than "水頭充足". Your **dossier 015 says 「水頭充足」** — replace with the numeric estimate.
([中維質檢](http://www.zwjczx.com/article/fei-cui-de-shui-tou-shi-shen-me-yi-si.html))

### 🔴 MANDATORY DISCLOSURE: 調水 (manufactured apparent water)
Apparent translucency **can be manufactured** three ways:
1. **挖薄 / 挖空** — carving the piece thin, or hollowing the back into a concave面 (classic behind Guanyin heads and Buddha bellies)
2. **鑲嵌封底** — a metal foil or solid back that bounces light back through the stone
3. Thinning at the edges

A metal-backed piece looks **far** more translucent than the stone alone, and **the effect disappears when the backing is removed.**

⚑ **Add a required PDP field: `調水處理：背面封底 / 挖薄 / 無`** and disclose it in the same visual weight as the certificate. This is a genuine value-integrity issue and the exact kind of honesty that separates a serious dealer. It should sit adjacent to `處理狀態 (Treatment)`.

## 14.3 起光 / 起熒 / 起膠 — the optical effects you must photograph, not claim

| Term | Mechanism | How it looks |
|---|---|---|
| **剛性** gāng xìng "rigidity" | Requires 種老, high clarity, a **domed (弧面)** surface and precision polish | Hard, cold, steel-like specular reflection; **tight, high-contrast highlight** |
| **起熒 / 起瑩** qǐ yíng "raising glow" | Fine grain + **ordered** crystal arrangement | Internal light/dark contrast, a **bright rim glow** |
| **起膠** qǐ jiāo "raising glue" | Crystal arrangement **disordered** | Soft, continuous, all-over glow like set glue — typical of **木那** material |

🔴 **Critical caveat:** **acid-bleached + polymer-impregnated (B貨) jade can ALSO show 起熒/起膠**, because acid refining makes the crystal finer.
⚑ **Never caption a photograph `起膠` / `起熒` as a quality claim without an IR-backed A貨 certificate in the same listing.** These effects are evidence of *appearance*, not of *treatment status*.
([搜狐/翡翠資源共享平台](https://m.sohu.com/n/488201198/))

## 14.4 Colour vocabulary — expanded, with the honest caveat

⚠️ **There is no standards body publishing hex/RGB values for Chinese jadeite trade colour names** (unlike Pantone). The values below are **working design approximations** derived from trade hue/saturation descriptions and published "jade" colour references — usable as **UI tokens for filter chips and tags**, and **always paired with the Chinese term + a photograph**. **Never present them as grading criteria or as a substitute for the certificate's 顏色 field.** Published anchors: jade `#00A86B`, 翡翠色 *Hisuiiro* `#3F9877`, "Jadeite" `#38C6A1`.

### Green — the value driver
| 中文 | Pinyin | English | Hex range (typ.) | Description |
|---|---|---|---|---|
| **帝王綠** | dìwáng lǜ | **Imperial green** | `#045E3A`–`#12A05C` (`#056B45`) | Deepest, purest, most saturated emerald green, **no grey**. *"Pure and penetrating… looks intense even from a distance."* May lean slightly blue or yellow. Top value. |
| 陽綠 / 蘋果綠 | yáng lǜ | Apple / Yang green | `#3FA33F`–`#8CC63F` (`#5FAE3C`) | Bright, lively **yellow**-green; lighter/yellower than imperial. GIA: *"an intense yellowish green."* |
| 秧苗綠 / 黃陽綠 | yāngmiáo lǜ | Seedling green | `#9ACD32`–`#B8D94A` (`#A6CE39`) | Fresh yellow-green of young rice shoots; yellower and brighter than 陽綠 |
| **鸚哥綠** | yīnggē lǜ | **Parrot green = GIA "kingfisher"** | `#0E8F6E`–`#21B58A` | Vivid green with a touch of blue. GIA: *"kingfisher jade… only slightly less vivid than Imperial."* |
| 菠菜綠 | bōcài lǜ | Spinach green | `#2C5B34`–`#4A7A46` (`#3B6B3D`) | Dark, muted, slightly grey-green; usually less translucent. ⚠️ In the West "spinach jade" usually means dark-green **nephrite/碧玉** |
| 瓜皮綠 | guāpí lǜ | Melon-rind green | `#4E7F6A`–`#6FA383` | Green with a distinct blue-grey cast |
| 蛤蟆綠 | háma lǜ | Toad green | `#5A7D5A`–`#7E9E76` | Dull green, grey/blue cast, often white-mottled. Low-end |
| **油青** | yóu qīng | Oil-green / oil-blue | `#2F4F4F`–`#4E6E68` (`#3D5F5A`) | Dark greyish green-blue, greasy lustre, fine grain, often good translucency — **but grey colour kills price.** Trade calls it `較虧的品種` (a losing variety). Deep-toned form = 瓜皮油青 |
| **藍水** | lán shuǐ | Blue water | `#2E6E8E`–`#5C9CBC` (`#3F7FA8`) | Blue-dominant, **very even colour, almost no 色根**, 糯種 or better. Best is 海水藍. Described as 剛性好, ice-clear |
| 綠水 | lǜ shuǐ | Green water | `#2E8B6E`–`#52B78E` | Same family as 藍水 but green-leaning |
| **晴水(底)** | qíng shuǐ | Clear-sky water | `#A7D8C8`–`#C6E7DA` (`#B4DECD`) | Pale, bright, even blue-green **base colour**. **Must be 冰種 or better and clean** (no grey/black tone, no 棉/綹/髒/裂) |
| **紫羅蘭** | zǐluólán | Lavender | 粉紫 `#C79BC8`–`#E0BEDD` · 藍紫 `#8E7CB0`–`#B09ACB` · 茄紫 `#6B4E7E`–`#8D6A9A` | Three sub-tones. **粉紫 pink-purple is best.** Second most valuable family after green |
| 春帶彩 | chūn dài cǎi | "Spring with colours" | lavender + green | 春/椿 = 紫羅蘭, 彩 = green. **One stone carrying both** — rare, commands a premium |
| 白底青 | bái dǐ qīng | White-background green | white `#F3F2EA` + green `#2E8B57`–`#57AE4A` | Snow-white opaque body with **vivid green patches/bands, sharp contrast**; usually coarse-grained and "dry". Mid-low grade |
| **墨翠** | mò cuì | Ink jade | reflected `#1B1B1B`–`#33352F`; **transmitted `#14654A`–`#2E8B57`** | Black/ink in reflected light with iron-grey sheen; **transmits blue-green under strong light**. Mineralogically 綠輝石質翡翠 (omphacite-rich). **Hardness slightly LOWER than ordinary jadeite.** Myanmar nickname 情人的影子 |
| 紅翡 | hóng fěi | Red jadeite | `#8C3B25`–`#B5553A` | Secondary (oxidised) reddish-brown. The 翡 of 紅翡綠翠 |
| 黃翡 | huáng fěi | Yellow jadeite | `#C08A2E`–`#D9AE55` | Secondary yellow to brownish-yellow |
| **雪花棉** | xuěhuā mián | **Snowflake cotton** (NOT "moss-in-snow") | flakes `#FFFFFF` / body `#D8EDE6` | Snow-white flake/dot inclusions suspended inside 冰種/玻璃種, typically from the **木那 (Muna)** mine. **Valuable only when evenly spaced** — trade ideal is `中雪`. *"點點雪花，混沌初開，木那至尊"* |
| 乾青種 | gān qīng zhǒng | Dry-green type | green `#1F7A3D` but **opaque** | Intense pure green, transparent-to-opaque, coarse. Main mineral **鈉鉻輝石 (kosmochlor)**. 鐵龍生 belongs here. Mid-low grade |

**GIA's three Western colour names:** **Imperial · kingfisher · apple.** Lavender is *"the next most valuable colour."* ⚑ For an English-language audience, lead with these three + lavender; they are the only terms GIA actually defines.

### 種 (texture/type) — GIA frames this as **crystal size**
`玻璃種 glass` (fully transparent, extremely fine, sharp 起光/剛性) · `高冰種 high ice` · `冰種 ice` (semi-transparent like ice) · `糯冰種 glutinous-ice` · `糯種 glutinous-rice` (milky, semi-translucent) · `豆種 bean` (nearly opaque, visible grains, low grade) · `芙蓉種 hibiscus` (fine, pale green, even) · `油青種` · `乾青種`.
GIA's parallel vocabulary: **fine / medium / coarse crystal = "old mine / relatively old mine / new mine."** ⚑ Publishing both the Chinese 種 and GIA's crystal-size framing on the PDP serves both audiences from one field.

## 14.5 Certification — the exact fields to publish

### NGTC (`國家珠寶玉石質量監督檢驗中心` / 珠寶國檢)
Legal basis: **GB/T 16552** (naming), **GB/T 16553** (identification), **GB/T 16554** (diamond grading).

Real certificate fields with official bilingual labels (pulled verbatim from a live queryable record — cert `13202112355`):

| Field | Typical value |
|---|---|
| 證書編號 / 檢驗號 | e.g. `13202112355` (11 digits) — **may contain `-`, which must be typed** |
| 簽發日期 | issue date |
| **檢驗結論 Conclusion** | `翡翠(A貨)` natural untreated · `翡翠(處理)` / `翡翠(注膠)` / `翡翠(染色)` treated · `拼合翡翠` · `再造翡翠` · `合成翡翠` · `仿翡翠` |
| 總質量 Weight | g or ct (1 ct = 0.2 g), 2 decimals |
| 規格/形狀 Size/Shape | `雕件` / `鐲形` / `弧面形` / `圓珠` |
| **顏色 Colour** | **official vocabulary only** — `淡綠色`, `綠色`, `深綠`, `淺紫色`, `油綠色`… **NOT trade slang** |
| 折射率 Refractive | `1.66(點測)` |
| 密度 Density | `3.33` / `3.34` g/cm³ |
| 光性特徵 Optic character | `非均質集合體` |
| **放大檢查 Magnification** | `纖維交織結構` or `纖維柱粒交織結構` |
| 光譜 Spectrum | `見437nm吸收線` / 紫外可見光譜: `天然翡翠特徵譜` |
| 熒光性 | `無` (some treated material fluoresces) |
| **特殊檢查 Special test** | `紅外顯示天然翡翠特徵` — **IR is the definitive B-jade test** |
| 備註 Remarks | e.g. `配石未測`, `總重含繩`, or the specific treatment method |
| 鑑定者 + 審核者 | **two different named signatories** (handwritten on paper certs) |
| 資質標誌 | **CMA** (mandatory legal minimum) · CAL · **CNAS / ilac-MRA** — plus a 鋼印 (embossed stamp) and anti-counterfeit label |

**⚑ NGTC electronic certificate (2021–):** CR-80 credit-card size, black/frosted, with an embedded **RFID high-frequency secure tag using 國密 (national cryptographic) algorithm encryption — not copyable.** Read via the **珠寶國檢 App using NFC**, or by scanning the QR / entering the number in WeChat or Alipay. Registering in the App stores your verification history under `驗證記錄`. ([NGTC official](https://www.ngtc.com.cn/news/jt/67033.html))

**Verification checklist to publish:**
1. Go to the issuing lab's **own** site (NGTC = `ngtc.com.cn` / 珠寶國檢 App; HKJSL = `jadeitelaboratory.com.hk`)
2. Enter **BOTH** `證書編號` **AND** `防偽碼/查詢碼` — **NGTC has stopped SMS queries**; the 防偽碼 is **not** the issue date and does **not** start with a year like 2007/2008
3. Compare the **archive photograph, 總質量 and 檢驗結論** against the physical piece — **this is the anti-`套證` step**
4. Old certs: card certs from **2004-10-01** and paper certs from **2005-01-01** onward are queryable; **brand-new certs take a few days to upload**
⚑ Also recommend **`gsxt.gov.cn`** (國家企業信用信息公示系統) to verify the *seller*, and `12315/12345` for disputes. ([德宏普法](https://www.edehong.com//ztnr/2026/0624/258404.html))

### 🎉 A REAL TRUST LEVER — GIA country-of-origin for jadeite
**GIA provides country-of-origin determination for untreated jadeite jade and omphacite jade from Myanmar (Burma) or Guatemala.** This is one of GIA's *existing* origin services (alongside alexandrite, emerald, Paraíba tourmaline, red spinel, ruby and sapphire). From **1 January 2026** GIA additionally launched **redesigned coloured-stone reports**, **extended origin services to opal, peridot and demantoid garnet**, and revised weight categories and fees — and it bases these on a collection of **32,000 samples** gathered by GIA field gemologists. ([GIA press release](https://www.gia.edu/gia-news-press/gia-to-update-gemological-reports-for-colored-stones), independently corroborated by [Centurion, 18 Dec 2025](https://news.centurionjewelry.com/articles/detail/gia-to-update-colored-stone-reports-and-expand-origin-services-from-jan-1-2026))

⚑ **Precision matters here** — I initially read the Jan 2026 announcement as *introducing* jadeite origin, and the trade coverage clarifies these are **existing** jadeite/omphacite origin services that the 2026 update **builds on**. So the capability is available **now**, not from a 2026 start date.

**Why it still matters for 玉語軒:** §9.1 correctly warns *"never claim certified Burmese origin"* — **this is the exception.** A GIA report stating Myanmar origin lets you legally and verifiably say **`緬甸天然翡翠（GIA 產地報告）`**, which no NGTC or HKJSL certificate can give you (both identify material and treatment, **not** origin). It is a genuine differentiator for the top one or two pieces, and it is the only certificate in the stack that answers an origin question — including for your**天然碧玉 (016)** and **和田玉** pieces where origin is central to value, though note GIA's service covers **jadeite/omphacite**, *not* nephrite.

### HKJSL (`香港玉石鑑定中心`, est. 1993, HOKLAS-accredited)
⚑ **Its certificate has exactly THREE sections — publish this structure verbatim, it is the clearest in the industry:**
1. **Description** — Shape and cut (oval cabochon / bangle / pendant / fancy / carving); **Weight in carat** ("each piece is weighed on an electronic balance using carat as the unit"); **Dimensions in millimetre** (length, width, thickness); **Transparency** — *Transparent / Translucent / Opaque*; **Colour** graded on **Evenness** (even ↔ uneven / patches / veins / spots), **Tone** (light ↔ dark), **Hue** (bright green, green, lavender, red, orange, yellow…)
2. **Tests and findings** — Polariscope (anisotropic, polycrystalline); Refractive index **1.65–1.72**; Specific gravity **3.25–3.50**; Fluorescence (natural is mostly **inert**; treated gives strong chalky white/blue); Visible spectrum (natural bright green shows fine **chrome lines** in the red; dyed shows a **wide red band**); Magnification (fine→coarse; fibrous / granular / combination); Chelsea colour filter (green dye appears reddish — reference only); **Infrared spectrum** (detects resin or excess wax); Remarks (may state Type A / Type B)
3. **Conclusion — exactly one of four:**
   - `Natural Fei Cui`
   - `Chemically Treated and Resin Impregnated Fei Cui`
   - `Dyed Fei Cui`
   - `Chemically Treated, Resin Impregnated and Dyed Fei Cui`

Online check: **Cert No + Weight**; only certs issued after **1 July 2011**; archive appears **72 h after issue**. HKJSL also sells dealers **preliminary infra-red analysis** specifically *"to avoid buying chemically-treated goods."*
([Classification](http://www.jadeitelaboratory.com.hk/lab/jade_classification_en.html), [Cert check](http://www.jadeitelaboratory.com.hk/lab/cert_report_en.html))

### Other labs worth naming
- **SSEF** (Basel) — report verification at `my.ssef.ch`; offers **GemTrack™**, **age dating**, and **DNA fingerprinting** — the last two are unusual, museum-grade trust features worth citing for the top pieces ([SSEF jade](https://www.ssef.ch/reports/jade/))
- **GRS** (Bangkok/HK) — online Report Verification; widely used in the HK/Greater-China high-jade market ([GRS](https://www.gemresearch.ch/report-verification))
  ⚠️ **GRS publishes no proprietary jadeite colour grade.** Their published nomenclature (Pigeon Blood, Royal Blue) is **ruby/sapphire-focused**. Treat any claim of "GRS Imperial Green" with suspicion — and never imply it.

### A/B/C/B+C/D — the economics that make disclosure non-negotiable
| Grade | Meaning |
|---|---|
| **A貨 Type A** | Natural, untreated. **Only colourless wax is permitted** — HKJSL: *"To polish Natural Fei Cui with colourless wax, which does not cause any damage to the crystalline structure… shall not be classified as a chemical treatment."* Mason-Kay: *"Only beeswax is used to fill the stone's microscopic surface pores — as has been done for centuries."* |
| **B貨 Type B** | Acid-bleached + polymer-impregnated. Poor rough is immersed (sometimes heated) in **sulfuric or hydrochloric acid for up to several weeks**, repeatedly; sodium and internal stains are leached out; then neutralised and impregnated with polymer in a centrifuge. |
| **C貨 Type C** | Dyed. Detected by Chelsea filter (reddish), spectroscope (**wide red band** vs natural chrome lines), UV fluorescence. |
| **B+C貨** | Bleached + impregnated + dyed. |
| **D貨** | Chinese trade shorthand for **simulants**: glass, dyed quartzite (馬來玉), 岫玉 (serpentine)… ⚠️ **Certificates never say "D貨"** — they name the actual material (`人造玻璃` / `染色石英岩` / `岫玉`). |

🔴 **The economic stakes — why treatment disclosure is a value issue, not a formality:**
- **B jade is worth ~5–10% of the equivalent A jade.** C and D jade: **$2–$20.**
- B jade **discolours**, is **brittle enough to fracture on minimal impact**, and **household detergent or acetone can break down the polymer**. Improperly neutralised stones have reportedly caused **skin burns**.
- **GIA (Gems & Gemology, Fall 1992):** *"infrared spectroscopy is the only method found thus far that provides conclusive evidence of polymer impregnation in all cases."* RI and SG are unchanged or insufficiently changed. ([GIA G&G Fall 1992](https://www.gia.edu/gems-gemology/fall-1992-bleaching-jadeite-fritsch))

⚖️ **FTC DISCLOSURE RULE (US sales).** FTC gem-enhancement guidelines require disclosure if the enhancement **is not permanent, requires special care, or significantly affects value.** With full disclosure, selling B jade **is legal** in the US; many sellers still do not disclose.
⚑ **Put the disclosure in the listing body, not the fine print.** Recommended wording:
> **處理狀態：天然翡翠（A貨）** — Natural Type A jadeite. No bleaching, no polymer impregnation, no dyeing. Surface wax only (traditional, colourless, reversible).
> **證書：** NGTC No. ______, 檢驗結論 `翡翠(A貨)`; verify at ngtc.com.cn / 珠寶國檢 App (cert no + 防偽碼).
> **If ever B/C/B+C/拼合/再造/合成/仿:** state it **prominently in the H1 area**, name the exact process per **GB/T 16552 Table B.1** (`染色處理`, `漂白充填處理`, `覆膜處理`…), and price accordingly.
([Mason-Kay Natural vs Treated](https://www.masonkay.com/natural-vs-treated-jade), [FTC Disclosure](https://www.masonkay.com/ftc-disclosure-guidelines))

## 14.6 Photography — the verified spec, and the 灯下不觀玉 answer

### The principle, stated properly
**灯下不觀玉** — *"don't appraise jade under a lamp."* Under artificial light the colour looks more brilliant and the 水頭 looks fuller, so the buyer over-values the piece; the trade calls being fooled this way **「吃藥」**. The companion proverb is **「月下美人、燈下玉」** — *moonlight flatters a beauty, lamplight flatters jade.* Hence the term **燈玉** ("lamp jade") and the rule **燈玉不看**. Practical advice given to buyers: *walk the piece away from the shop lights, ideally outside into daylight, before deciding.* ([中國文物網](http://wenwuchina.com/a/62/243987.html), [翡翠王朝](https://www.jaadee.com/feicuishouce/feicuizhishi/feicuimiji/9071.html))

### The verified studio setup — **[a published Chinese commercial jade-photography case study]**
```
Subject:    ice-type jadeite leaf pendant (冰種葉子吊墜)
Camera:     Canon 5D Mark IV + 100mm f/2.8L macro
Method:     indoor studio, still-life close-up, DARK background
Lighting:   softbox KEY LIGHT + BOTTOM TRANSMITTED LIGHT (柔光箱主光 + 底光透射)
            colour temperature 5500 K · CRI ≥ 97
Frames:     ~30 originals, then selects retouched
Delivery:   TIFF (print) + JPEG (e-commerce) + WebP (web)
Post:       texture/material enhancement, COLOUR CALIBRATION,
            background cleanup, detail sharpening
```
([廣州艾米視覺](https://www.airmie.cn/shijuesheying/chanpinsheying/shipinpaishe/2505.html))

### Rules from GIA (Weldon & Conrad, *How to Photograph Gems & Jewelry*)
- 🔴 **"Use a single colour temperature of light.** Try to avoid environments that have mixed lighting — like fluorescent, incandescent and daylight. Find a location that has one kind of lighting, and use it as your only source."
- **Direct** light for ornamental/opaque materials and phenomena (asterism, chatoyancy); **diffused** light shows a gemstone's best colour — *"place a translucent white glass, plastic, or cloth between the light source and the gem. Tracing paper, onionskin paper or translucent vellum are also good choices."*
- Add white cards/reflectors to bounce light into the subject.
- **Backgrounds — and for jade this is diagnostic, not decorative:** black (light-toned pieces look better on darker ground; contrast adds drama) vs white (*"a clean white piece of paper, plastic or tile… can keep the picture uncluttered and help achieve a correct colour balance"*). ⚑ **White shows the true body colour and translucency honestly; dark shows the glow and 起光 but flatters a grey stone.** Shoot both, label both.
- Tripod + **wireless shutter release**; clean the piece; **cotton gloves**; clip-on macro for inclusions.
- Fix colourcasts **before** finishing the shoot; use a calibrated workflow, never a "vivid" preset.
([GIA — How to Photograph Gems & Jewelry](https://www.gia.edu/gem-photography))

### The pros who actually shoot Christie's Hong Kong jade
**Tino Hammid** has produced jade images *"for Christie's Hong Kong jewelry sales for about 25 years."* His method and warnings:
- Uses **a large, rectangular diffuser, carefully placed**
- 🔴 **Hide everything behind the stone** so you don't see the background through it
- The classic cabochon blunder: **reflecting yourself or your equipment in the polished surface**
- 🔴 *"Unless you angle it strategically, a square light… will create a **square reflection**"* — in a polished jade dome
- **John Parrish** on cabochons: they need *"a more specular light that gets down into the depths of the stone… you're showing not so much the shape as **colour and clarity**."*
- **Eydis Einarsdóttir**, for a pendant the client wanted to glow: *"a round, circular light on high power to light it up and create a nice reflection."*
- On colour: *"jade tends to be very close to the **green channel**, so you can make a nice, bright jade green by shooting it digitally."*
- **Focus is the number-one amateur failure** — know your lens's minimum focus distance.
([The Jewelry Loupe — tips from the pros](https://thejewelryloupe.com/how-to-photograph-gems-tips-from-the-pros/))

### Colour-managed workflow — the spec to publish
| Parameter | Value |
|---|---|
| **Colour temperature** | **5500 K**, single source. Never mix 3200 K tungsten with 5500 K flash |
| **CRI** | **≥ 97** (mass-market lightboxes are often 95 — acceptable, but keep it consistent across all shots) |
| **Diffusion** | Softbox/lightbox with a translucent panel between light and stone |
| **Specular source** | A second small **round** (for glow) or **rectangular** (for 剛性) source, angled |
| **Transmitted** | Bottom/fibre-optic **透射** light to prove 水頭 |
| **Reference target** | Shoot an **X-Rite ColorChecker** (or at minimum a neutral grey/white card) in **every** setup; apply one profile to all images of a piece |
| **Colour space** | Shoot RAW → edit wide → deliver **sRGB** for web (TIFF/Adobe RGB for print) |
| **Grade** | **No saturation, no vibrance, no "vivid/landscape" picture style, no selective green boost** |

**Deliverables per piece:**
(a) white-ground front, diffuse-lit, colour target in frame · (b) dark-ground front, same lighting · (c) **backlit/transmitted** on a light panel with the stone off the surface · (d) macro of inclusions / 棉 / 裂紋 · (e) side/profile for thickness and carving depth · (f) in-hand or on-wrist with a ruler or coin for scale · (g) **an unedited "as-received" JPEG alongside the retouched one**.

⚑ **And the single strongest anti-distrust asset a jade site can publish: a `/how-we-photograph` page** stating 5500 K, the CRI, no saturation applied, sRGB, and *"every image is shot before retouch"* — **plus one photo of every piece taken in natural daylight by a window.** That daylight frame is the direct, verifiable answer to 灯下不觀玉, and it costs nothing. Label every image with its light source (`5500K studio, diffused, no colour adjustment`).

**Photographing the optical effects:** 剛性 = a tight, hard, high-contrast **specular** highlight off the dome at a grazing angle (large rectangular diffuser, angled). 起熒 = a **bright rim/edge glow** where the fine-grained interior contrasts with the shadowed part. 起膠 = **soft, continuous, uniform inner luminosity with almost no specular edge.** ⚠️ Remember the B貨 caveat in §14.3 — never caption these as quality claims without an IR-backed A貨 certificate in the listing.

## 14.7 Measurement, units and the disclosure fields

### 圈口 (bangle inner diameter)
**The published measuring method:** wrap a thin cord around the widest part of the palm (thumb tip pressed to the base of the little finger), measure the length, then **divide by 3.14.**
> Worked example: palm circumference **17 cm ÷ 3.14 ≈ 5.41 cm → 54 mm 圈口**. ([鑽百科](https://www.zuanbaike.com/baike/NW3gLzkMeP.html))

- **貴妃鐲 (oval/"consort" bangle) needs +1 to +2 mm** versus a round bangle for an average or stiff hand; a very flexible hand can go 1–2 mm *smaller*.
- Real listings span **51.8 / 55.8 / 58.8 mm** and Chinese listings quote `圓條60` / `正圈61`. **Quote the range 50–62 mm, most common 54–58 mm** — and **always specify the form** (`圓條` round-section / `正圈` flat inner / `貴妃` oval), because the same number fits differently.
- Also give **條寬** (band width, mm) and **條厚** (band thickness, mm) — these drive both price and perceived 水頭.

### Unit conversions — getting these right is itself a trust signal
```
1 克拉 ct = 0.2 克 g        1 g = 5 ct        1 ct = 100 分 (points)
1 珠克 = 0.25 ct = 0.05 g
Hong Kong:      1 兩 = 37.429 g      1 錢 = 3.743 g
Mainland China: 1 兩 = 31.25 g       1 錢 = 3.125 g   ← the precious-metals 16-兩 convention
1 troy oz = 31.1035 g · 1 avoirdupois oz = 28.3495 g · 1 inch = 25.4 mm
```
⚠️ A mainland 市斤 is 500 g with 10 兩 (= 50 g/兩), which does **not** match the precious-metals convention above. **State which system you mean.**
⚑ **HKJSL certificates weigh in carats; NGTC/Chinese certificates and retail sites use grams to 2 decimals.** Publish **both** on every PDP.

### 🔴 The most litigated field in jade retail: 瑕疵 / 外傷
Be explicit **and photograph it**. Distinguish rigorously:
- **石紋** — internal stone line, **not structural**
- **裂紋** — a **structural crack**
- **棉 / 雜質 / 黑點** — cotton, foreign matter, black spots
⚑ Add a dedicated field `瑕疵外傷：無 / …` (real Chinese listings do exactly this) and require a photograph for anything listed. This is where disputes are won and lost.

### Recommended standard spec table
```
貨號 / SKU                      (internal, permanent)
名稱                            天然緬甸A貨翡翠冰種陽綠平安扣掛件
品類                            手鐲 / 掛件 / 吊墜 / 戒面(蛋面) / 珠鏈 / 擺件 / 手把件 / 印章
產地 Provenance of material     緬甸 / 危地馬拉     ← GIA can now certify this (§14.5)
種水 Texture/type               玻璃種 / 高冰種 / 冰種 / 糯冰種 / 糯種 / 豆種 (+芙蓉/油青/乾青/墨翠)
水頭 Translucency               透明/亞透明/半透明/微透明/不透明 + 幾分之水 (1分≈3mm, 2分≈6mm, 3分≈9mm)
顏色 Colour                     中文術語 + English (帝王綠/Imperial green; 陽綠/Apple; 紫羅蘭/Lavender;
                                春帶彩; 白底青; 油青/Oil-green; 藍水/Blue water; 晴水/Clear-sky;
                                墨翠/Ink jade; 紅翡; 黃翡; 飄花)
尺寸 (pendants/carvings)        長 × 寬 × 厚 mm
尺寸 (bangles)                  圈口 mm + 條寬 mm + 條厚 mm + form (圓條/正圈/貴妃)
尺寸 (beads)                    珠徑 mm + 珠數 + 串長 mm
重量                            g (2dp) AND ct (2dp)
瑕疵 / 外傷                     石紋 vs 裂紋 vs 棉 / 雜質 / 黑點  ← photograph it
工藝                            素面/光身 vs 雕刻; 題材 (平安扣/觀音/佛公/貔貅/如意/竹節); carver if 大師工
調水處理                        背面封底 / 挖薄 / 無          ← MANDATORY (§14.2)
處理狀態                       天然翡翠（A貨）or the exact GB/T 16552 treatment name
證書                            lab + number + issue date + verification link + 防偽碼
年代 (antiquities)              清/明/民國/明清, "18th century", "in the style of" + 傳世 vs 出土
來源 / 傳承                      prior collection, deaccession, auction lot, publication/exhibition + document list
退換 / 保障                      inspection window, money-back amount, escrow option, re-authentication clause
價格                            currency, 議價 flag, and for antiques a note on material vs craftsmanship value
```

**Hololith — a term worth adopting.** GIA uses **hololith** for a piece carved entirely from a single piece of rough (bangles, rings, pendants). It matters commercially: *"when a cutter fashions a bangle from a single piece of rough, a great deal of weight loss results. For this reason, hololith bangles cost more than bangles that consist of several pieces joined together by precious-metal hinges."* ⚑ Add `整體雕琢 Hololith：是/否` — and it directly supports your `.specs` table.

## 14.8 傳世 vs 出土 — directly relevant to the existing inventory

Your dossiers already use **沁色, 包漿, 牛毛沁, 皮色, 水銀滲沁色** — so the site should teach this distinction properly and claim it precisely.

**傳世 (chuán shì, handed down).** Patina/包漿 built from **air (N, O₂, CO₂) and decades of handling** — sweat-borne sodium chloride, urea, carbonates — producing a soft, natural, waxy **蠟樣光澤** oxidation film, `溫潤光亮`.
**The test to publish:** light reflected off the surface. Anything with **浮光掠影** (superficial, flashy gloss) **is not old.**

**出土 (chū tǔ, excavated).** **沁色** (stain penetration) from metal-mineral elements in the tomb soil, **penetrating from the surface into the body, most obvious at flaws and cracks.** Named types:

| Term | Source mineral | Appearance |
|---|---|---|
| **黑沁 / 黑漆古** | lead or iron | black |
| **血沁 / 棗皮紅** | — | dark red |
| **土沁** | earth | chestnut-brown stain, plus **yellow soil spots that will not wash off** — common on Han and Yuan pieces |
| **水沁** | water | white stain, mostly from Jiangxi / Zhejiang / Jiangsu / Guangdong / Guangxi |

**Dry soil** gives **dry, crisp, brighter** stains; **wet soil** gives **moist, duller** stains — `近水則濕，遠水則燥`.
([未來網](http://guoxue.k618.cn/gxzs/201412/t20141226_5792007.htm); scholarly: 楊伯達《傳世古玉辨偽綜論》,《故宮博物院院刊》1997年第4期 — [CNKI](https://wap.cnki.net/touch/web/Journal/Article/GGBW199704001.html) / [故宮 PDF](https://www.dpm.org.cn/Uploads/pdf/1524/T00017_00.pdf))

⚑ **This is a content goldmine for your catalogue.** Pieces 005/006/007/011/017 (帶皮籽料, 皮沁) and 008 (水銀滲沁, 戰漢風格) can each carry a scholarly 沁色 note with the named stain type and the dry/wet-soil reasoning. **No competitor explains 沁色.** It is the single most differentiating content you can publish on a nephrite hand piece — and it makes a `風格` attribution feel like scholarship rather than a hedge.

## 14.9 Provenance models worth copying, and the guarantee/escrow stack

**Christie's own process language** (adopt this structure): authentication by specialists; *"Provenance — we review ownership history, supporting documents and relevant databases to ensure a smooth title transfer"*; condition reporting for every item; specialist estimate ranges. ([Christie's buying guide](https://www.christies.com/en/help/buying-guide/overview))

**The best deaccession precedent — and a template for a "provenance-led" sale:** Bonhams, *Passion and Philanthropy: Chinese Art from The Metropolitan Museum of Art*, 18 March, New York — **174 lots, all at No Reserve**, material with provenance from **24 Gilded Age figures** including John D. Rockefeller Jr., Samuel Putnam Avery, William Rhinelander Stewart and **Samuel T. Peters**. Over **350 jade carvings gifted by Peters 1911–1916** were included; a late-Qing string of 26 jade beads estimated **US$25,000–35,000**. The Met's stated rationale: *"annually deaccessions works of art, following comprehensive review with a focus on similar or duplicate objects,"* with proceeds to acquisitions. ([Bonhams](https://www.bonhams.com/zh-cn/press_release/37960/))
⚑ **Museum deaccession is itself a trust format** — the Lizzadro Museum of Lapidary Art literally lists pieces titled *"(Deaccessioned) Jadeite 20th century pendant."* If any of your 14 pieces has a prior collection, auction lot or publication, **make it the headline of the listing**, not a footnote.

**Guarantee benchmarks:**
- **1stDibs Money-Back Guarantee (Trade):** refund up to **US$100,000** if an item is significantly different from described, damaged in transit, or never arrives. Buyer must report within **seven calendar days** of delivery; extended windows of **30–120 days** for Trade 1st tiers (effective 7 Jan 2025). **Not covered:** accurately described undamaged items, odour complaints, self-arranged shipping or in-person pickup, or purchases outside 1stDibs checkout. ([1stDibs Promise](https://www.1stdibs.com/info/trade/promise/))
- **Chinese retail norm** (published by 御府和田玉): `免費附贈鑑定證書` · **7 天無理由退換貨** · `終身免費保養` · `全國免運費`.
- **Mason-Kay** is the model Western jade house: since **1976**, family-owned, member of **AGTA / JBT / JVC**; *"guarantees all our jade to be natural, untreated jadeite jade… Mason-Kay does not deal in treated jadeite or nephrite"*; uses **in-house infra-red spectroscopy** to positively identify polymer-impregnated B jade (equipped since **1995**, then the only US commercial jade jewellery company doing so); issues warranty certificates; provides value assessments for appraisers, stores, auction houses and individuals. ([About](https://www.masonkay.com/about-mason-kay), [Guarantee](https://www.masonkay.com/mk-jade-guarantee))
⚑ **Mason-Kay's "we do not deal in treated jade" is the strongest possible positioning sentence.** If you adopt it, it must be literally true across the catalogue.

**Recommended policy for 玉語軒:** minimum **7-day inspection period**; **14–30 days** for verified/returning buyers; condition that the **certificate and tamper seal are intact**; buyer pays insured return shipping; **escrow** above a threshold. Plus the strongest clause available: **a re-authentication condition of sale** — the buyer may submit the piece to NGTC/GIA/HKJSL/SSEF within N days, with **full refund if the result differs from the listing** (and, following the BMjade model, refund *their lab fee too*).

**Escrow is a real, available service** — law-firm art escrow (e.g. [Lindemann Law, Zurich](https://lindemannlaw.ch/expertise/mergers-acquisitions-transactions/escrow-services/art-escrow/)) and payment-provider escrow accounts ([Dospay](https://www.dospay.co.uk/escrow-accounts/art-purchase-escrow)). Naming a specific escrow provider on the PDP converts "trust me" into "here is the mechanism."

## 14.10 ⚖️ LEGAL FLAGS — do not ship a shipping promise without reviewing these

**① US import restrictions on Chinese archaeological material — THIS COVERS JADE.**
CBP has extended, **through 14 January 2029**, the import restrictions on designated archaeological material from China. The designated list **explicitly includes "jade ornaments and jewelry; weapons, tools, and insignia; ceremonial paraphernalia; and vessels."**
→ **Modern (non-archaeological) jadeite jewellery is not caught**, but **antique Chinese jade entering the US needs documented, lawful provenance.**
([Sandler, Travis & Rosenberg](https://www.strtrade.com/trade-news-resources/str-trade-report/trade-report/january/import-restrictions-on-material-from-china-extended), [Federal Register designated list](https://www.govinfo.gov/content/pkg/FR-2019-01-14/pdf/2019-00065.pdf))
⚑ **This makes your provenance section a commercial necessity, not just a credibility asset.** For your 戰漢/唐宋/唐代/明代 `風格` pieces shipping to the US, the provenance file is what makes the sale possible.

**② CITES — commonly botched, so get it exactly right.**
**Jadeite and nephrite are minerals and are NOT CITES-listed.** CITES problems arise from **associated organic materials** in antique mounts, boxes, stands or composite pieces: **elephant ivory, tortoiseshell (玳瑁), red coral (紅珊瑚)**, certain rosewoods. Chinese customs seizures of exactly these are routine. Any antique jade with an ivory or coral component needs CITES documentation and, in the US, **USFWS clearance** — there is an "antique" exemption but it is **narrow and port-specific**.
([Antiques Trade Gazette CITES guide](https://www.antiquestradegazette.com/media/9871/cites-04.pdf), [USFWS ivory guidance](https://www.fws.gov/guidance/guidance/sites/guidance/files/documents/What%20Can%20I%20Do%20With%20My%20Ivory.pdf))
⚑ **Concrete action:** audit your 剔紅鼻煙壺 (013) and any piece with a stand, box or mount **specifically for ivory, 玳瑁 and coral**. State material composition for mounts explicitly on the PDP.

**③ China cultural-relic export.**
There is a national standard for vetting jade/stone objects for export: **GB/T 33290.22-2024《文物出境審核規範 第22部分：玉石器》** ([SPC](https://www.spc.org.cn/online/ef3c50af579e2dc86b2464c191c5fac4.html)). Chinese customs regularly seize cultural relics declared as `工藝擺件`, and there are documented seizures of prohibited-export relics including Qing jade.
→ **A dealer shipping antique Chinese jade out of China needs a 文物出境許可證.**
⚑ State plainly on the site that **the buyer is responsible for import compliance in their own jurisdiction**, and that **you will help assemble the provenance/certificate dossier**. Never promise unconditional worldwide shipping on antique pieces.

⚠️ **None of this is legal advice.** Have a customs/art-law lawyer review the shipping, CITES and cultural-property language before the site makes any promise.

## 14.11 Second-pass source list (selected)
Grading: [GIA jade quality factors](https://www.gia.edu/jade-quality-factor) · [中維質檢 水頭](http://www.zwjczx.com/article/fei-cui-de-shui-tou-shi-shen-me-yi-si.html) · [翡翠王朝 藍水/晴水](https://www.jaadee.com/feicuishouce/feicuizhishi/feicuierhuan/7683.html) · [墨翠](https://www.jaadee.com/feicuishouce/feicuidezhonglei/mocui/2984.html) · [白底青](https://www.chinajeweler.com/zbxf/cui/54941.html) · [雪花棉](https://www.chinajeweler.com/feicui/daren/66085.html) · [春帶彩](https://m.crd.cn/zhubao/24885.html) · [剛性/起熒/起膠 + B貨 caveat](https://m.sohu.com/n/488201198/) · [雞血石 ≠ jade](https://www.gemsociety.org/article/chicken-blood-stone-jewelry-and-gemstone-information/) · [雞血玉 vs 雞血石](https://news.artron.net/20140724/n632632.html)
Certification: [live NGTC-style certificate record](https://www.nqtc315.com/cx.asp?types=2&code=13202112355) · [NGTC electronic cert / RFID+國密](https://www.ngtc.com.cn/news/jt/67033.html) · [HKJSL classification](http://www.jadeitelaboratory.com.hk/lab/jade_classification_en.html) · [HKJSL cert check](http://www.jadeitelaboratory.com.hk/lab/cert_report_en.html) · [HKJSL fees](http://www.jadeitelaboratory.com.hk/lab/testing_fee_en.html) · [SSEF jade](https://www.ssef.ch/reports/jade/) · [GRS verification](https://www.gemresearch.ch/report-verification) · [GIA G&G Fall 1992 (IR is definitive for B jade)](https://www.gia.edu/gems-gemology/fall-1992-bleaching-jadeite-fritsch) · [GIA origin for Myanmar/Guatemala jadeite — press release](https://www.gia.edu/gia-news-press/gia-to-update-gemological-reports-for-colored-stones) · [corroboration: Centurion, 18 Dec 2025](https://news.centurionjewelry.com/articles/detail/gia-to-update-colored-stone-reports-and-expand-origin-services-from-jan-1-2026) · [Mason-Kay natural vs treated](https://www.masonkay.com/natural-vs-treated-jade) · [Mason-Kay FTC disclosure](https://www.masonkay.com/ftc-disclosure-guidelines) · [Mason-Kay about](https://www.masonkay.com/about-mason-kay)
Trust/legal: [Christie's buying guide](https://www.christies.com/en/help/buying-guide/overview) · [Bonhams Met deaccession sale](https://www.bonhams.com/zh-cn/press_release/37960/) · [Lizzadro deaccession listing](https://lizzadromuseum.org/product/deaccessioned-jadeite-20th-century-pendant/) · [1stDibs Trade Promise](https://www.1stdibs.com/info/trade/promise/) · [傳世 vs 出土](http://guoxue.k618.cn/gxzs/201412/t20141226_5792007.htm) · [楊伯達《傳世古玉辨偽綜論》](https://wap.cnki.net/touch/web/Journal/Article/GGBW199704001.html) · [US import restrictions extended to 2029](https://www.strtrade.com/trade-news-resources/str-trade-report/trade-report/january/import-restrictions-on-material-from-china-extended) · [Federal Register designated list](https://www.govinfo.gov/content/pkg/FR-2019-01-14/pdf/2019-00065.pdf) · [GB/T 33290.22-2024](https://www.spc.org.cn/online/ef3c50af579e2dc86b2464c191c5fac4.html) · [CITES guide for the trade](https://www.antiquestradegazette.com/media/9871/cites-04.pdf)
Photography: [GIA — How to Photograph Gems & Jewelry](https://www.gia.edu/gem-photography) · [The Jewelry Loupe — tips from the pros (Tino Hammid / Christie's HK jade)](https://thejewelryloupe.com/how-to-photograph-gems-tips-from-the-pros/) · [艾米視覺 5500K / CRI≥97 case study](https://www.airmie.cn/shijuesheying/chanpinsheying/shipinpaishe/2505.html) · [灯下不觀玉](http://wenwuchina.com/a/62/243987.html) · [翡翠王朝 燈下不觀玉](https://www.jaadee.com/feicuishouce/feicuizhishi/feicuimiji/9071.html)
Measurement: [鑽百科 圈口 ÷ 3.14](https://www.zuanbaike.com/baike/NW3gLzkMeP.html) · [人民網 手鐲圈口](http://art.people.com.cn/n/2015/0319/c206244-26718611.html) · [珠寶之家 單位換算](https://designer.525zb.com/showtopic.aspx?topicid=332&onlyauthor=1) · [御府和田玉 實例 listing fields](https://www.163yu.com/product/600814.html)

**Known gaps in this second pass:** the **Mason-Kay "Colors of Jade" chart** (the closest thing to a trade-standard English jadeite colour reference) and the **WildFire Atelier** jade-photography guide were both unretrievable by automated fetch — worth a manual look. No evidence was found that **GRS publishes a proprietary jadeite colour grade**; treat any "GRS Imperial Green" claim with suspicion.

---

