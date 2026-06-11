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
import {AssetPreview} from './AssetCard';
import {HexCopyButton} from './HexCopyButton';
import {
  Badge,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Header,
  Heading,
  Text,
  ToastQueue,
  useDialogContainer
} from '@react-spectrum/s2';
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

const previewWrapper = style({
  width: 'full',
  borderRadius: 'lg',
  overflow: 'hidden',
  marginBottom: 24,
  backgroundColor: 'gray-100'
});

const metaRow = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  marginBottom: 8
});

const metaLabel = style({
  font: 'ui-sm',
  color: 'gray-600',
  width: 96,
  flexShrink: 0
});

const metaValue = style({
  font: 'ui',
  color: 'gray-900'
});

const tagRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 16
});

function copyValue(asset: Asset): {label: string; value: string} {
  if (asset.type === 'color') {
    return {label: 'hex', value: asset.hex};
  }
  if (asset.type === 'font') {
    return {label: 'font', value: asset.fontFamily};
  }
  return {label: 'name', value: asset.name};
}

interface AssetDetailDialogProps {
  asset: Asset;
}

/**
 * The detail Dialog for a brand asset: large preview, full metadata, tags, and a Copy action.
 * Rendered inside a DialogContainer so it can be opened from a CardView card press.
 */
export function AssetDetailDialog({asset}: AssetDetailDialogProps) {
  let dialog = useDialogContainer();
  let {label: copyLabel, value} = copyValue(asset);

  let onCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        let message =
          asset.type === 'color' ? `Copied ${value.toUpperCase()}` : `Copied ${copyLabel} to clipboard!`;
        ToastQueue.positive(message);
      })
      .catch(() => {
        ToastQueue.negative('Failed to copy.');
      });
  };

  return (
    <Dialog size="L">
      <Heading>{asset.name}</Heading>
      <Header>{typeLabels[asset.type]}</Header>
      <Content>
        <div className={previewWrapper}>
          <AssetPreview asset={asset} aspectRatio="16 / 9" />
        </div>
        <Text>{asset.description}</Text>
        <div className={style({marginTop: 24})}>
          <div className={metaRow}>
            <span className={metaLabel}>Type</span>
            <span className={metaValue}>{typeLabels[asset.type]}</span>
          </div>
          {asset.type === 'color' && (
            <>
              <div className={metaRow}>
                <span className={metaLabel}>Hex</span>
                <span
                  className={style({display: 'flex', alignItems: 'center', gap: 8})}
                  data-testid="meta-hex">
                  <span className={metaValue}>{asset.hex.toUpperCase()}</span>
                  <HexCopyButton hex={asset.hex} />
                </span>
              </div>
              <div className={metaRow}>
                <span className={metaLabel}>RGB</span>
                <span className={metaValue}>{asset.rgb}</span>
              </div>
            </>
          )}
          {asset.type === 'font' && (
            <>
              <div className={metaRow}>
                <span className={metaLabel}>Family</span>
                <span className={metaValue}>{asset.fontFamily}</span>
              </div>
              <div className={metaRow}>
                <span className={metaLabel}>Sample</span>
                <span className={metaValue} style={{fontFamily: asset.fontFamily}}>
                  {asset.sample}
                </span>
              </div>
            </>
          )}
        </div>
        <div className={tagRow}>
          {asset.tags.map(tag => (
            <Badge key={tag} size="S" variant={typeBadgeVariant[asset.type]} fillStyle="subtle">
              {tag}
            </Badge>
          ))}
        </div>
        </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={() => dialog.dismiss()}>
          Close
        </Button>
        <Button variant="primary" onPress={onCopy} data-testid="copy-button">
          {`Copy ${copyLabel}`}
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
