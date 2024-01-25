import { ConfigAppModel } from '../models/config-app.js';
import { superTrim } from './helpers.js';
import { Page } from 'puppeteer';

// -------- Time --------
export let huntTime = 60 + 2;
export let workTime = 300 + 2;
export let farmTime = 600 + 2;
export let adventureTime = 3600 + 2;
// ----------------------

// ------ Commands ------
export let huntCommand = '';
export let workCommand = '';
export let farmCommand = '';
export let advCommand = '';
// ----------------------

export function setSwitchHuntAndDonator(config: ConfigAppModel) {
  if (config.switchHunt && config.donatorPercent > 0) {
    huntCommand = superTrim(`rpg hunt ${config.ascended} ? h : '' t`);
    config.isHuntTogether = false;

    if (!config.isHuntTogether) {
      huntCommand = superTrim(`rpg hunt ${config.ascended} ? h : ''`);
      config.isHuntTogether = true;
    }
  }
}

export async function isHealing(config: ConfigAppModel, page: Page, inputTextHTML: string) {
  if (config.countHuntsToHeal > 0) {
    config.numHunts++;
    if (config.numHunts == config.countHuntsToHeal) {
      await page.type(inputTextHTML, 'rpg heal', {
        delay: 120,
      });
      await page.keyboard.press('Enter');
      config.numHunts = 0;
    }
  }
}

export function setCommandsTime(config: ConfigAppModel) {
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
    adventureTime = adventureTime - (adventureTime * config.eventCooldownPorcent) / 100;
  }

   huntTime = huntTime * 1000;
   workTime = workTime * 1000;
   farmTime = farmTime * 1000;
   adventureTime = adventureTime * 1000;
}

export function setCommands(config: ConfigAppModel) {
  huntCommand = superTrim(`rpg hunt ${config.ascended ? 'h' : ''} ${config.donatorPercent >= 35 ? 't' : ''}`);
  // prettier-ignore
  workCommand = 'rpg dynamite';
  farmCommand = 'rpg farm';
  advCommand = superTrim(`rpg adv ${config.ascended ? 'h' : ''}`);

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
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
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
}
