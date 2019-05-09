const Discord = require('discord.js');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();

const TOKEN = process.env.TOKEN;
const PORT = 3000;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong!');
  }
});

client.login(TOKEN);

client.on('guildCreate', guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop:
  for (let c of channels) {
      let channelType = c[1].type;
      if (channelType === "text") {
          channelID = c[0];
          break channelLoop;
      }
  }

  let channel = client.channels.get(guild.systemChannelID || channelID);
  channel.send(`Hello world!`);
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(PORT);