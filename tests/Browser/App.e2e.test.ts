import puppeteer from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';

setDefaultOptions({ timeout: 0 });

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe('App', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      slowMo: 250,
    });
    page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('UA-TEST');
    await page.goto(
      `file://${process.cwd()}/public/index.html`,
      { waitUntil: 'networkidle2' },
    );

    await sleep(5000);
  }, 200000);

  const addNode = async (nodeName: string, page) => {
    await expect(page).toClick('span#add-node');
    await page.waitForSelector('input#node-search', {
      visible: true,
    });
    await expect(page).toFill(
      'input#node-search',
      nodeName,
    );
    await page.keyboard.press('Enter');
    await page.waitForSelector('div.node', {
      visible: true,
    });
  };

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
