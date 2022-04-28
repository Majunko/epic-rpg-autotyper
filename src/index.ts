/* eslint-disable max-len */
import puppeteer from 'puppeteer';
import { validateConfigFile, readConfigFile } from './util/config';
import { printLogo } from './util/logo';
import { superTrim } from './util/helpers';

/*
 * El método pop() elimina el último elemento de un array y lo devuelve
 * El método shift() elimina el primer elemento del array y lo retorna. Este método modifica la longitud del array.
 * El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
 */

const r = validateConfigFile();
if (!r.status) {
  console.log(r.msg);
  process.exit(1);
}

printLogo();
const config = readConfigFile();

// -------- Time --------
const plusSec = 2;

let huntTime = 60;
let workTime = 300;
let farmTime = 600;
let adventureTime = 3600;
// ----------------------

if (config.donatorPercent > 0) {
  huntTime = huntTime - (huntTime * config.donatorPercent) / 100;
  workTime = workTime - (workTime * config.donatorPercent) / 100;
  farmTime = farmTime - (farmTime * config.donatorPercent) / 100;
  adventureTime = adventureTime - (adventureTime * config.donatorPercent) / 100;
}

if (config.eventCooldownPorcent > 0) {
  huntTime = huntTime - (huntTime * config.eventCooldownPorcent) / 100;
  workTime = workTime - (workTime * config.eventCooldownPorcent) / 100;
  farmTime = farmTime - (farmTime * config.eventCooldownPorcent) / 100;
  // prettier-ignore
  adventureTime = adventureTime - (adventureTime * config.eventCooldownPorcent) / 100;
}

huntTime = (huntTime + plusSec) * 1000;
workTime = (workTime + plusSec) * 1000;
farmTime = (farmTime + plusSec) * 1000;
adventureTime = (adventureTime + plusSec) * 1000;

let huntCommand = superTrim(`rpg hunt ${config.ascended ? 'h' : ''} ${config.donatorPercent >= 35 ? 't' : ''}`);
// prettier-ignore
let workCommand = 'rpg dynamite';
const farmCommand = 'rpg farm';
const advCommand = superTrim(`rpg adv ${config.ascended ? 'h' : ''}`);

if (config.ascended) {
  switch (config.currentArea) {
    case 4:
    case 5:
      if (config.professions.worker >= 115) {
        workCommand = 'rpg chainsaw';
      }
      break;

    case 6:
    case 7:
      if (config.professions.worker >= 102) {
        workCommand = 'rpg greenhouse';
      }
      break;

    case 8:
      if (config.professions.worker >= 109) {
        workCommand = 'rpg chainsaw';
      }
      break;

    case 9:
      if (config.professions.worker >= 107) { 
        workCommand = 'rpg greenhouse';
      }
      break;

    case 12:
    case 13:
    case 14:
    case 15:
      workCommand = 'rpg chainsaw';
      break;

    case 1:
    case 2:
    case 3:
    case 10:
    case 11:
    default:
      workCommand = 'rpg dynamite';
      break;
  }
} else { // not ascended
  workCommand = 'rpg chop';
}

// Useful
let isHuntTogether = true;
let numHunts = 0;
// ------

const BASE_URL = 'https://discord.com';
const inputTextHTML = 'span[data-slate-node="text"]'; // Input where the user type.

/**
 * run the process.
 */
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
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
  setInterval(hunt, huntTime);
  setInterval(work, workTime); // (3m 15s)
  setInterval(farm, farmTime);
  setInterval(adventure, adventureTime); // (39m)
  /**
   * Execute hunt command
   */
  async function hunt() {
    if (config.switchHunt && config.donatorPercent > 0) {
      if (isHuntTogether) {
        huntCommand = superTrim(`rpg hunt ${config.ascended} ? h : '' t`);
        isHuntTogether = false;
      } else {
        huntCommand = superTrim(`rpg hunt ${config.ascended} ? h : ''`);
        isHuntTogether = true;
      }
    }
    // isInCommand = true;
    await page.type(inputTextHTML, huntCommand);
    await page.keyboard.press('Enter');
    if (config.countHuntsToHeal > 0) {
      numHunts++;
      if (numHunts == config.countHuntsToHeal) {
        await page.type(inputTextHTML, 'rpg heal', {
          delay: 120,
        });
        await page.keyboard.press('Enter');
        numHunts = 0;
      }
    }
  }
  /**
   * Execute work command
   */
  async function work() {
    await page.type(inputTextHTML, workCommand);
    await page.keyboard.press('Enter');
  }
  /**
   * Execute farm command
   */
  async function farm() {
    await page.type(inputTextHTML, farmCommand);
    await page.keyboard.press('Enter');
  }
  /**
   * Execute adventure command
   */
  async function adventure() {
    await page.type(inputTextHTML, advCommand);
    await page.keyboard.press('Enter');
  }
})();
