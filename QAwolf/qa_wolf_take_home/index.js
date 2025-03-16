// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { equal } = require("assert");
const { assert } = require("console");
const { chromium } = require("playwright");
const { expect } = require("playwright/test");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const ARTICLESTOCHECK = 100;

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  // Inspect or gather first 100 arfticles
  const trs = page.locator('table#hnmain > tbody > tr');
  const articleArry = [101];
  //  let date = new Date(1900, 0, 1);
  let leastRankArticle = ARTICLESTOCHECK;
  let dateNowMill = Date.now();

  while (leastRankArticle < 100) {
    await page.getByRole('button', { name: 'More' }).click();
    trs += page.locator('table#hnmain > tbody > tr');
    leastRankArticle = Math.Max(parseInt(trs.locator('span.rank').textContent()));
  }

  // Iterate over tr collection for rank and second tr for date
  // Compare rank with date verify sequence newest to oldest

  for (let i = 0; i < ARTICLESTOCHECK; i++) {
    //    const tr = await trs.locator('.athing');
    const tr_rank = await trs.locator('.athing > span.rank').textContent().equals(i);
    const articleAgeMill = await tr_rank.locator('tr:next-sibling > span.age').textContent().split(' ')[1];
    expect(articleAgeMill).toBeLessThanOrEqual(dateNowMill);
  }
  // If we are her, first 100 are in order from newest to oldest!



  await browser.close();

}

(async () => {
  await sortHackerNewsArticles();
})();
