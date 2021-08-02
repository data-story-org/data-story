import 'expect-puppeteer';

export const puppeteerConfig = {
  // product: 'firefox',
  headless: true,
  devtools: false,
  slowMo: 250,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-web-security',
  ],
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const addNode = async (nodeName: string, page) => {
  await expect(page).toClick('span#add-node');
  await page.waitForSelector('input#node-search', {
    visible: true,
  });
	await page.focus('#node-search')
	await page.keyboard.type(nodeName)
  await page.keyboard.press('Enter');
  await page.waitForSelector('div.node', {
    visible: true,
  });
};
