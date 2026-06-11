import {chromium} from 'playwright';
import {mkdirSync, readdirSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {execSync} from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mediaDir = join(__dirname, '..', 'media');
const videoDir = join(mediaDir, 'recordings');
const gifPath = join(mediaDir, 'color-copy-verification.gif');

mkdirSync(videoDir, {recursive: true});

const browser = await chromium.launch({headless: true});
const context = await browser.newContext({
  viewport: {width: 1280, height: 900},
  recordVideo: {
    dir: videoDir,
    size: {width: 1280, height: 900}
  },
  permissions: ['clipboard-read', 'clipboard-write']
});
const page = await context.newPage();

try {
  await page.goto('http://localhost:5173/', {waitUntil: 'networkidle'});
  await page.waitForTimeout(500);

  const firstCopyButton = page.getByTestId('hex-copy-button').first();
  await firstCopyButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const swatchHex = await page.getByTestId('swatch-hex').first().textContent();
  if (!swatchHex) {
    throw new Error('Could not read swatch hex value');
  }

  await firstCopyButton.click();
  await page.getByText(`Copied ${swatchHex}`).waitFor({state: 'visible', timeout: 5000});
  await page.waitForTimeout(800);

  const reviewField = page.getByRole('textbox', {name: 'Review comments'});
  await reviewField.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await reviewField.click();
  await page.keyboard.press('Control+V');
  await page.waitForTimeout(1200);

  const pastedValue = await reviewField.inputValue();
  if (pastedValue !== swatchHex) {
    throw new Error(`Clipboard mismatch: expected "${swatchHex}", got "${pastedValue}"`);
  }

  console.log(`Verified copy flow for ${swatchHex}`);
} finally {
  await page.waitForTimeout(1000);
  await context.close();
  await browser.close();
}

const videos = readdirSync(videoDir);
const webmName = videos.find(f => f.endsWith('.webm'));
if (!webmName) {
  throw new Error('No Playwright recording found');
}
const webmPath = join(videoDir, webmName);

execSync(
  `ffmpeg -y -i "${webmPath}" -vf "fps=12,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${gifPath}"`,
  {stdio: 'inherit'}
);

console.log(`GIF saved to ${gifPath}`);
