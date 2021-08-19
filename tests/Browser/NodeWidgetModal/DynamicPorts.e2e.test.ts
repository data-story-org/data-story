import puppeteer from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import {
  puppeteerConfig,
  pageSetup,
  sleep,
  addNode,
  generateRandomString,
  repeatablesLength,
} from '../helpers';
import { sample } from 'lodash';

setDefaultOptions({ timeout: 0 });

describe('Dynamic ports', () => {
  let browser;
  let page;

  const possibleNodesNames = ['Filter'];

  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);
  }, 50000);

  test('Dynamic ports are being created', async () => {
    const node = sample(possibleNodesNames);
    await addNode(node, page);

    await page.keyboard.press('Enter');
    const modal = await expect(page).toMatchElement(
      '#node-modal',
    );

    const randomValue1 = generateRandomString();
    const randomValue2 = generateRandomString();

    await expect(page).toFill(
      'input[placeholder="port"][value="port"]',
      randomValue1,
    );

    await expect(modal).toClick('span', { text: '+' });
    expect(await repeatablesLength(modal)).toBe(2);

    await expect(page).toFill(
      'input[placeholder="port"][value=""]',
      randomValue2,
    );
    await page.keyboard.press('Enter');

    await expect(page).toMatch(randomValue1);
    await expect(page).toMatch(randomValue2);
  }, 50000);

  afterAll(() => browser.close());
});
