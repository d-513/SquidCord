exports.checkConfig = (config, serv) => {
  if (typeof config !== "object") {
    return serv.emit("error", new Error("Discord config must be an object"));
  }
  if (!config.channel || !config.token || !config.guild) {
    return serv.emit(
      "error",
      new Error("Channel, token or guild is undefined")
    );
  }
};
