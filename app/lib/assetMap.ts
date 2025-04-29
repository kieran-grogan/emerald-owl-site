import assets from '../../scripts/manifest.json';

export interface AssetInfo {
  paths: string[];
  widths: number[];
  type: 'image' | 'video';
  format: string;
}

export interface AssetMap {
  [key: string]: AssetInfo;
}

// Convert manifest to strongly-typed asset map
const assetMap: AssetMap = Object.entries(assets).reduce((acc, [key, value]) => {
  const info = value as any;
  acc[key] = {
    paths: info.paths || [],
    widths: info.widths || [],
    type: info.type || 'image',
    format: info.format || 'webp'
  };
  return acc;
}, {} as AssetMap);

export function getAssetInfo(baseName: string): AssetInfo | undefined {
  return assetMap[baseName];
}

export function getSrcSet(baseName: string): string {
  const info = getAssetInfo(baseName);
  if (!info) return '';
  
  return info.paths
    .map((path, i) => `${path} ${info.widths[i]}w`)
    .join(', ');
}

export function getDefaultSrc(baseName: string): string {
  const info = getAssetInfo(baseName);
  if (!info) return '';
  
  // Return the middle-sized image by default
  const midIndex = Math.floor(info.paths.length / 2);
  return info.paths[midIndex];
}

export function getVideoSrc(baseName: string): string {
  const info = getAssetInfo(baseName);
  if (!info || info.type !== 'video') return '';
  return info.paths[0];
}

export default assetMap; 