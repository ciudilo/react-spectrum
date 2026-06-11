export interface BrandAsset {
  id: string;
  name: string;
  type: 'Logo' | 'Color' | 'Typeface' | 'Icon' | 'Photo' | 'Template';
  format: string;
  size: string;
  updated: string;
  downloads: number;
}

export const assets: BrandAsset[] = [
  {id: '1', name: 'Primary Logo', type: 'Logo', format: 'SVG', size: '24 KB', updated: 'May 28, 2026', downloads: 1840},
  {id: '2', name: 'Monochrome Logo', type: 'Logo', format: 'SVG', size: '21 KB', updated: 'May 28, 2026', downloads: 932},
  {id: '3', name: 'Brand Red', type: 'Color', format: 'HEX', size: '—', updated: 'Apr 14, 2026', downloads: 540},
  {id: '4', name: 'Brand Indigo', type: 'Color', format: 'HEX', size: '—', updated: 'Apr 14, 2026', downloads: 488},
  {id: '5', name: 'Display Typeface', type: 'Typeface', format: 'WOFF2', size: '212 KB', updated: 'Mar 02, 2026', downloads: 2104},
  {id: '6', name: 'Body Typeface', type: 'Typeface', format: 'WOFF2', size: '198 KB', updated: 'Mar 02, 2026', downloads: 1976},
  {id: '7', name: 'App Icon Set', type: 'Icon', format: 'ZIP', size: '1.2 MB', updated: 'Jun 01, 2026', downloads: 765},
  {id: '8', name: 'Hero Photography', type: 'Photo', format: 'JPG', size: '4.8 MB', updated: 'Jun 04, 2026', downloads: 312},
  {id: '9', name: 'Social Template', type: 'Template', format: 'PSD', size: '8.1 MB', updated: 'Jun 09, 2026', downloads: 423}
];

export const stats = [
  {label: 'Total assets', value: '128'},
  {label: 'Downloads this month', value: '9,581'},
  {label: 'Pending reviews', value: '7'},
  {label: 'Collections', value: '14'}
];
