import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import linebot from 'linebot';
import dotenv from 'dotenv-defaults';

dotenv.config();

var bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log("Get a message and Success!");
  }).catch(function (error) {
    console.log("Get a message and catch an error");
    console.log(error);
  });
});

bot.listen('/linewebhook', 80);

const app = express();
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);

const port = process.env.PORT || 80;

app.listen(port, ()=> console.log(`Listening on http://localhost:${port}`));