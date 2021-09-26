import puppeteer, { ElementHandle } from 'puppeteer';
import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import {
  puppeteerConfig,
  pageSetup,
  addNode,
  generateRandomString,
  openModal,
  saveModal,
} from '../helpers';
import { sample } from 'lodash';

setDefaultOptions({ timeout: 0 });

const saveStory = async (
  page: puppeteer.Page,
  name: string,
  desc: string,
  tags: string[],
) => {
  await expect(page).toMatch('save');

  await expect(page).toFill(
    'input[placeholder="descriptive story name"]',
    name,
  );
  await expect(page).toFill(
    'input[placeholder="story description"]',
    desc,
  );

  for (const tag of tags) {
    await expect(page).toClick('span', { text: '+' });
    await expect(page).toFill(
      'input[placeholder="story tag"][value=""]',
      tag,
    );
  }

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

  const storyName = generateRandomString();
  const storyDesc = generateRandomString();
  const storyTags = [...Array(3)].map(() => {
    return generateRandomString();
  });

  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);
  }, 50000);

  test('Stories can be saved', async () => {
    const node = sample(possibleNodesNames);
    await addNode(node, page);

    await saveModal(page);

    const modal = await expect(page).toMatchElement(
      '#story-save',
    );
    expect(modal).not.toBeNull();

    await saveStory(page, storyName, storyDesc, storyTags);

    await openModal(page);
    const story = await expect(page).toMatchElement(
      '#data-story',
    );

    await expect(story).toMatch(storyName);
    await expect(story).toMatch(storyDesc);
    for (const tag of storyTags) {
      await expect(story).toMatch(tag);
    }
  }, 100000);

  afterAll(() => browser.close());
});