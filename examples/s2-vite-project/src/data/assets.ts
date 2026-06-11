/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

export type AssetType = 'logo' | 'color' | 'font' | 'image';

export interface BaseAsset {
  id: string;
  name: string;
  type: AssetType;
  description: string;
  tags: string[];
}

export interface LogoAsset extends BaseAsset {
  type: 'logo';
  src: string;
}

export interface ImageAsset extends BaseAsset {
  type: 'image';
  src: string;
}

export interface ColorAsset extends BaseAsset {
  type: 'color';
  hex: string;
  rgb: string;
}

export interface FontAsset extends BaseAsset {
  type: 'font';
  fontFamily: string;
  sample: string;
}

export type Asset = LogoAsset | ImageAsset | ColorAsset | FontAsset;

/**
 * Builds an inline SVG data URI so previews have no network dependencies.
 */
function svg(markup: string): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">${markup}</svg>`
  )}`;
}

function logoMark(bg: string, fg: string, letter: string): string {
  return svg(
    `<rect width="300" height="200" fill="${bg}"/>` +
      `<circle cx="150" cy="100" r="62" fill="none" stroke="${fg}" stroke-width="10"/>` +
      `<text x="150" y="132" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" fill="${fg}" text-anchor="middle">${letter}</text>`
  );
}

function gradientImage(id: string, from: string, to: string, label: string): string {
  return svg(
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>` +
      `</linearGradient></defs>` +
      `<rect width="300" height="200" fill="url(#${id})"/>` +
      `<text x="150" y="108" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.92)" text-anchor="middle">${label}</text>`
  );
}

export const assets: Asset[] = [
  {
    id: 'logo-primary',
    name: 'Primary Logomark',
    type: 'logo',
    description: 'The core brand logomark used on light backgrounds across all primary touchpoints.',
    tags: ['logo', 'primary', 'brand', 'light'],
    src: logoMark('#1473E6', '#FFFFFF', 'A')
  },
  {
    id: 'logo-mono',
    name: 'Monochrome Logo',
    type: 'logo',
    description: 'Single-color logo variant for print, watermarks, and low-contrast surfaces.',
    tags: ['logo', 'monochrome', 'print'],
    src: logoMark('#2C2C2C', '#FFFFFF', 'A')
  },
  {
    id: 'logo-reverse',
    name: 'Reverse Logo',
    type: 'logo',
    description: 'Reversed-out logo for use on dark or photographic backgrounds.',
    tags: ['logo', 'reverse', 'dark'],
    src: logoMark('#0D1F4C', '#7FB1FF', 'A')
  },
  {
    id: 'color-spectrum-blue',
    name: 'Spectrum Blue',
    type: 'color',
    description: 'The signature accent color used for primary actions and emphasis.',
    tags: ['color', 'accent', 'primary'],
    hex: '#1473E6',
    rgb: 'rgb(20, 115, 230)'
  },
  {
    id: 'color-indigo',
    name: 'Deep Indigo',
    type: 'color',
    description: 'A rich indigo used for headers, footers, and immersive dark surfaces.',
    tags: ['color', 'dark', 'header'],
    hex: '#2D2D7A',
    rgb: 'rgb(45, 45, 122)'
  },
  {
    id: 'color-magenta',
    name: 'Vivid Magenta',
    type: 'color',
    description: 'A high-energy secondary color reserved for highlights and promotions.',
    tags: ['color', 'secondary', 'highlight'],
    hex: '#D83790',
    rgb: 'rgb(216, 55, 144)'
  },
  {
    id: 'color-celery',
    name: 'Fresh Celery',
    type: 'color',
    description: 'A bright positive-state color for success messaging and confirmations.',
    tags: ['color', 'positive', 'success'],
    hex: '#44B556',
    rgb: 'rgb(68, 181, 86)'
  },
  {
    id: 'font-display',
    name: 'Display Serif',
    type: 'font',
    description: 'An expressive serif used for hero headlines and editorial moments.',
    tags: ['font', 'display', 'headline', 'serif'],
    fontFamily: 'Georgia, "Times New Roman", serif',
    sample: 'Bold ideas, beautifully told.'
  },
  {
    id: 'font-body',
    name: 'Body Sans',
    type: 'font',
    description: 'A highly legible sans-serif for body copy, UI labels, and long-form reading.',
    tags: ['font', 'body', 'ui', 'sans'],
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    sample: 'Clear, friendly, and easy to read at any size.'
  },
  {
    id: 'font-mono',
    name: 'Mono Code',
    type: 'font',
    description: 'A monospace face for code samples, data, and technical documentation.',
    tags: ['font', 'mono', 'code', 'technical'],
    fontFamily: '"SF Mono", Menlo, Consolas, monospace',
    sample: 'const brand = { ready: true };'
  },
  {
    id: 'image-hero',
    name: 'Campaign Hero',
    type: 'image',
    description: 'Approved hero artwork for the flagship campaign landing experience.',
    tags: ['image', 'hero', 'campaign'],
    src: gradientImage('g-hero', '#1473E6', '#D83790', 'Campaign Hero')
  },
  {
    id: 'image-pattern',
    name: 'Brand Pattern',
    type: 'image',
    description: 'A reusable background pattern for decks, social posts, and packaging.',
    tags: ['image', 'pattern', 'background'],
    src: gradientImage('g-pattern', '#2D2D7A', '#44B556', 'Brand Pattern')
  },
  {
    id: 'image-texture',
    name: 'Soft Texture',
    type: 'image',
    description: 'A subtle gradient texture for section dividers and empty states.',
    tags: ['image', 'texture', 'gradient'],
    src: gradientImage('g-texture', '#D83790', '#FFB55C', 'Soft Texture')
  }
];

export const typeLabels: Record<AssetType, string> = {
  logo: 'Logo',
  color: 'Color',
  font: 'Font',
  image: 'Image'
};

export const typeBadgeVariant: Record<AssetType, 'accent' | 'magenta' | 'indigo' | 'cyan'> = {
  logo: 'accent',
  color: 'magenta',
  font: 'indigo',
  image: 'cyan'
};
