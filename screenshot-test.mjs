import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const viewport = { width: 1440, height: 900 };
await page.setViewportSize(viewport);

// Navigate to the app
await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });

// Take a screenshot
await page.screenshot({ path: './screenshot-dashboard.png', fullPage: false });
console.log('Dashboard screenshot taken');

await browser.close();
