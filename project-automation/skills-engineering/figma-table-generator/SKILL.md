---
name: figma-table-generator
description: Generates Figma tables from markdown/PRD specifications using the Figma Plugin API via use_figma tool.
---

# Figma Table Generator

## Prerequisites

**MANDATORY**: Before calling `use_figma`, invoke the `figma:figma-use` skill. Never skip this step.

Load design tokens from `design-tokens.md` and the builder reference from `table-builder.js` before generating any code.

---

## Required Input

All inputs below are **mandatory**. If any is missing, use AskUserQuestion to collect before proceeding.

| # | Input | Description |
|---|-------|-------------|
| 1 | **Table data** | Markdown table, field list, or PRD section containing the table to draw |
| 2 | **Figma target** | Figma file URL, or confirmation to use the currently open file |
| 3 | **Table type** | `data`, `comparison`, `field-definition`, or `multi-section` (ask if not obvious) |

---

## Hard Rules

1. **Load figma-use skill first** — invoke `figma:figma-use` before any `use_figma` call. No exceptions.
2. **Parse before drawing** — fully parse and validate the table structure before generating any Plugin API code. Never start drawing with partial data.
3. **Use design tokens** — all colors, fonts, spacing, and border values MUST come from `design-tokens.md`. Never hardcode hex values or sizes.
4. **Column widths are computed** — derive column widths from content length, never guess or use uniform widths unless explicitly asked.
5. **Header rows always styled** — the first row is always treated as a header with `header` token styles, unless the user specifies no header.
6. **Confirm placement** — ask the user where to place the table (new frame, existing frame, specific position) before drawing.
7. **One table at a time** — if the input contains multiple tables, process and confirm each one sequentially.

---

## Workflow

### Step 1 — Parse Input

Read the provided table data and extract:
- Column names and count
- Row data (array of arrays)
- Table type (infer if not specified)
- Any merged cells, sub-headers, or grouped rows

Validate:
- All rows have equal column count
- No empty column headers (warn user if found)

### Step 2 — Confirm Structure

Present a brief summary to the user:
```
Table: [N] columns × [M] rows ([type])
Columns: col1, col2, col3, ...
Confirm? (y/n)
```
Use AskUserQuestion. Do not proceed without confirmation.

### Step 3 — Resolve Placement

Ask the user:
- Target frame name (or create a new one)
- X/Y position (default: 100, 100 if no preference)
- Scale (default: 1×, options: 0.75×, 1.5×)

### Step 4 — Generate Plugin Code

Using the structure from `table-builder.js` as a base template:
1. Substitute actual column names, row data, and token values
2. Compute column widths (min 80px per column, scale with longest cell text)
3. Set row height from `design-tokens.md` (`row.height.default`)
4. Apply alternating row fills using `row.fill.even` / `row.fill.odd` tokens
5. Apply header styles from `header.*` tokens

### Step 5 — Execute

Invoke `figma:figma-use` skill, then call `use_figma` with the generated Plugin API code.

### Step 6 — Verify

After execution, call `get_screenshot` on the target frame and present it to the user.
Ask: "Does the table look correct? Any adjustments needed?"

---

## Table Type Specs

### `data` (default)
Standard rows and columns. Header row + data rows. Optional striped rows.

### `comparison`
Two or more columns being compared. First column is the "feature/attribute" label column (narrower, bold). Remaining columns are option/product columns (equal width).

### `field-definition`
Three fixed columns: `Field`, `Type`, `Description`. Used for API/data model docs. Description column takes remaining width.

### `multi-section`
Contains section-header rows that span all columns (e.g., "Section A", "Section B"). Section headers use `sectionHeader.*` tokens.

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Figma file not accessible | Abort. Ask user to confirm the file is open and accessible. |
| Column count mismatch in rows | Abort. Show which rows have mismatched columns and ask user to fix input. |
| `use_figma` returns error | Surface the raw error to the user. Ask whether to retry or abort. |
| Table has >20 columns | Warn user that wide tables may exceed frame bounds. Confirm to proceed. |
| Table has >200 rows | Warn user about performance. Confirm to proceed. |
