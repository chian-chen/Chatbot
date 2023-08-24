import { useState } from "react";

const client = new WebSocket('ws://localhost:4000');

client.onopen = () => {
  console.log('open connection')
}

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);    
    switch (task) {
      case "output": {
        setMessages(()=>payload);
        break;
    }
      case "status": {
        setStatus(payload); break;
    }
      case "init": {
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
    sendData(["clear"]);
  };

  return { status, 
           messages, 
           sendMessage, 
           clearMessages };
};

export default useChat;
