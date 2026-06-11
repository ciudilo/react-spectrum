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

import {ActionButton, ToastQueue} from '@react-spectrum/s2';
import Copy from '@react-spectrum/s2/icons/Copy';

interface ColorHexCopyProps {
  hex: string;
}

/**
 * Displays a color's hex value with a copy button. Copies the uppercase hex string
 * and shows a success toast via ToastQueue.
 */
export function ColorHexCopy({hex}: ColorHexCopyProps) {
  let displayHex = hex.toUpperCase();

  let onCopy = () => {
    navigator.clipboard
      .writeText(displayHex)
      .then(() => {
        ToastQueue.positive(`Copied ${displayHex}`);
      })
      .catch(() => {
        ToastQueue.negative('Failed to copy.');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }}
      onPointerDown={event => event.stopPropagation()}>
      <span
        style={{
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 16,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.92)',
          letterSpacing: '0.04em'
        }}>
        {displayHex}
      </span>
      <ActionButton
        aria-label={`Copy ${displayHex}`}
        isQuiet
        size="S"
        onPress={onCopy}
        data-testid="copy-hex-button">
        <Copy />
      </ActionButton>
    </div>
  );
}
