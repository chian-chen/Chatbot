import { useState } from "react";



const url = new URL(window.location.href);
const client = new WebSocket(url.href.replace("http", "ws"));
// const client = new WebSocket('ws://localhost:4500');

client.onopen = ()=>{
  setInterval(()=>{client.send(JSON.stringify(['ping', true]));
                   console.log('ping');
  }, 10000);
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
    case "pong":{
        console.log('pong');
        break;
    }
      default: break;
    }
  };
  
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
