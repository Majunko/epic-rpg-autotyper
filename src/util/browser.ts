import puppeteer from 'puppeteer';
import { readConfigFile } from './config';

const config = readConfigFile();

const BASE_URL = config.browser.url;

export async function runBrowser(headless = false) {
  const browser = await puppeteer.launch({
    headless: headless ? true : 'new',
    defaultViewport: null,
    // args: [
    //     '--start-maximized'
    // ],
    userDataDir: config.browser.dataDir,
  });

  const page = await browser.newPage();
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'networkidle2' });
  await page.waitForXPath('//div[contains(text(), "Nitro")]');
  const CHANNELS_URL = `${BASE_URL}/channels/${config.browser.serverID}/${config.browser.channelID}`;
  await page.goto(CHANNELS_URL, {});

  const url = await page.url();
  if (url.includes('login')) {
    await browser.close();
    return {success: false, page};
  }

  await page.evaluate(() =>
    document.getElementsByClassName('expression-picker-chat-input-button')
  );

  await page.waitForSelector(config.browser.inputTextHTML);

  return {success: true, page};
  // await page.waitForTimeout(20000);
}