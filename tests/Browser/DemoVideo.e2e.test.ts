import puppeteer from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import {
  puppeteerConfig,
  pageSetup,
  sleep,
  addNode,
} from './helpers';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

setDefaultOptions({ timeout: 0 });

describe('App', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);

    await sleep(5000);
  }, 200000);

  it('Creates nodes', async () => {
    const recorder = new PuppeteerScreenRecorder(page);
    await recorder.start('./report/video/simple.mp4');

    const node1 = 'CreateJSON';
    await addNode(node1, page);

    const node2 = 'HttpRequest';
    await addNode(node2, page);

    const i1 = 'Inspect';
    await addNode(i1, page);

    const i2 = 'Inspect';
    await addNode(i2, page);

    const i3 = 'Inspect';
    await addNode(i3, page);

    await expect(page).toClick('span#run');

    await page.waitForSelector('.Toastify__toast-body', {
      visible: true,
    });

    await expect(page).toClick('div#inspector-icon');
    await sleep(500);

    await recorder.stop();
  }, 100000);
});
