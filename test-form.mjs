import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    // Take a screenshot of the form
    await page.screenshot({ path: '../form-screenshot.png', fullPage: false });
    
    console.log('Screenshot saved!');
  } catch (error) {
    console.error('Error:', error);
  }
  
  await browser.close();
})();
