import puppeteer from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import {
  puppeteerConfig,
  pageSetup,
  sleep,
  addNode,
} from './helpers';

setDefaultOptions({ timeout: 0 });

describe('App', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);

    await sleep(5000);
  }, 200000);

  it('Loads and renders react', async () => {
    await expect(page).toMatch('proof of concept');
    await expect(page).toMatch('DataStory');
  });

  it('Creates nodes', async () => {
    const node = 'CreateJSON';
    await addNode(node, page);

    const node2 = 'Inspect';
    await addNode(node2, page);

    await expect(page).toMatch(node);
    await expect(page).toMatch(node2);
  }, 100000);

  it('Runs story and shows notification', async () => {
    await expect(page).toClick('span#run');
    await page.waitForSelector('.Toastify__toast-body', {
      visible: true,
    });

    await sleep(100);
    await expect(page).toMatch('Successfully ran story!');
  }, 100000);

  it('Shows inspector tab', async () => {
    await expect(page).toClick('div#inspector-icon');
    await sleep(500);
    await expect(page).toMatch('todos');
  }, 100000);

  afterAll(() => browser.close());
});
