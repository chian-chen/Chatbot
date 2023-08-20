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
import {sendData, initData} from './backend/wssConnect.js';
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

db.once('open', () => {
  wss.on('connection', (ws) => {
      initData(ws);
      ws.onmessage = async (byteString) => {
          const {data} = byteString;
          const [task, payload] = JSON.parse(data);

          switch(task) {
              case 'Save-Data': {
                  const {prompt, key, cls, mes1, mes2, mes3, mes4, act1, act2, act3, act4} = payload;
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
                      await Template.deleteOne({prompt: payload[i]}).catch((e)=>console.log(e));
                  broadcast({
                    type: 'success',
                    msg: `Delete ${payload.length} datas!"`
                  });
                  break;
              }
              case 'Message-In': {
                
                break;
              }
              default: break;
          };
      };
  });
  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});
});