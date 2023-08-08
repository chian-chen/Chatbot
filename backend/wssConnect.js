import Template from "./models/templateOne.js";

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
}

const initData = async (ws) => {
  Template.find().sort({ created_at: -1 }).limit(100)
    .then((res) => {
      sendData(['init', res], ws);
    }).catch((e)=>{
        console.log(e);
    })}


export {sendData, initData};
