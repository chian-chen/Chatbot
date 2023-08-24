import line from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import HandleAction from './Actions.js';
import Template from '../models/templateOne.js';


dotenv.config();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config);
const middleware = line.middleware(config);

const handleEvent = async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const datas = await Template.find({'prompt': event.message.text});
  console.log(datas);

  if(datas === undefined || datas === [] || typeof datas[0] !== 'object'){
    return client.replyMessage(event.replyToken, {
        'type': 'text',
        'text': '未設定的 prompt'
    });
  }

  let messages = [];
  let acts = [];

  for(let i = 1; i < 5; i++){
    const mes = datas[0][`mes${i}`];
    const act = datas[0][`act${i}`];

    if(mes !== ''){
      if(mes.startsWith('https') && (mes.endsWith('.jpg') || mes.endsWith('.png'))){
        messages.push({
          "type": "image",
          "originalContentUrl": mes,
          "previewImageUrl": mes
        });
      }
      else{
        messages.push({
          "type": "text", 
          "text": mes
        });
      }
    }
    if(act !== '')
      acts.push(act);
  }

  if(acts.length !== 0)
    messages.push(HandleAction(acts));

  // use reply API
  await new Promise(resolve => setTimeout(resolve, 1000));
  return client.replyMessage(event.replyToken, messages);
};


export {middleware, handleEvent};