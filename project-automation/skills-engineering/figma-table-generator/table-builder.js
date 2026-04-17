/**
 * Figma Plugin API — Table Builder
 *
 * USAGE: This is a reference template. The skill substitutes:
 *   - COLUMNS      → array of column header strings
 *   - ROWS         → array of row arrays (string[][])
 *   - TABLE_TYPE   → "data" | "comparison" | "field-definition" | "multi-section"
 *   - PLACEMENT    → { x, y } coordinates on the canvas
 *   - FRAME_NAME   → target parent frame name (or null to create new)
 *
 * Token values must match design-tokens.md exactly.
 */

// ─── TOKEN MAP ───────────────────────────────────────────────────────────────

const T = {
  font: {
    family: "Inter",
    size: { header: 13, body: 12, section: 12 },
    weight: { header: "SemiBold", body: "Regular", section: "SemiBold" },
    lineHeight: { header: 20, body: 18 },
  },
  row: {
    height: { header: 40, default: 36, section: 32, compact: 28 },
    fill: { odd: { r: 1, g: 1, b: 1 }, even: { r: 0.961, g: 0.961, b: 0.980 } },
    text: { r: 0.102, g: 0.102, b: 0.180 },
    border: { r: 0.886, g: 0.886, b: 0.925 },
  },
  header: {
    fill: { r: 0.118, g: 0.118, b: 0.180 },
    text: { r: 1, g: 1, b: 1 },
    border: { r: 0.227, g: 0.227, b: 0.290 },
  },
  sectionHeader: {
    fill: { r: 0.933, g: 0.941, b: 1.0 },
    text: { r: 0.231, g: 0.231, b: 0.541 },
    border: { r: 0.773, g: 0.792, b: 0.961 },
  },
  col: { min: 80, label: 160, type: 100 },
  cell: { paddingH: 12, paddingV: 8 },
  border: { default: 1, outer: 1.5, radius: 8 },
  table: { margin: 24 },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function loadFont(weight) {
  await figma.loadFontAsync({ family: T.font.family, style: weight });
}

function solidPaint(color, opacity = 1) {
  return [{ type: "SOLID", color, opacity }];
}

function rgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

function computeColWidths(columns, rows, tableType) {
  if (tableType === "field-definition") {
    return [T.col.label, T.col.type, /* remaining */ null];
  }
  return columns.map((col, i) => {
    const maxLen = Math.max(
      col.length,
      ...rows.map(r => (r[i] || "").length)
    );
    // ~7px per char average for Inter 12px, min 80px
    return Math.max(T.col.min, Math.ceil(maxLen * 7.2 + T.cell.paddingH * 2));
  });
}

function resolveColWidths(columns, rows, tableType, totalWidth) {
  const widths = computeColWidths(columns, rows, tableType);
  // If last width is null (field-definition), fill remaining space
  if (widths[widths.length - 1] === null) {
    const fixedSum = widths.slice(0, -1).reduce((a, b) => a + b, 0);
    widths[widths.length - 1] = Math.max(T.col.min, totalWidth - fixedSum);
  }
  return widths;
}

// ─── CELL BUILDER ────────────────────────────────────────────────────────────

async function createCell(text, width, height, fillColor, textColor, fontWeight, fontSize, lineHeight, borderBottom, borderRight) {
  const cell = figma.createFrame();
  cell.resize(width, height);
  cell.fills = solidPaint(fillColor);
  cell.clipsContent = true;
  cell.layoutMode = "VERTICAL";
  cell.primaryAxisAlignItems = "CENTER";
  cell.counterAxisAlignItems = "MIN";
  cell.paddingLeft = T.cell.paddingH;
  cell.paddingRight = T.cell.paddingH;
  cell.paddingTop = T.cell.paddingV;
  cell.paddingBottom = T.cell.paddingV;

  const label = figma.createText();
  await figma.loadFontAsync({ family: T.font.family, style: fontWeight });
  label.fontName = { family: T.font.family, style: fontWeight };
  label.fontSize = fontSize;
  label.lineHeight = { value: lineHeight, unit: "PIXELS" };
  label.fills = solidPaint(textColor);
  label.characters = String(text ?? "");
  label.textAutoResize = "WIDTH_AND_HEIGHT";
  cell.appendChild(label);

  // Bottom border
  if (borderBottom) {
    cell.strokes = [{ type: "SOLID", color: borderBottom }];
    cell.strokeWeight = T.border.default;
    cell.strokeAlign = "INSIDE";
    cell.strokeTopWeight = 0;
    cell.strokeLeftWeight = 0;
    cell.strokeRightWeight = 0;
    cell.strokeBottomWeight = T.border.default;
  }

  // Right border (column divider)
  if (borderRight) {
    cell.strokeRightWeight = T.border.default;
    cell.strokes = [{ type: "SOLID", color: borderRight }];
    cell.strokeAlign = "INSIDE";
  }

  return cell;
}

// ─── ROW BUILDER ─────────────────────────────────────────────────────────────

async function createHeaderRow(columns, colWidths) {
  const row = figma.createFrame();
  row.name = "Header Row";
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "FIXED";
  row.counterAxisSizingMode = "FIXED";
  row.resize(colWidths.reduce((a, b) => a + b, 0), T.row.height.header);
  row.fills = solidPaint(T.header.fill);
  row.itemSpacing = 0;

  for (let i = 0; i < columns.length; i++) {
    const isLast = i === columns.length - 1;
    const cell = await createCell(
      columns[i], colWidths[i], T.row.height.header,
      T.header.fill, T.header.text,
      T.font.weight.header, T.font.size.header, T.font.lineHeight.header,
      T.header.border, isLast ? null : T.header.border
    );
    cell.name = `Header: ${columns[i]}`;
    row.appendChild(cell);
  }
  return row;
}

async function createDataRow(rowData, colWidths, rowIndex) {
  const isEven = rowIndex % 2 === 0;
  const fill = isEven ? T.row.fill.even : T.row.fill.odd;

  const row = figma.createFrame();
  row.name = `Row ${rowIndex + 1}`;
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "FIXED";
  row.counterAxisSizingMode = "FIXED";
  row.resize(colWidths.reduce((a, b) => a + b, 0), T.row.height.default);
  row.fills = solidPaint(fill);
  row.itemSpacing = 0;

  for (let i = 0; i < rowData.length; i++) {
    const isLast = i === rowData.length - 1;
    const cell = await createCell(
      rowData[i], colWidths[i], T.row.height.default,
      fill, T.row.text,
      T.font.weight.body, T.font.size.body, T.font.lineHeight.body,
      T.row.border, isLast ? null : T.row.border
    );
    row.appendChild(cell);
  }
  return row;
}

async function createSectionHeaderRow(label, totalWidth, colCount) {
  const row = figma.createFrame();
  row.name = `Section: ${label}`;
  row.resize(totalWidth, T.row.height.section);
  row.fills = solidPaint(T.sectionHeader.fill);
  row.layoutMode = "HORIZONTAL";
  row.paddingLeft = T.cell.paddingH;
  row.primaryAxisAlignItems = "CENTER";

  const text = figma.createText();
  await figma.loadFontAsync({ family: T.font.family, style: T.font.weight.section });
  text.fontName = { family: T.font.family, style: T.font.weight.section };
  text.fontSize = T.font.size.section;
  text.fills = solidPaint(T.sectionHeader.text);
  text.characters = label;
  text.textAutoResize = "WIDTH_AND_HEIGHT";
  row.appendChild(text);

  row.strokes = [{ type: "SOLID", color: T.sectionHeader.border }];
  row.strokeAlign = "INSIDE";
  row.strokeBottomWeight = T.border.default;
  row.strokeTopWeight = 0;
  row.strokeLeftWeight = 0;
  row.strokeRightWeight = 0;

  return row;
}

// ─── MAIN TABLE BUILDER ──────────────────────────────────────────────────────

/**
 * @param {object} config
 * @param {string[]}   config.columns    Column header labels
 * @param {string[][]} config.rows       Table data rows. For multi-section, prefix section rows
 *                                        with { section: "Section Label" } instead of array.
 * @param {string}     config.tableType  "data" | "comparison" | "field-definition" | "multi-section"
 * @param {string}     config.tableName  Frame name for the table
 * @param {{x:number, y:number}} config.placement  Canvas position
 */
async function buildTable({ columns, rows, tableType, tableName, placement }) {
  const totalWidth = columns.length * 160; // rough initial; overridden by colWidths
  const colWidths = resolveColWidths(columns, rows.filter(r => Array.isArray(r)), tableType, totalWidth);
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);

  // Outer frame
  const tableFrame = figma.createFrame();
  tableFrame.name = tableName || "Generated Table";
  tableFrame.x = placement?.x ?? 100;
  tableFrame.y = placement?.y ?? 100;
  tableFrame.layoutMode = "VERTICAL";
  tableFrame.primaryAxisSizingMode = "AUTO";
  tableFrame.counterAxisSizingMode = "FIXED";
  tableFrame.resize(tableWidth, 100); // height auto
  tableFrame.fills = solidPaint(T.row.fill.odd);
  tableFrame.cornerRadius = T.border.radius;
  tableFrame.strokes = [{ type: "SOLID", color: T.row.border }];
  tableFrame.strokeWeight = T.border.outer;
  tableFrame.strokeAlign = "OUTSIDE";
  tableFrame.clipsContent = true;
  tableFrame.itemSpacing = 0;
  tableFrame.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.08 },
      offset: { x: 0, y: 4 },
      radius: 12,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];

  // Header
  const headerRow = await createHeaderRow(columns, colWidths);
  tableFrame.appendChild(headerRow);

  // Data rows
  let dataRowIndex = 0;
  for (const row of rows) {
    if (row && typeof row === "object" && !Array.isArray(row) && row.section) {
      // Section header row
      const sectionRow = await createSectionHeaderRow(row.section, tableWidth, columns.length);
      tableFrame.appendChild(sectionRow);
    } else {
      const dataRow = await createDataRow(row, colWidths, dataRowIndex++);
      tableFrame.appendChild(dataRow);
    }
  }

  figma.currentPage.appendChild(tableFrame);
  figma.viewport.scrollAndZoomIntoView([tableFrame]);
  return tableFrame;
}

// ─── ENTRY POINT (substituted by skill) ──────────────────────────────────────

// SKILL SUBSTITUTES THIS BLOCK with actual data from the parsed input:
await buildTable({
  columns: /* COLUMNS */[],
  rows:    /* ROWS */[],
  tableType: /* TABLE_TYPE */"data",
  tableName: /* TABLE_NAME */"Table",
  placement: /* PLACEMENT */{ x: 100, y: 100 },
});
