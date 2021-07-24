import puppeteer from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import { puppeteerConfig, sleep, addNode } from './helpers';

setDefaultOptions({ timeout: 0 });

describe('Hotkeys', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('UA-TEST');
    await page.goto(
      `file://${process.cwd()}/public/index.html`,
      { waitUntil: 'networkidle2' },
    );

    await sleep(5000);
  }, 200000);

  it('[ENTER] selects node from search', async () => {
    const node = 'CreateJSON';
    await addNode(node, page);

    await expect(page).toMatch(node);
  }, 100000);

  it('[SHIFT + D] opens diagram', async () => {
    // Go to inpector first
    await page.keyboard.down('Shift');
    await page.keyboard.press('KeyT');
    await page.keyboard.up('Shift');
    await expect(page).toMatch('No data to show here');

    // Go to diagram
    await page.keyboard.down('Shift');
    await page.keyboard.press('KeyD');
    await page.keyboard.up('Shift');
    await page.waitForSelector('div#app-diagram', {
      visible: true,
    });

    await expect(page).toMatch('div#diagram');
  }, 100000);

  it('[SHIFT + T] opens inspector', async () => {
    await page.keyboard.down('Shift');
    await page.keyboard.press('KeyT');
    await page.keyboard.up('Shift');
    await expect(page).toMatch('No data to show here');
  }, 100000);
});
