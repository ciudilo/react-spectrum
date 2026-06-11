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

import {Asset, assets, AssetType, typeLabels} from './data/assets';
import {AssetCard} from './components/AssetCard';
import {AssetDetailDialog} from './components/AssetDetailDialog';
import {
  CardView,
  Collection,
  Content,
  DialogContainer,
  Divider,
  Heading,
  IllustratedMessage,
  Picker,
  PickerItem,
  Provider,
  SearchField,
  Switch,
  Text
} from '@react-spectrum/s2';
import '@react-spectrum/s2/page.css';
import {Key, useMemo, useState} from 'react';
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

type Filter = AssetType | 'all';

const filterOptions: {id: Filter; label: string}[] = [
  {id: 'all', label: 'All assets'},
  {id: 'logo', label: 'Logos'},
  {id: 'color', label: 'Colors'},
  {id: 'font', label: 'Fonts'},
  {id: 'image', label: 'Images'}
];

const page = style({
  maxWidth: 1100,
  marginX: 'auto',
  paddingX: 24,
  paddingY: 32
});

const headerRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'start',
  gap: 16,
  marginBottom: 8
});

const summaryRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  marginY: 24
});

const statCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  paddingX: 20,
  paddingY: 16,
  borderRadius: 'lg',
  backgroundColor: 'layer-1',
  boxShadow: 'emphasized',
  minWidth: 120,
  flexGrow: 1
});

const statValue = style({
  font: 'heading',
  color: 'gray-900'
});

const statLabel = style({
  font: 'ui-sm',
  color: 'gray-600'
});

const controlsRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  alignItems: 'end',
  marginBottom: 8
});

const cardViewStyles = style({
  width: 'full',
  height: 620,
  marginTop: 16
});

function App() {
  let [isDarkMode, setIsDarkMode] = useState(false);
  let [query, setQuery] = useState('');
  let [filter, setFilter] = useState<Filter>('all');
  let [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  let counts = useMemo(() => {
    let base: Record<AssetType, number> = {logo: 0, color: 0, font: 0, image: 0};
    for (let asset of assets) {
      base[asset.type]++;
    }
    return base;
  }, []);

  let filtered = useMemo(() => {
    let q = query.trim().toLowerCase();
    return assets.filter(asset => {
      let matchesType = filter === 'all' || asset.type === filter;
      if (!matchesType) {
        return false;
      }
      if (!q) {
        return true;
      }
      let haystack = [asset.name, asset.description, ...asset.tags].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [query, filter]);

  let onCardAction = (key: Key) => {
    let asset = assets.find(a => a.id === key);
    if (asset) {
      setSelectedAsset(asset);
    }
  };

  return (
    <Provider
      elementType="main"
      colorScheme={isDarkMode ? 'dark' : 'light'}
      background="base">
      <div className={page}>
        <div className={headerRow}>
          <div>
            <Heading level={1} styles={style({font: 'heading-xl', marginY: 0})}>
              Brand Asset Dashboard
            </Heading>
            <Text styles={style({font: 'body-lg', color: 'gray-600'})}>
              Browse, search, and inspect the building blocks of the brand system.
            </Text>
          </div>
          <Switch
            isSelected={isDarkMode}
            onChange={setIsDarkMode}
            data-testid="dark-mode-switch">
            Dark mode
          </Switch>
        </div>

        <div className={summaryRow} data-testid="summary-row">
          <div className={statCard}>
            <span className={statValue}>{assets.length}</span>
            <span className={statLabel}>Total assets</span>
          </div>
          {(Object.keys(counts) as AssetType[]).map(type => (
            <div key={type} className={statCard}>
              <span className={statValue}>{counts[type]}</span>
              <span className={statLabel}>{typeLabels[type]}s</span>
            </div>
          ))}
        </div>

        <Divider styles={style({marginY: 16})} />

        <div className={controlsRow}>
          <SearchField
            aria-label="Search assets"
            label="Search"
            placeholder="Search by name or tag"
            value={query}
            onChange={setQuery}
            styles={style({width: 320, maxWidth: 'full'})} />
          <Picker
            label="Type"
            aria-label="Filter by type"
            items={filterOptions}
            selectedKey={filter}
            onSelectionChange={key => setFilter(key as Filter)}
            styles={style({width: 220})}>
            {item => <PickerItem id={item.id}>{item.label}</PickerItem>}
          </Picker>
          <Text styles={style({font: 'ui-sm', color: 'gray-600', marginBottom: 8})}>
            <span data-testid="result-count">{filtered.length}</span> result
            {filtered.length === 1 ? '' : 's'}
          </Text>
        </div>

        <CardView
          aria-label="Brand assets"
          onAction={onCardAction}
          selectionMode="none"
          styles={cardViewStyles}
          renderEmptyState={() => (
            <IllustratedMessage>
              <Heading>No assets found</Heading>
              <Content>Try a different search term or asset type.</Content>
            </IllustratedMessage>
          )}>
          <Collection items={filtered}>
            {(asset: Asset) => <AssetCard asset={asset} />}
          </Collection>
        </CardView>

        <DialogContainer onDismiss={() => setSelectedAsset(null)}>
          {selectedAsset && <AssetDetailDialog asset={selectedAsset} />}
        </DialogContainer>
      </div>
    </Provider>
  );
}

export default App;
