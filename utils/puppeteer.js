const puppeteer = require('puppeteer');

const getData = async username => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(`https://instagram.com/${username}`);

  await page.waitForSelector('img', {
    visible: true,
  });

  const data = await page.evaluate(() => {
    const profile_image = (
      document.querySelector('._6q-tv') || document.querySelector('.be6sR')
    ).src;
    const name = document.querySelector('.-vDIg .rhpdm').textContent;
    const bio = document.querySelector('.-vDIg span').innerText || null;
    const bio_html = document.querySelector('.-vDIg span').innerHTML || null;
    const website =
      document.querySelector('.yLUwa') &&
      document.querySelector('.yLUwa').textContent;
    const followers = document.querySelectorAll('.g47SY')[1].textContent;
    const following = document.querySelectorAll('.g47SY')[2].textContent;

    return {
      name,
      profile_image,
      bio,
      bio_html,
      followers,
      following,
      website,
    };
  });

  await browser.close();

  return { username, ...data };
};

module.exports = getData;
