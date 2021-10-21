import 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';
import { sample } from 'lodash';
import puppeteer from 'puppeteer';
import {
  addNode,
  generateRandomString,
  openModal,
  pageSetup,
  puppeteerConfig,
  saveModal,
  saveStory,
} from '../helpers';

setDefaultOptions({ timeout: 0 });

describe('Stories editing', () => {
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
  let storyNodes: string[];

  const saveSomeStory = async () => {
    await saveModal(page);
    const modal = await expect(page).toMatchElement(
      '#story-save',
    );
    expect(modal).not.toBeNull();
    await saveStory(page, storyName, storyDesc, storyTags);
  };

  const testEditing = async () => {
    const story = await expect(page).toMatchElement(
      '#data-story',
      { text: storyName },
    );

    await expect(story).toClick('i.fa-pen-square');

    const [storyNameNew, storyDescNew, storyTagsNew] = [
      generateRandomString(),
      generateRandomString(),
      [...storyTags, generateRandomString()],
    ];

    await saveStory(
      page,
      storyNameNew,
      storyDescNew,
      storyTagsNew,
    );

    await expect(page).toMatch(storyNameNew);
    await expect(page).toMatch(storyDescNew);
    for (const tag of storyTags) {
      await expect(page).toMatch(tag);
    }

    await expect(page).toClick('div#data-story', {
      text: storyNameNew,
    });

    for (const node of storyNodes) {
      await expect(page).toMatch(node);
    }
  };

  beforeEach(async () => {
    storyNodes = [...Array(3)].map(() => {
      return sample(possibleNodesNames);
    });

    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    await pageSetup(page);

    for (const node of storyNodes) {
      await addNode(node, page);
    }
    await saveSomeStory();
  }, 50000);

  test('Stories can be edited from open modal', async () => {
    await openModal(page);

    await testEditing();
  }, 70000);

  test('Stories can be edited from splash screen', async () => {
    await expect(page).toClick('span', {
      text: 'DataStory',
    });

    await testEditing();
  }, 70000);

  afterEach(async () => {
    await page.close();
    await browser.close();
  });
});
