import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const viewport = { width: 1440, height: 900 };
await page.setViewportSize(viewport);

// Navigate to the app
await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });

// Click on "Property" in the sidebar
const propertyLink = page.locator('text=Property');
await propertyLink.click();
await page.waitForTimeout(500);

// Take a screenshot of the Properties page in grid view
await page.screenshot({ path: './screenshot-properties-grid.png', fullPage: false });
console.log('Properties grid screenshot taken');

// Click the filter button to open the drawer
const filterButton = page.locator('button:has-text("Search and filter")');
if (await filterButton.isVisible()) {
  await filterButton.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: './screenshot-filter-drawer.png', fullPage: false });
  console.log('Filter drawer screenshot taken');
}

// Click the list view button
const listViewButton = page.locator('button[aria-label="List view"]');
await listViewButton.click();
await page.waitForTimeout(500);

// Take a screenshot of the Properties page in list view
await page.screenshot({ path: './screenshot-properties-list.png', fullPage: false });
console.log('Properties list screenshot taken');

await browser.close();
