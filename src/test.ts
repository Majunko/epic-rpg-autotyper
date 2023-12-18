import puppeteer from 'puppeteer';
import { queueCommand } from './util/queue'
import { validateConfigFile, readConfigFile } from './util/config';

const config = readConfigFile();

const BASE_URL = 'https://duckduckgo.com';
const inputTextHTML = '#searchbox_input';

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
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle2' });
  await page.evaluate(() =>
    document.getElementById('searchbox_input')
  );

  // await page.waitForTimeout(20000);
  console.debug('Auto typer started ' + new Date());
  await page.type(inputTextHTML, "Mega nz");
  await page.keyboard.press('Enter');
})();

// testQueue();

function testQueue() {
  setInterval(() => {
    // Ejecuta Comando A 
    queueCommand(commandA);
  }, 3000);

  setInterval(() => {
    // Ejecuta Comando B 
    queueCommand(commandB);
  }, 6000);

  setInterval(() => {
    // Ejecuta Comando C 
    queueCommand(commandC);
  }, 9000);
}

function commandA() {
  console.log("Comando A ejecutado");
}

function commandB() {
  console.log("Comando B ejecutado");
}

function commandC() {
  console.log("Comando C ejecutado");
}