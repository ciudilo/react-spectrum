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

import {ToastQueue} from '@react-spectrum/s2';

/** Copies a hex color to the clipboard and shows a large success toast for demo visibility. */
export async function copyHexToClipboard(hex: string): Promise<void> {
  const normalized = hex.toUpperCase();

  try {
    await navigator.clipboard.writeText(normalized);
    ToastQueue.positive(`Copied ${normalized}`, {timeout: 6000});
  } catch {
    ToastQueue.negative('Failed to copy hex value.');
  }
}
