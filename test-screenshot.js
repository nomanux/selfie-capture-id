const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/capture-selfie-track', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:\\Users\\BJIT\\AppData\\Local\\Temp\\claude\\selfie-capture.png', fullPage: true });
  console.log('Screenshot saved');
  await browser.close();
})();
