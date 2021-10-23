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
  saveStory,
} from '../helpers';
import { sample } from 'lodash';

setDefaultOptions({ timeout: 0 });

describe('Stories saving', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  const possibleNodesNames = [
    'CreateJSON',
    'HTTPRequest',
    'RenameAttributes',
  ];

  const storyName = generateRandomString();
  const storyDesc = generateRandomString();
  const storyTags = [...Array(3)].map(() => {
    return generateRandomString();
  });
  let storyNodes: string[];

  beforeAll(async () => {
    storyNodes = [...Array(3)].map(() => {
      return sample(possibleNodesNames);
    });

    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);
  }, 50000);

  test('Stories can be saved', async () => {
    for (const node of storyNodes) {
      await addNode(node, page);
    }

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

  test('Stories can be restored from open modal', async () => {
    await expect(page).toClick('div#data-story');

    for (const node of storyNodes) {
      await expect(page).toMatch(node);
    }
  }, 70000);

  test('Stories can be restored from splash screen', async () => {
    await expect(page).toClick('span', {
      text: 'DataStory',
    });
    await expect(page).toClick('div#data-story', {
      text: storyName,
    });

    for (const node of storyNodes) {
      await expect(page).toMatch(node);
    }
  }, 70000);

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
});
