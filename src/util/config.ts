/* eslint-disable max-len */
import fs from 'fs';
import {ConfigAppModel} from '../models/config-app.js';

/**
 * Validate config/app.json
 * @return {resFile}
 */
export function validateConfigFile() {
  const f = readConfigFile();

  let res:any[] = [];

  if (f.browser == undefined) {
    res.push(`browser key not found in 'config/app.json'`);
  }

  if (f.browser.url == undefined || f.browser.url == ''){
    res.push(`browser.url empty 'config/app.json'`);
  }

  if (f.browser.serverID == undefined || f.browser.serverID == '') {
    res.push(`browser.serverID empty 'config/app.json'`);
  } else if (typeof f.browser.serverID != 'string' && typeof f.browser.serverID != 'number') {
    res.push(`browser.serverID must be type 'string' or 'number' in 'config/app.json'`);
  }

  if (f.browser.channelID == undefined || f.browser.channelID == '') {
    res.push(`browser.channelID empty 'config/app.json'`);
  } else if (typeof f.browser.channelID != 'string') {
    res.push(`browser.channelID must be type 'string' in 'config/app.json'`);
  }

  if (f.browser.inputTextHTML == undefined || f.browser.inputTextHTML == '') {
    res.push(`browser.inputTextHTML empty 'config/app.json'`);
  } else if (typeof f.browser.inputTextHTML != 'string') {
    res.push(`browser.inputTextHTML must be type 'string' in 'config/app.json'`);
  }

  if (f.browser.wsChromeEndpointurl == undefined || f.browser.wsChromeEndpointurl == '') {
    res.push(`browser.wsChromeEndpointurl empty 'config/app.json'`);
  } else if (typeof f.browser.wsChromeEndpointurl != 'string') {
    res.push(`browser.wsChromeEndpointurl must be type 'string' in 'config/app.json'`);
  }

  if (f.professions == undefined) {
    res.push(`professions key not found in 'config/app.json'`);
  }

  if (f.professions.worker == undefined) {
    res.push(`professions.worker empty 'config/app.json'`);
  } else if (typeof f.professions.worker != 'number') {
    res.push(`professions.worker must be type 'number' in 'config/app.json'`);
  } else if (f.professions.worker < 0) {
    res.push(`professions.worker must be >= 0 in 'config/app.json'`);
  }

  if (f.donatorPercent == undefined) {
    res.push(`donatorPercent key not found in 'config/app.json'`);
  } else {
    if (typeof f.donatorPercent != 'number') {
      res.push(`donatorPercent value must be type 'number' in 'config/app.json'`);
    } else {
      switch (f.donatorPercent) {
        case 0:
        case 10:
        case 20:
        case 35:
          break;

        default:
          res.push(`donatorPercent value must be '0' | '10' | '20' | '35' in 'config/app.json'`);
          break;
      }
    }
  }

  if (f.ascended == undefined) {
    res.push(`ascended key not found in 'config/app.json'`);
  } else if (typeof f.ascended != 'boolean') {
    res.push(`ascended value must be type 'boolean' in 'config/app.json'`);
  }

  if (f.currentArea == undefined) {
    res.push(`currentArea key not found in in 'config/app.json'`);
  } else if (typeof f.currentArea != 'number') {
    res.push(`currentArea value must be type 'number' in 'config/app.json'`);
  }

  if (f.switchHunt == undefined) {
    res.push(`switchHunt key not found in in 'config/app.json'`);
  } else if (typeof f.switchHunt != 'boolean') {
    res.push(`switchHunt value must be type 'boolean' in 'config/app.json'`);
  }

  if (f.isHuntTogether == undefined) {
    res.push(`isHuntTogether key not found in in 'config/app.json'`);
  } else if (typeof f.isHuntTogether != 'boolean') {
    res.push(`isHuntTogether value must be type 'boolean' in 'config/app.json'`);
  }

  if (f.numHunts == undefined) {
    res.push(`numHunts key not found in in 'config/app.json'`);
  } else if (typeof f.numHunts != 'number') {
    res.push(`numHunts value must be type 'number' in 'config/app.json'`);
  }

  if (f.countHuntsToHeal == undefined) {
    res.push(`countHuntsToHeal key not found in in 'config/app.json'`);
  } else if (typeof f.countHuntsToHeal != 'number') {
    res.push(`countHuntsToHeal value must be type 'number' in 'config/app.json'`);
  }

  if (f.eventCooldownPorcent == undefined) {
    res.push(`eventCooldownPorcent key not found in in 'config/app.json'`);
  } else if (typeof f.eventCooldownPorcent != 'number') {
    res.push(`eventCooldownPorcent value must be type 'number' in 'config/app.json'`);
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

