import line from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import FourActions from './FourActions.js';
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
    if(datas[0][`mes${i}`] !== '')
      messages.push({
        'type': 'text', 
        'text': datas[0][`mes${i}`]
      });
    if(datas[0][`act${i}`] !== '')
      acts.push(datas[0][`act${i}`]);
  }
  if(acts.length === 4)
    messages.push(FourActions(acts));
  
  // use reply API
  return client.replyMessage(event.replyToken, messages);
};


export {middleware, handleEvent};


// const replyText = (token, texts) => {
//   texts = Array.isArray(texts) ? texts : [texts];
//   return client.replyMessage(
//     token,
//     texts.map((text) => ({ type: 'text', text }))
//   );
// };