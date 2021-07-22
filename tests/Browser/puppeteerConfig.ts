export const puppeteerConfig = {
  product: 'firefox',
  headless: true,
  devtools: false,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-web-security',
  ],
};
