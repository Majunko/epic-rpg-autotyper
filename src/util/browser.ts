import puppeteer from 'puppeteer';
import { readConfigFile } from './config.js';

const config = readConfigFile();

const BASE_URL = config.browser.url;
const wsChromeEndpointurl = config.browser.wsChromeEndpointurl;

export async function runBrowser(headless = true) {
  // --remote-debugging-port=9222
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