import puppeteer from 'puppeteer';
import { readConfigFile } from './config';

const config = readConfigFile();

const BASE_URL = config.browser.url;

export async function runBrowser(headless = true) {
  // --remote-debugging-port=9222
  const wsChromeEndpointurl = 'ws://127.0.0.1:9222/devtools/browser/239369b6-71bd-4529-8c3a-cd00ddf2a7a4';
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointurl,
    defaultViewport: null,
  });

  /*const browser = await puppeteer.launch({
    // headless: headless ? 'new' : false,
    headless: false,
    defaultViewport: null,
    // args: [
    //     '--start-maximized'
    // ],
    userDataDir: config.browser.dataDir,
  });*/

  const page = await browser.newPage();
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'networkidle2' });

  // const url = await page.url();

  // if (url.includes('login') && headless) {
  //   await browser.close();
  //   return {success: false, page};
  // }

  await page.waitForXPath('//div[contains(text(), "Nitro")]', {timeout: 90_000});
  const CHANNELS_URL = `${BASE_URL}/channels/${config.browser.serverID}/${config.browser.channelID}`;
  await page.goto(CHANNELS_URL, {});

  await page.evaluate(() =>
    document.getElementsByClassName('expression-picker-chat-input-button')
  );

  await page.waitForSelector(config.browser.inputTextHTML);

  return {success: true, page};
  // await page.waitForTimeout(20000);
}