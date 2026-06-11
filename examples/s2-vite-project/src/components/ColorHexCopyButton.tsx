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

import {ActionButton, ToastQueue, Tooltip, TooltipTrigger} from '@react-spectrum/s2';
import Copy from '@react-spectrum/s2/icons/Copy';

interface ColorHexCopyButtonProps {
  hex: string;
  /** When true, uses the quiet ActionButton variant for overlays on swatches. */
  quiet?: boolean;
}

export function copyColorHex(hex: string) {
  let displayHex = hex.toUpperCase();
  navigator.clipboard
    .writeText(displayHex)
    .then(() => {
      ToastQueue.positive(`Copied ${displayHex}`);
    })
    .catch(() => {
      ToastQueue.negative('Failed to copy.');
    });
}

export function ColorHexCopyButton({hex, quiet = false}: ColorHexCopyButtonProps) {
  let displayHex = hex.toUpperCase();

  return (
    <span
      onClick={event => event.stopPropagation()}
      onPointerDown={event => event.stopPropagation()}>
      <TooltipTrigger placement="top">
        <ActionButton
          aria-label={`Copy ${displayHex}`}
          isQuiet={quiet}
          size="S"
          onPress={() => copyColorHex(hex)}
          data-testid="color-hex-copy-button">
          <Copy />
        </ActionButton>
        <Tooltip>Copy hex</Tooltip>
      </TooltipTrigger>
    </span>
  );
}
