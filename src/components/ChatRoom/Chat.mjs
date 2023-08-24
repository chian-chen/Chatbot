import './Chat.css';
import {ConfigProvider, Button, Input, message, theme} from 'antd';
import {useState, useEffect, useRef} from 'react';
import useChat from './useChat.mjs';
import { DesktopOutlined  } from '@ant-design/icons';
import User from './User.mjs';
import Bot from './Bot.mjs';


function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(true);

    const { status, messages, sendMessage, clearMessages } = useChat();
    const username = 'UniqueName';
    const [body, setBody] = useState('');
    const Btm = useRef(null);

    const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
        default:
          message.error(content);
          break;
  }}};
  
    const changeMode = ()=>{
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
      displayStatus(status);
      Btm.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [status]);


  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
     }}>
      
    <div className="App">
    <Button type="primary" shape="circle" icon={<DesktopOutlined />} onClick={changeMode}/>
      <div className="App-title">
        <h1>ChatBot</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            messages.map(({name, body}, i)=> name === 'bot'? 
            (<Bot body={body} key={i} username={username} sendMessage={sendMessage}/>)
            :
            (<User body={body} key={i}/>))
        )
        }
        <div ref={Btm} />
      </div>
      <Input.Search
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
        if (!msg || !username) {
            displayStatus({
                type: 'error',
                msg: 'Please enter a message body.'
             });
        return; }
        sendMessage({ name: username, body: msg });
        setBody('');
        }}
      />
    </div>
    </ConfigProvider>
  )
}

export default App
