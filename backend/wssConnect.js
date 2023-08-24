import Template from "./models/templateOne.js";
import Message from "./models/message.js";

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
}

const initData = async (ws) => {
  Template.find().sort({ created_at: -1 })
    .then((res) => {
      sendData(['init-data', res], ws);
    }).catch((e)=>{
        console.log(e);
    })}

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
}

const initMess = (ws) => {
  Message.find().sort({ created_at: -1 }).limit(100).
  then(res => sendData(['init-mess', res], ws)).
  catch(e=>console.log(e));
}

export {sendData, initData, sendStatus, initMess};
