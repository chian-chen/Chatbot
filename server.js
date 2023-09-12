import { WebSocketServer } from 'ws';
import express from 'express';
import http from 'http';
// import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import db from './backend/mongo.js';
import Template from './backend/models/templateOne.js';
import Message from './backend/models/message.js';
import {sendData, initData, sendStatus, initMess} from './backend/wssConnect.js';
import {middleware, handleEvent} from './backend/line/line.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 4000;


const app = express();
app.use(cors());

//line bot
app.post('/linebot', middleware, (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


const server = http.createServer(app);
const wss = new WebSocketServer({ server });


const broadcast = (status) => {
    Template.find().sort({ created_at: -1 })
    .then((datas)=>{
      wss.clients.forEach((client)=>{
        sendData(['After-Operation', datas], client);
        sendData(['Update-Status', status], client);
      });
    }).catch((e)=>console.log(e));
};

const broadcastMessage = (data, status, client) => {
    sendData(data, client);
    sendStatus(status, client);
};

db.once('open', () => {
  wss.on('connection', (ws) => {
      initData(ws);
      initMess(ws);
      ws.onmessage = async (byteString) => {
          const {data} = byteString;
          const [task, payload] = JSON.parse(data);

          switch(task) {
              case 'Save-Data': {
                  const {prompt, key, cls, mes1, mes2, mes3, mes4, act1, act2, act3, act4} = payload;
                  await Template.findOneAndDelete({'prompt': prompt});
                  const template = new Template({ prompt, key, cls, mes1, mes2, mes3, mes4, act1, act2, act3, act4 });
                  await template.save().catch((e)=> console.log(e));
                  broadcast({
                     type: 'success',
                     msg: `Save data, "Prompt: ${prompt}!"`
                  });
                  break;
              }
              case 'Save-Many': {
                  const {name, datas} = payload;
                  for(let i = 0; i < datas.length; i++){
                    const {prompt, key, cls, mes1, mes2, mes3, mes4, act1, act2, act3, act4} = datas[i];
                    await Template.findOneAndDelete({'prompt': prompt});
                    const template = new Template({ prompt, key, cls, mes1, mes2, mes3, mes4, act1, act2, act3, act4 });
                    await template.save().catch((e)=> console.log(e));
                  }
                  broadcast({
                    type: 'success',
                    msg: `Save many data, "Filename: ${name}!"`
                 });
                  break;
              }
              case 'Delete-Data': {
                  await Template.deleteOne({prompt: payload}).catch((e)=>console.log(e));
                  broadcast({
                    type: 'success',
                    msg: `Delete data, "Prompt: ${payload}!"`
                  });
                  break;
              }
              case 'Delete-Many': {
                  for(let i = 0; i < payload.length; i++)
                      await Template.deleteOne({prompt: payload[i]}).catch((e)=>broadcast({
                        type: 'error',
                        msg: e
                      }));
                  broadcast({
                    type: 'success',
                    msg: `Delete ${payload.length} datas!"`
                  });
                  break;
              }
              case 'Delete-All':{
                  await Template.deleteMany({}).catch((e)=>console.log(e));
                  broadcast({
                    type: 'success',
                    msg: `Delete all data!"`
                  });
                  break;
              }
              case 'Login':{
                  if(payload === process.env.PASSWORD){
                      sendData(['Login', true], ws);
                      sendData(['Update-Status', {
                        type: 'success',
                        msg: 'Login succeed!'
                      }], ws);
                  }
                  else{
                      sendData(['Login', false], ws);
                      sendData(['Update-Status', {
                        type: 'error',
                        msg: 'Wrong Password!'
                      }], ws);
                  }
                  break;
              }
              case 'input': {
                    const { name, body } = payload;
                    const message = new Message({ 'name': name, 'bot': false, 'body':body });
                    await message.save().catch((e)=>Error("Message DB save error: " + e));
                    const datas = await Template.find({prompt: body});
                    
                    if(datas === undefined || datas === [] || typeof datas[0] !== 'object'){
                        const response = new Message({ 'name': name, 'bot': true, 'body': '不要問我我不會的問題啦～' });
                        await response.save().catch((e)=>Error("Message DB save error: " + e));
                    }
                    else{
                        let acts = [];
                        for(let i = 1; i < 5; i++){
                            if(datas[0][`mes${i}`] !== ''){
                                const response = new Message({ 'name': name, 'bot': true, 'body': datas[0][`mes${i}`] });
                                await response.save().catch((e)=>Error("Message DB save error: " + e));
                            }
                            if(datas[0][`act${i}`] !== '')
                                acts.push(datas[0][`act${i}`]);
                        }
                        if(acts.length !== 0){
                            const response = new Message({ 'name': name, 'bot': true, 'body': acts });
                            await response.save().catch((e)=>Error("Message DB save error: " + e));
                        }
                    }
                    const messages = await Message.find({'name': name}).sort({ created_at: -1 }).
                        catch(e=>console.log(e));
                    broadcastMessage(['output', messages],{
                        type: 'success',
                        msg: '訊息傳送成功！'
                    }, ws);
                    break;
                }
              case 'clear': {
                  const name = payload;
                  await Message.deleteMany({'name': name});
                  broadcastMessage(['cleared'],{
                      type: 'info',
                      msg: '已刪除聊天室訊息！'
                  }, ws);
                  break;
               }
              case 'ping':{
                  sendData(['pong', true], ws);
               }
              default: break;
          };
      };
  });

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  });
});