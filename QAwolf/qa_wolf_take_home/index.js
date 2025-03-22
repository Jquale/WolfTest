// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import { equal } from "assert";
import { assert } from "console";
import { lchown } from "fs";
import { waitForDebugger } from "inspector";
import { chromium } from "@playwright/test";

async function sortHackerNewsArticles() {
  const ARTICLESTOCHECK = 100;
  // launch browser
  const browser = await chromium.launch({ headless: false });
  let context = await browser.newContext();
  // Navigate to Hacker New
  let page = await context.newPage();
  await page.goto("https://news.ycombinator.com/newest");
  let articleCount = 0;
  let articleAges = (await page.$$('span.age'));
  let newestDate = Date.now();

  async function articlesAreInOrder(articles) {
    let previousArticleDate = newestDate;
    let currentArticleDate = newestDate;
    articles.forEach(async (age) => {
      currentArticleDate = JSON.stringify(await age.getAttribute('title')).split(' ')[1].substring(0, 10);
      if (previousArticleDate >= currentArticleDate) {
        previousArticleDate = currentArticleDate;
        ++articleCount;
        console.log(articleCount);
        // articleCount++;
      }
    });

    return true;
  };


  while (articleCount < ARTICLESTOCHECK) {
    await articlesAreInOrder(articleAges);
    // Load more articles
    await page.locator('.morelink', { name: 'More' }).click();
    console.log(page.url());
    articleAges = await page.$$('span.age');
  }

  // context = await browser.newContext();
  // page = await context.newPage()

  // If we are her, first 100 are in order from newest to oldest!
  console.log('First 100 articles are in order from newest to oldest!');

}


(async () => {
  await sortHackerNewsArticles();

})();
