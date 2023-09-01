import { useState } from "react";

const url = new URL(window.location.href);
const client = new WebSocket(url.href.replace("http", "ws"));
// const client = new WebSocket('ws://localhost:4500');

client.onopen = () => {
  console.log('open connection');
};

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
    sendData(["input", payload]);
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
