# SquidCord

A [flying-squid](https://github.com/PrismarineJS/flying-squid) plugin to connect discord with your minecraft server

## Installation

Install with npm: `npm i squidcord`  
Then add it to your flying-squid config:

```json
"plugins": {
    "squidcord": {
      "channel": "CHANNEL-ID",
      "token": "DISCORD-BOT-TOKEN",
      "guild": "GUILD-ID"
    }
}
```

`channel` - the id of the discord channel.

`guild` - the id of the discord server.

`token` - bot token from https://discordapp.com/developers/applications

Problems with setting up the bot? https://www.writebots.com/discord-bot-token/  
Problems with getting the id's? https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-
