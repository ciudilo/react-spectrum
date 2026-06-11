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

import {Asset, typeBadgeVariant, typeLabels} from '../data/assets';
import {HexCopyButton} from './HexCopyButton';
import {Badge, Card, CardPreview, Content, Image, Text} from '@react-spectrum/s2';
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

const previewBox = style({
  width: 'full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
});

interface AssetPreviewProps {
  asset: Asset;
  /** The aspect ratio of the preview, expressed as a CSS aspect-ratio value. */
  aspectRatio?: string;
}

/**
 * Renders an asset preview that varies by type: a color swatch, a logo/image, or a
 * typographic sample. Shared between the grid card and the detail dialog.
 */
export function AssetPreview({asset, aspectRatio = '3 / 2'}: AssetPreviewProps) {
  if (asset.type === 'color') {
    return (
      <div
        className={previewBox}
        style={{aspectRatio, backgroundColor: asset.hex}}
        data-testid="preview-color">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.92)',
            letterSpacing: '0.04em'
          }}>
          <span data-testid="swatch-hex">{asset.hex.toUpperCase()}</span>
          <HexCopyButton hex={asset.hex} isQuiet />
        </span>
      </div>
    );
  }

  if (asset.type === 'font') {
    return (
      <div
        className={previewBox}
        style={{aspectRatio, backgroundColor: '#F4F4F4', padding: 16}}
        data-testid="preview-font">
        <span
          style={{
            fontFamily: asset.fontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: '#2C2C2C'
          }}>
          Ag
        </span>
      </div>
    );
  }

  return (
    <div className={previewBox} style={{aspectRatio}} data-testid="preview-image">
      <Image
        src={asset.src}
        alt={asset.name}
        styles={style({width: 'full', height: 'full', objectFit: 'cover'})} />
    </div>
  );
}

interface AssetCardProps {
  asset: Asset;
}

/**
 * A Card that previews a brand asset and shows its name, type, and description.
 * Designed to be rendered inside a CardView; clicking it triggers the CardView's onAction.
 */
export function AssetCard({asset}: AssetCardProps) {
  return (
    <Card id={asset.id} textValue={asset.name}>
      <CardPreview>
        <AssetPreview asset={asset} />
      </CardPreview>
      <Content>
        <Text slot="title">{asset.name}</Text>
        <div
          className={style({
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            gridArea: 'description'
          })}>
          <div>
            <Badge size="S" variant={typeBadgeVariant[asset.type]}>
              {typeLabels[asset.type]}
            </Badge>
          </div>
          <Text slot="description">{asset.description}</Text>
        </div>
      </Content>
    </Card>
  );
}
