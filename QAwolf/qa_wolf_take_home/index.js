// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import { chromium, expect } from "@playwright/test";

async function sortHackerNewsArticles() {
  const ARTICLESTOCHECK = 100;
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to Hacker New
  await page.goto("https://news.ycombinator.com/newest");
  let articleCount = 0;
  let articleAges = (await page.$$('span.age'));
  let newestDate = Date.now(); async function
    articlesAreInOrder(articles) {
    let previousArticleDate = newestDate;
    let currentArticleDate = newestDate;
    articles.forEach(async (age) => {
      currentArticleDate = JSON.stringify(await age.getAttribute('title')).split(' ')[1].substring(0, 10);
      ++articleCount;
      // Checking the order starting from the most recent, newer dates are greater, more time has passed since epoch
      expect(parseInt(previousArticleDate)).toBeGreaterThanOrEqual(parseInt(currentArticleDate));
    });

    return true;
  };

  while (articleCount < ARTICLESTOCHECK) {
    await articlesAreInOrder(articleAges);
    // Load more articles
    await page.locator('.morelink', { name: 'More' }).click();
    articleAges = await page.$$('span.age');
  }

  console.log('First 100 articles are in order from newest to oldest!');
}


(async () => {
  await sortHackerNewsArticles();

})();
