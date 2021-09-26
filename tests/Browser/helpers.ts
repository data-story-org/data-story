import 'expect-puppeteer';
import { Page } from 'puppeteer';

export const puppeteerConfig = {
  // product: 'firefox',
  headless: true,
  devtools: false,
  slowMo: 250,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--disable-dev-shm-usage',
    '--allow-running-insecure-content',
    '--disable-web-security',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
  ],
};

export const pageSetup = async (page) => {
  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent('UA-TEST');
  await page.goto(
    `file://${process.cwd()}/public/index.html`,
    { waitUntil: 'networkidle2' },
  );
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const addNode = async (
  nodeName: string,
  page: Page,
) => {
  await expect(page).toClick('span#add-node');
  await page.waitForSelector('input#node-search', {
    visible: true,
  });
  await page.focus('#node-search');
  await page.keyboard.type(nodeName);
  await page.keyboard.press('Enter');
  await page.waitForSelector('div.node', {
    visible: true,
  });
};

export const generateRandomString = () => {
  return Math.random().toString(36).substring(7);
};

export const repeatableRowSelector =
  '.flex.flex-row.space-x-1';

export const repeatablesLength = async (el) => {
  const repeatables = await el.$$(repeatableRowSelector);
  return repeatables.length;
};

export const openModal = async (page: Page) => {
  await page.keyboard.down('Shift');
  await page.keyboard.press('KeyO');
  await page.keyboard.up('Shift');
};

export const saveModal = async (page: Page) => {
  await page.keyboard.down('Shift');
  await page.keyboard.press('KeyO');
  await page.keyboard.up('Shift');
};
