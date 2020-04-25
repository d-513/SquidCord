const Discord = require("./Discord");
exports.server = (serv) => {
  const settings = serv.plugins.squidcord.settings;
  require("./thrower").checkConfig(settings, serv);
  Discord.login(settings.token);
  Discord.setGuild(settings.guild);
  Discord.setChannel(settings.channel);
  if (!settings.messageColor) settings.messageColor = "BLUE";
  if (!settings.serverMessage)
    settings.serverMessage = "§b[Discord] §7{name}§f: §7{message}";
  let syntax = settings.serverMessage.replace("&", "§");
  Discord.setMessageColor(settings.messageColor);
  Discord.setChatHandler((message) => {
    let msg;
    msg = syntax.replace("{name}", message.author.tag);
    msg = msg.replace("{message}", message.content);
    serv.log(`[discord]: ${message.author.tag}: ${message.content}`);
    serv.broadcast(msg);
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
