import { useState } from "react";

const reConnection = ()=>{
  let client = new WebSocket(url.href.replace("http", "ws"));
  //const client = new WebSocket('ws://localhost:4500');

  client.onopen = () => {
    console.log('open connection!');
  };
  
  client.onclose = () =>{
    console.log('connection close qq!');
    setTimeout(()=>{
      client = reConnection();
    }, 1000);
  };
  
  client.onerror = (err)=> {
    console.log('connection error qq!');
    if (err.code === 'ECONNREFUSED') {
      client = reConnection();
    }
  };

  return client;
};

const url = new URL(window.location.href);
let client = reConnection();
// let client = new WebSocket('ws://localhost:4500');

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const [username, setUsername] = useState('');


  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);    
    switch (task) {
      case "name": {
        setUsername(payload);
        break;
    }
      case "output": {
        setMessages(()=>payload);
        break;
    }
      case "status": {
        setStatus(payload); 
        break;
    }
      case "init-mess": {
        setMessages(() => payload);
        break;
    }
    case "cleared": {
        setMessages([]);
        break;
    }
      default: break;
    }
  }
  
  const sendData = (data) => {
    console.log(client.CLOSED)
    client.send(
    JSON.stringify(data));
  };

  const sendMessage = (payload) => {
    setMessages([...messages, {'user': '', 'bot': true, 'body': 'Loading...'}]);
    const timer = setTimeout(() => {
      sendData(["input", payload]);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const clearMessages = () => {
    sendData(["clear", username]);
  };
  
  return { status, 
           messages, 
           sendMessage, 
           clearMessages,
           username };
};

export default useChat;
