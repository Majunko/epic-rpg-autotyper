import { validateConfigFile, readConfigFile } from './util/config.js';
import { printLogo } from './util/helpers.js';
import * as cm from './util/commands.js';
import { queueCommand } from './util/queue.js';
import { runBrowser } from './util/browser.js';

const r = validateConfigFile();
if (r.length > 0) {
  r.forEach(e => console.log(`- ${e}`));
  process.exit(1);
}

const config = readConfigFile();

// Set times for setInterval() in ms
cm.setCommandsTime(config);
cm.setCommands(config);

const inputTextHTML = config.browser.inputTextHTML;
printLogo();

/**
 * run the process.
 */
(async () => {

  const {success, page} = await runBrowser();
  
  if (!success){
    const {success, page} = await runBrowser(false);
  }

  console.debug('Auto typer started ' + new Date());

  // setTimeout(() => queueCommand(hunt), cm.huntTime);

  setInterval(() => queueCommand(hunt), cm.huntTime);
  setInterval(() => queueCommand(work), cm.workTime); // (3m 15s)
  setInterval(() => queueCommand(farm), cm.farmTime);
  setInterval(() => queueCommand(adventure), cm.adventureTime); // (39m)
  setInterval(() => queueCommand(eventCmd), cm.eventTime);

  /**
   * Execute hunt command
   */
  async function hunt() {
    cm.setSwitchHuntAndDonator(config);

    await page.type(inputTextHTML, cm.huntCommand);
    await page.keyboard.press('Enter');

    cm.isHealing(config, page, inputTextHTML);
  }
  /**
   * Execute work command
   */
  async function work() {
    await page.type(inputTextHTML, cm.workCommand);
    await page.keyboard.press('Enter');
  }
  /**
   * Execute farm command
   */
  async function farm() {
    await page.type(inputTextHTML, cm.farmCommand);
    await page.keyboard.press('Enter');
  }
  /**
   * Execute adventure command
   */
  async function adventure() {
    await page.type(inputTextHTML, cm.advCommand);
    await page.keyboard.press('Enter');
  }

  async function eventCmd() {
    await page.type(inputTextHTML, cm.eventCommand);
    await page.keyboard.press('Enter');
  }
})();
