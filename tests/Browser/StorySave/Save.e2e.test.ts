import puppeteer, { ElementHandle } from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import {
  puppeteerConfig,
  pageSetup,
  addNode,
  generateRandomString,
} from '../helpers';
import { sample } from 'lodash';

setDefaultOptions({ timeout: 0 });

const saveStory = async (
  page: ElementHandle,
  name: string,
  desc: string,
  tags: string[],
) => {
  await expect(page).toFill(
    'input[placeholder="descriptive story name"]',
    name,
  );
  await expect(page).toFill(
    'input[placeholder="story description"]',
    desc,
  );
  tags.forEach(async (tag) => {
    await expect(page).toClick('span', { text: '+' });
    await expect(page).toFill(
      'input[placeholder="story tag"][value=""]',
      tag,
    );
    await expect(page).toMatch(tag);
  });

  await expect(page).toClick('button', { text: 'Save' });
};

describe('Stories saving', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  const possibleNodesNames = [
    'CreateJSON',
    'HTTPRequest',
    'Inspect',
  ];

  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);
  }, 50000);

  test('Stories can be saved', async () => {
    const node = sample(possibleNodesNames);
    await addNode(node, page);

    await page.keyboard.down('Shift');
    await page.keyboard.press('KeyS');
    await page.keyboard.up('Shift');

    await expect(page).toMatch('save');
    const modal = await expect(page).toMatchElement(
      '#story-save',
    );

    const storyName = generateRandomString();
    const storyDesc = generateRandomString();
    const storyTags = [...Array(3)].map(() => {
      return generateRandomString();
    });

    await saveStory(modal, storyName, storyDesc, storyTags);

    await page.keyboard.down('Shift');
    await page.keyboard.press('KeyO');
    await page.keyboard.up('Shift');

    await expect(page).toMatch(storyName);
    await expect(page).toMatch(storyDesc);
    storyTags.forEach(async (tag) => {
      await expect(page).toMatch(tag);
    });
  }, 100000);

  afterAll(() => browser.close());
});
