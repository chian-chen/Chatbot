import linebot from 'linebot';
import dotenv from 'dotenv-defaults';

dotenv.config();

const bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});
  
  
bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log("success!");
  }).catch(function (error) {
    console.log("Error!");
  });
});

export default bot;