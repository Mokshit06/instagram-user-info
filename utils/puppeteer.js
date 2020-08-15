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

  const data = await page.evaluate(async username => {
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
    const posts = document.querySelectorAll('.v1Nh3.kIKUG._bz0w a');
    const postImages = [...posts].map(post => ({
      link: post.href,
      image: post.firstElementChild.firstElementChild.firstElementChild.src,
    }));
    const isPrivate = document.querySelector('._4Kbb_._54f4m') ? true : false;

    return {
      name,
      username,
      profile_image,
      bio,
      bio_html,
      followers,
      following,
      website,
      isPrivate,
      posts: postImages,
    };
  }, username);

  await browser.close();

  return data;
};

module.exports = getData;
