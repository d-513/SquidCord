const Discord = require("discord.js");
const client = new Discord.Client();
const minotar = (user) => `https://minotar.net/avatar/${user}`;

let channel;
let guild;
let discordSyntaxColor;
exports.setGuild = (newGuild) => {
  guild = newGuild;
};
exports.setChannel = (newChannel) => {
  channel = newChannel;
};
exports.setDiscordMessageColor = (newColor) => {
  discordSyntaxColor = newColor;
};
exports.login = (token) => client.login(token);
exports.client = client;
exports.broadcast = ({ message }, player) => {
  const g = client.guilds.cache.get(guild);
  const c = g.channels.cache.get(channel);
  const embed = new Discord.MessageEmbed()
    .setAuthor(player.username, minotar(player.username))
    .setColor(discordSyntaxColor)
    .setDescription(message);
  c.send(embed);
};
exports.setChatHandler = (cb) => {
  client.on("message", (message) => {
    if (message.channel.id === channel && !message.author.bot) {
      cb(message);
    }
  });
};
exports.playerJoined = (player) => {
  const g = client.guilds.cache.get(guild);
  const c = g.channels.cache.get(channel);
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `${player.username} has joined the server!`,
      minotar(player.username)
    )
    .setColor("GREEN");
  c.send(embed);
};
exports.playerLeft = (player) => {
  const g = client.guilds.cache.get(guild);
  const c = g.channels.cache.get(channel);
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `${player.username} has left the server.`,
      minotar(player.username)
    )
    .setColor("RED");
  c.send(embed);
};
