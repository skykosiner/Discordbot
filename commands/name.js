const puppeteer = require("puppeteer");

module.exports = {
  name: "name",
  description: "Instagram Page",
  execute(message, args) {
    const checkAvailability = async (url) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const [name] = await page.$x(
        '//*[@id="status-bar"]/div/div/div[2]/div/div[1]/div[2]'
      );
      const availability = await name.getProperty("textContent");
      const availabilityText = await availability.jsonValue();

      if (availabilityText === "Available Later*") {
        const [when] = await page.$x(`//*[@id="availability-time"]`);
        const whenText = await when.getProperty("textContent");
        const whenRaw = await whenText.jsonValue();
        message.channel.send(
          `The name ${args} will be  available on ${whenRaw}`
        );
      } else {
        message.channel.send(
          `The name ${args} is currently ${availabilityText}`
        );
      }
      browser.close();
    };

    checkAvailability(`https://namemc.com/search?q=${args}`);
  },
};
