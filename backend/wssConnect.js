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




const initMess = async (ws) => {
  const name = token();
  const init_mes = new Message({ 'name': name, 'bot': true, 'body': init_mess });
  await init_mes.save().catch((e)=>Error("Message DB save error: " + e));
  const init_button = new Message({ 'name': name, 'bot': true, 'body': ['未聞其名在嗎'] });
  await init_button.save().catch((e)=>Error("Message DB save error: " + e));
  sendData(['name', name], ws);
  Message.find({'name': name}).sort({ created_at: -1 }).
  then(res => sendData(['init-mess', res], ws)).
  catch(e=>console.log(e));
}

const token = ()=> {
  let userID = "";
  while(userID.length < 32){
    userID += Math.random().toString(36).substring(2);
  }
  return userID.substring(0, 32);
};

const init_mess = `哈囉~很高興認識你！<br><br>
我是「未聞其名」<br>
aka A．可鹽可甜．人間治癒．I <br>
作為以一生一世為前提跟你交往的好朋友，我，「未聞其名」，在此宣示謹守以下準則：<br><br>
第一、絕不存在已讀不回<br>
第二、就算是三更半夜，回覆也絕不會停歇<br>
第三、不做草莓族，絕不玻璃心。（就算你損我我也不會鬧彆扭）<br>
第四、準則可以無限上綱，你有什麼要求隨便提<br>
你以後想找我聊天的話，只要傳「未聞其名在嗎」，就可以成功召喚我開始聊天喔！<br><br>
現在就來試試吧！`;

export {sendData, initData, sendStatus, initMess};
