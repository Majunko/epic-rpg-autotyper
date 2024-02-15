import { validateConfigFile, readConfigFile } from './util/config.js';
import { printLogo, randomDelay } from './util/helpers.js';
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

  setTimeout(() => queueCommand(hunt), cm.huntTime);
  setTimeout(() => queueCommand(work), cm.workTime);
  setTimeout(() => queueCommand(farm), cm.farmTime);
  setTimeout(() => queueCommand(adventure), cm.adventureTime);

  if (config.useEventCommand) {
    setTimeout(() => queueCommand(eventCmd), cm.eventTime);
  }

  /**
   * Execute hunt command
   */
  async function hunt() {
    let timer = cm.huntTime;
    if (config.useRandomTimer) {
      timer = randomDelay(cm.huntTime);
    }

    cm.setSwitchHuntAndDonator(config);

    await page.type(inputTextHTML, cm.huntCommand);
    await page.keyboard.press('Enter');

    cm.isHealing(config, page, inputTextHTML);

    setTimeout(() => queueCommand(hunt), timer);
  }
  /**
   * Execute work command
   */
  async function work() {
    let timer = cm.workTime;
    if (config.useRandomTimer) {
      timer = randomDelay(cm.workTime);
    }

    await page.type(inputTextHTML, cm.workCommand);
    await page.keyboard.press('Enter');

    setTimeout(() => queueCommand(work), timer);
  }
  /**
   * Execute farm command
   */
  async function farm() {
    let timer = cm.farmTime;
    if (config.useRandomTimer) {
      timer = randomDelay(cm.farmTime);
    }

    await page.type(inputTextHTML, cm.farmCommand);
    await page.keyboard.press('Enter');

    setTimeout(() => queueCommand(farm), timer);
  }
  /**
   * Execute adventure command
   */
  async function adventure() {
    let timer = cm.adventureTime;
    if (config.useRandomTimer) {
      timer = randomDelay(cm.adventureTime);
    }

    await page.type(inputTextHTML, cm.advCommand);
    await page.keyboard.press('Enter');

    setTimeout(() => queueCommand(adventure), timer);
  }

  async function eventCmd() {
    let timer = cm.eventTime;
    if (config.useRandomTimer) {
      timer = randomDelay(cm.eventTime);
    }

    await page.type(inputTextHTML, cm.eventCommand);
    await page.keyboard.press('Enter');

    setTimeout(() => queueCommand(eventCmd), timer);
  }
})();
