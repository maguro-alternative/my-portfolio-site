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
