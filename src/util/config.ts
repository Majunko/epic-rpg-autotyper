/* eslint-disable max-len */
import fs from 'fs';
import {ConfigAppModel} from '../models/config-app';
import {Res} from '../models/res';

/**
 * Validate config/app.json
 * @return {resFile}
 */
export function validateConfigFile(): Res {
  const f = readConfigFile();

  const res: Res = {
    status: true,
    msg: '',
  };

  if (f.browser == undefined) {
    res.status = false;
    res.msg = `Browser key not found in 'config/app.json'`;
  }

  if (f.browser.serverID == undefined || f.browser.serverID == '') {
    res.status = false;
    res.msg = `browser.serverID empty 'config/app.json'`;
  } else if (typeof f.browser.serverID != 'string' && typeof f.browser.serverID != 'number') {
    res.status = false;
    res.msg = `browser.serverID must be type 'string' or 'number' in 'config/app.json'`;
  }

  if (f.browser.channelID == undefined || f.browser.channelID == '') {
    res.status = false;
    res.msg = `browser.channelID empty 'config/app.json'`;
  } else if (typeof f.browser.channelID != 'string') {
    res.status = false;
    res.msg = `browser.channelID must be type 'string' in 'config/app.json'`;
  }

  if (f.donatorPercent == undefined) {
    res.status = false;
    res.msg = `donatorPercent key not found in 'config/app.json'`;
  } else {
    if (typeof f.donatorPercent != 'number') {
      res.status = false;
      res.msg = `donatorPercent value must be type 'number' in 'config/app.json'`;
    } else {
      switch (f.donatorPercent) {
        case 0:
        case 10:
        case 20:
        case 35:
          break;

        default:
          res.status = false;
          res.msg = `donatorPercent value must be '0' | '10' | '20' | '35' in 'config/app.json'`;
          break;
      }
    }
  }

  if (f.hardmode == undefined) {
    res.status = false;
    res.msg = `hardmode key not found in 'config/app.json'`;
  } else if (typeof f.hardmode != 'boolean') {
    res.status = false;
    res.msg = `hardmode value must be type 'boolean' in 'config/app.json'`;
  }

  if (f.currentArea == undefined) {
    res.status = false;
    res.msg = `currentArea key not found in in 'config/app.json'`;
  } else if (typeof f.currentArea != 'number') {
    res.status = false;
    res.msg = `currentArea value must be type 'number' in 'config/app.json'`;
  }

  if (f.switchHunt == undefined) {
    res.status = false;
    res.msg = `switchHunt key not found in in 'config/app.json'`;
  } else if (typeof f.switchHunt != 'boolean') {
    res.status = false;
    res.msg = `switchHunt value must be type 'boolean' in 'config/app.json'`;
  }

  if (f.countHuntsToHeal == undefined) {
    res.status = false;
    res.msg = `countHuntsToHeal key not found in in 'config/app.json'`;
  } else if (typeof f.countHuntsToHeal != 'number') {
    res.status = false;
    res.msg = `switchHunt value must be type 'boolean' in 'config/app.json'`;
  }

  if (f.eventCooldownPorcent == undefined) {
    res.status = false;
    res.msg = `countHuntsToHeal key not found in in 'config/app.json'`;
  } else if (typeof f.eventCooldownPorcent != 'number') {
    res.status = false;
    res.msg = `eventCooldownPorcent value must be type 'number' in 'config/app.json'`;
  }

  return res;
}

/**
 * Reads the config file config/app.json
 * @return {ConfigAppModel} file
 */
export function readConfigFile(): ConfigAppModel {
  const f = fs.readFileSync('config/app.json', 'utf8');
  return JSON.parse(f);
}

