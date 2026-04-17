---
name: figma-table-generator / design-tokens
description: Visual style tokens extracted from the Hairline Admin Dashboard Figma file (node 2734:94492 — "Full Table - Pending Payouts"). All values in Figma units (px at 1× scale).
---

# Design Tokens — Table Generator

Source: Hairline Admin Dashboard · node `2734:94492`
All Plugin API code must reference these token names. Never hardcode raw values.

---

## Typography

| Token | Value | Usage |
| ----- | ----- | ----- |
| `font.family` | `"Plus Jakarta Sans"` | All table text |
| `font.size.header` | `14` | Header row labels |
| `font.size.body` | `14` | Data row cells |
| `font.weight.header` | `"SemiBold"` | Header row (600) |
| `font.weight.body` | `"Regular"` | Data rows (400) |
| `font.lineHeight.header` | `22` | Header row line height |
| `font.lineHeight.body` | `22` | Data row line height |
| `font.letterSpacing` | `0` | All text |

Figma CSS variable references:

- Header label color: `--components/table/component/headercolor` → `#222339`
- Body text color: `--components/table/global/colortext` → `#222339`

---

## Row Dimensions

| Token | Value | Usage |
| ----- | ----- | ----- |
| `row.height.header` | `54` | Header row height (measured from Figma frame) |
| `row.height.default` | `64` | Standard data row height (measured from Figma frame) |
| `cell.padding.horizontal` | `16` | Left/right padding (`cellpaddinginline`) |
| `cell.padding.vertical` | `16` | Top/bottom padding (`cellpaddingblock`) |
| `col.width.min` | `78` | Minimum column width (Action column = 78px) |
| `col.separator.width` | `0.5` | Column divider in header cells (left + right stroke) |

---

## Colors

### Header Row

| Token | Value | Usage |
| ----- | ----- | ----- |
| `header.fill` | `rgba(34, 35, 57, 0.04)` | Header background — light tint, NOT dark |
| `header.text` | `#222339` | Header label text |
| `header.border.bottom` | `rgba(34, 35, 57, 0.06)` | Header bottom border |
| `header.border.col` | `#ebebf0` | Column separators in header (0.5px each side) |

Figma CSS variable references for header:

- `--components/table/component/headerbg` → `rgba(34, 35, 57, 0.04)`
- `--components/table/component/headercolor` → `#222339`
- `--components/table/global/colorsplit` → `rgba(34, 35, 57, 0.06)`
- `--components/table/component/headersplitcolor` → `#ebebf0`

### Data Rows

| Token | Value | Usage |
| ----- | ----- | ----- |
| `row.fill` | `#FFFFFF` | All data rows — uniform white, no alternating stripe |
| `row.text` | `#222339` | Data cell text |
| `row.border.bottom` | `#ebebf0` | Row bottom border |

> The Figma design uses the **Bordered=False** variant. There is no zebra striping — all rows share the same white background.

Figma CSS variable references for rows:

- `--components/table/global/colortext` → `#222339`
- `--components/table/component/bordercolor` → `#ebebf0`

---

## Borders

| Token | Value | Usage |
| ----- | ----- | ----- |
| `border.width.row` | `1` | Row bottom border (`linewidth`) |
| `border.width.col` | `0.5` | Column separator in header (left + right stroke) |
| `border.radius.table` | `0` | No corner radius on table frame |

---

## No Drop Shadow

The Figma table uses no drop shadow. Do not apply shadows to generated tables.

---

## JS Color Objects (for Plugin API)

```js
const COLOR = {
  headerBg:        { r: 0.133, g: 0.137, b: 0.224, a: 0.04 },  // rgba(34,35,57,0.04)
  headerText:      { r: 0.133, g: 0.137, b: 0.224 },             // #222339
  headerBorderBot: { r: 0.133, g: 0.137, b: 0.224, a: 0.06 },  // rgba(34,35,57,0.06)
  headerColSep:    { r: 0.922, g: 0.922, b: 0.941 },             // #ebebf0
  rowFill:         { r: 1,     g: 1,     b: 1     },              // #FFFFFF
  rowText:         { r: 0.133, g: 0.137, b: 0.224 },             // #222339
  rowBorderBot:    { r: 0.922, g: 0.922, b: 0.941 },             // #ebebf0
};
```

---

## Column Widths (Observed from Figma)

Actual column widths from node `2734:94492` for reference:

| Column | Width (px) |
| ------ | ---------- |
| Checkbox | 48 |
| Affiliate Name | 173 |
| Affiliate ID | 138 |
| Payout Reference | 202 |
| Discount Code(s) | 163 |
| Pay Period | 141 |
| Total Referrals | 142 |
| Total Referral Revenue | 212 |
| Commission Rate | 174 |
| Commission Earned | 198 |
| Payment Status | 154 |
| Payout Readiness | 187 |
| Payment Method | 191 |
| Payment Destination | 207 |
| Payment Date | 207 |
| Processed At | 207 |
| Stripe Transfer ID | 207 |
| Failure Reason | 248 |
| Processed By | 207 |
| Action | 78 |
