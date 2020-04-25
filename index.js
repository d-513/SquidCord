const Discord = require("./Discord");
exports.server = (serv) => {
  let syntax;
  const settings = serv.plugins.squidcord.settings;
  require("./thrower").checkConfig(settings, serv);
  Discord.login(settings.token);
  Discord.setGuild(settings.guild);
  Discord.setChannel(settings.channel);
  if ("discordMessageColor" in settings) {
    Discord.setDiscordMessageColor(settings.discordMessageColor);
  } else {
    Discord.setDiscordMessageColor("BLUE");
  }
  if (!("serverMessage" in settings)) {
    syntax = "§b[Discord] §7${message.author.tag}§f: §7${message.content}";
  } else if (
    settings.serverMessage.contains("{name}") == true ||
    settings.serverMessage.contains("{message}") == true
  ) {
    syntax = settings.serverMessage.replace("&", "§");
    syntax = syntax.replace("{name}", "${message.author.tag}");
    syntax = syntax.replace("{message}", "${message.content}");
  } else if (
    settings.serverMessage.contains("{name}") == false ||
    settings.serverMessage.contains("{message}") == false
  ) {
    syntax = "§b[Discord] §7${message.author.tag}§f: §7${message.content}";
    console.log(
      "[SquidCord] The serverMessage setting didn't have {name} or {message}!"
    );
    console.log(
      "[SquidCord] Include {name} and {message} in serverMessage or leave it null to default."
    );
  }
  Discord.setChatHandler((message) => {
    serv.broadcast(`${syntax}`);
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
