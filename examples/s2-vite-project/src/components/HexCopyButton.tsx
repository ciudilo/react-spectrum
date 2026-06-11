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
import {MouseEvent, PointerEvent, useState} from 'react';

interface HexCopyButtonProps {
  hex: string;
  /** When true, uses a quiet button suited for overlaying on color swatches. */
  isQuiet?: boolean;
}

function stopCardAction(event: MouseEvent | PointerEvent) {
  event.stopPropagation();
}

export function HexCopyButton({hex, isQuiet = false}: HexCopyButtonProps) {
  let [isCopied, setIsCopied] = useState(false);
  let displayHex = hex.toUpperCase();

  let onCopy = () => {
    navigator.clipboard
      .writeText(displayHex)
      .then(() => {
        setIsCopied(true);
        ToastQueue.positive(`Copied ${displayHex}`);
        window.setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        ToastQueue.negative('Failed to copy.');
      });
  };

  return (
    <span onClick={stopCardAction} onPointerDown={stopCardAction}>
      <TooltipTrigger placement="top">
        <ActionButton
          aria-label={`Copy ${displayHex}`}
          isQuiet={isQuiet}
          size="S"
          onPress={onCopy}
          data-testid="hex-copy-button">
          <Copy />
        </ActionButton>
        <Tooltip>{isCopied ? 'Copied!' : 'Copy hex'}</Tooltip>
      </TooltipTrigger>
    </span>
  );
}
