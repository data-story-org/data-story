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
    await page.waitForSelector('#node-modal', {
      visible: true,
    });

    await page.focus(`input[value="port"]`);
    const newName = generateRandomString();
    await page.keyboard.type(newName);
    await page.keyboard.press('Enter');

    await expect(page).toMatch(newName);
  });

  afterAll(() => browser.close());
});
