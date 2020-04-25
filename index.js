const Discord = require("./Discord");
exports.server = (serv) => {
  console.log(serv._server.maxPlayers);
  const settings = serv.plugins.squidcord.settings;
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
  player.on("connected", () =>
    Discord.playerJoined(player, {
      online: serv._server.playerCount,
      max: serv._server.maxPlayers,
    })
  );
  player.on("disconnected", () =>
    Discord.playerLeft(player, {
      online: serv._server.playerCount,
      max: serv._server.maxPlayers,
    })
  );
};
