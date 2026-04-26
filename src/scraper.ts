import puppeteer from 'puppeteer';
import { writeFile } from 'fs'

// Launch browser and open a new blank page
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Set screen size
await page.setViewport({ width: 1920, height: 1080 });

// Navigate to Raid Attackers tier list
await page.goto('https://db.pokemongohub.net/best/raid-attackers');
await page.screenshot({ path: 'temp/raidAttackers.png' });

// Save main page content as HTML
const raidAttackers = await page.$eval('main', element => element.innerHTML);
if (!raidAttackers) throw new Error('Could not find raid attackers data!');

writeFile('temp/raidAttackers.html', raidAttackers, (err) => {
  if (err) throw err;
  console.log('raid_attackers.html has been saved!');
});

// Navigate to Gym Defenders tier list
await page.goto('https://db.pokemongohub.net/best/gym-defenders');
await page.screenshot({ path: 'temp/gymDefenders.png' });

// Save main page content as HTML
const gymDefenders = await page.$eval('main', element => element.innerHTML);
if (!gymDefenders) throw new Error('Could not find raid attackers data!');

writeFile('temp/gymDefenders.html', gymDefenders, (err) => {
  if (err) throw err;
  console.log('raid_attackers.html has been saved!');
});

await browser.close();
