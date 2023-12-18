/* eslint-disable max-len */
import puppeteer from 'puppeteer';
import { validateConfigFile, readConfigFile } from './util/config';
import { printLogo } from './util/logo';
import { superTrim } from './util/helpers';
import * as bot from './util/bot';
import { queueCommand } from './util/queue'

const r = validateConfigFile();
if (!r.status) {
  console.log(r.msg);
  process.exit(1);
}

printLogo();
const config = readConfigFile();

const BASE_URL = 'https://discord.com';

// 'span[data-slate-node="text"]'
// 'span[data-slate-zero-width="n"]'
// 'div[role="textbox"][data-slate-node="value"]'
// Input where the user type.
const inputTextHTML = 'span[data-slate-node="text"]';

// Set times for setInterval() in ms
bot.setCommandsTime(config);
bot.setCommands(config);

/**
 * run the process.
 */
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
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
  await page.evaluate(() =>
    document.getElementsByClassName('expression-picker-chat-input-button')
  );

  // await page.waitForTimeout(20000);
  console.debug('Auto typer started ' + new Date());
  await page.waitForSelector(inputTextHTML);

  setInterval(() => queueCommand(hunt), bot.huntTime);
  setInterval(() => queueCommand(work), bot.workTime); // (3m 15s)
  setInterval(() => queueCommand(farm), bot.farmTime);
  setInterval(() => queueCommand(adventure), bot.adventureTime); // (39m)

  /**
   * Execute hunt command
   */
  async function hunt() {
    // bot.setSwitchHuntAndDonator(config);

    await page.type(inputTextHTML, bot.huntCommand);
    await page.keyboard.press('Enter');

    console.log("Hunt executed. " + new Date())

    // bot.isHealing(config, page, inputTextHTML);
  }
  /**
   * Execute work command
   */
  async function work() {
    await page.type(inputTextHTML, bot.workCommand);
    await page.keyboard.press('Enter');
  }
  /**
   * Execute farm command
   */
  async function farm() {
    await page.type(inputTextHTML, bot.farmCommand);
    await page.keyboard.press('Enter');
  }
  /**
   * Execute adventure command
   */
  async function adventure() {
    await page.type(inputTextHTML, bot.advCommand);
    await page.keyboard.press('Enter');
  }
})();
