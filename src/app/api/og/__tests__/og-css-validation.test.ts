import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * @vercel/og (satori) only supports a subset of CSS display values.
 * This test ensures OG image route files don't use unsupported values.
 * See: https://github.com/vercel/satori#css
 */

const SATORI_ALLOWED_DISPLAY = ['flex', 'block', 'none', '-webkit-box'];
const OG_DIR = path.resolve(__dirname, '..');

function getOgRouteFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getOgRouteFiles(fullPath));
    } else if (entry.name === 'route.tsx' || entry.name === 'route.ts') {
      files.push(fullPath);
    }
  }
  return files;
}

// Match display property in style objects: display: 'value' or display: "value"
const DISPLAY_REGEX = /display:\s*['"]([^'"]+)['"]/g;

describe('OG image routes - CSS validation', () => {
  const routeFiles = getOgRouteFiles(OG_DIR);

  it('should find at least one OG route file', () => {
    expect(routeFiles.length).toBeGreaterThan(0);
  });

  for (const filePath of routeFiles) {
    const relativePath = path.relative(OG_DIR, filePath);

    describe(relativePath, () => {
      const content = fs.readFileSync(filePath, 'utf-8');

      it('should only use satori-supported display values', () => {
        const unsupported: { value: string; line: number }[] = [];
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
          let match: RegExpExecArray | null;
          const lineRegex = /display:\s*['"]([^'"]+)['"]/g;
          while ((match = lineRegex.exec(lines[i])) !== null) {
            if (!SATORI_ALLOWED_DISPLAY.includes(match[1])) {
              unsupported.push({ value: match[1], line: i + 1 });
            }
          }
        }

        if (unsupported.length > 0) {
          const details = unsupported
            .map((u) => `  line ${u.line}: display: "${u.value}"`)
            .join('\n');
          expect.fail(
            `Found unsupported CSS display values in ${relativePath}:\n${details}\n` +
              `Allowed values: ${SATORI_ALLOWED_DISPLAY.join(', ')}`
          );
        }
      });

      it('should not use React fragments (<>...</>) which satori wraps as implicit divs without display:flex', () => {
        const lines = content.split('\n');
        const fragments: number[] = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          // Detect JSX fragment opening/closing tags (but ignore comments)
          if ((line.includes('<>') || line.includes('</>')) && !line.startsWith('//') && !line.startsWith('*')) {
            fragments.push(i + 1);
          }
        }

        if (fragments.length > 0) {
          expect.fail(
            `Found React fragments in ${relativePath} at lines: ${fragments.join(', ')}\n` +
              `satori does not support fragments. Use a <div style={{ display: "flex" }}> wrapper instead.`
          );
        }
      });

      it('should have display:flex on every <div> element', () => {
        const lines = content.split('\n');
        const divsWithoutFlex: number[] = [];

        for (let i = 0; i < lines.length; i++) {
          const trimmed = lines[i].trim();
          // Detect opening <div tags (but skip comments)
          if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

          if (trimmed.includes('<div') && !trimmed.includes('<div>')) {
            // Inline style div - check if display: 'flex' or display: 'none' exists
            // Look ahead up to 15 lines for the style closing
            const chunk = lines.slice(i, Math.min(i + 15, lines.length)).join(' ');
            const hasDisplayFlex = /display:\s*['"]flex['"]/.test(chunk);
            const hasDisplayNone = /display:\s*['"]none['"]/.test(chunk);
            if (!hasDisplayFlex && !hasDisplayNone) {
              divsWithoutFlex.push(i + 1);
            }
          }
        }

        if (divsWithoutFlex.length > 0) {
          expect.fail(
            `Found <div> elements without explicit display:flex in ${relativePath} at lines: ${divsWithoutFlex.join(', ')}\n` +
              `satori requires all divs with multiple children to have display: "flex" or "none". ` +
              `To be safe, add display: "flex" to every <div>.`
          );
        }
      });

      it('should not use unsupported CSS properties (grid-related)', () => {
        const gridProps = [
          'gridTemplateColumns',
          'gridTemplateRows',
          'gridColumn',
          'gridRow',
          'gridGap',
          'gridArea',
          'gridAutoFlow',
          'gridAutoColumns',
          'gridAutoRows',
        ];

        const found: { prop: string; line: number }[] = [];
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
          for (const prop of gridProps) {
            if (lines[i].includes(prop)) {
              found.push({ prop, line: i + 1 });
            }
          }
        }

        if (found.length > 0) {
          const details = found.map((f) => `  line ${f.line}: ${f.prop}`).join('\n');
          expect.fail(
            `Found unsupported grid CSS properties in ${relativePath}:\n${details}\n` +
              `satori does not support CSS Grid. Use flexbox instead.`
          );
        }
      });
    });
  }
});
