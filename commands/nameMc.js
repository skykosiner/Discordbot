const { nameMc } = require("../config.json");

module.exports = {
  name: "namemc-website",
  description: "name mc website",
  execute(message, args) {
    message.channel.send(`${nameMc}`);
  },
};
