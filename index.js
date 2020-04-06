const Discord = require("./Discord");
exports.server = (serv) => {
  const settings = serv.plugins.SquidCord.settings;
  require("./thrower").checkConfig(settings, serv);
  Discord.login(settings.token);
  Discord.setGuild(settings.guild);
  Discord.setChannel(settings.channel);
  Discord.setChatHandler((message) => {
    serv.broadcast(
      `§b[Discord] §7${message.author.tag}§f: §7${message.content}`
    );
  });
};
exports.player = (player, serv) => {
  player.on("chat", (message) => {
    Discord.broadcast(message, player);
  });
  player.on("connected", () => Discord.playerJoined(player));
  player.on("disconnected", () => Discord.playerLeft(player));
};
