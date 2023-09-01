import styled from 'styled-components';
import {ConfigProvider, Input, message, theme, FloatButton} from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import {useState, useEffect, useRef} from 'react';
import useChat from './useChat.mjs';
import User from './User.mjs';
import Bot from './Bot.mjs';
import Header from './Header.mjs';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    width: 75%;
    max-width: 500px;
    margin: auto;
    padding: 40px;
`;
const Messages = styled.div`
    width: 100%;
    height: 65%;
    color:aliceblue;
    background: #666666;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: scroll;
`;


function App() {
    const { darkAlgorithm } = theme;
    const { status, messages, sendMessage, clearMessages, username } = useChat();
    const [body, setBody] = useState('');
    const [visible, setVisible] = useState(true);
    const Body = useRef(null);


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

    useEffect(() => {
      displayStatus(status);
      Body.current.scrollTo({ top: Body.current.scrollHeight, behavior: 'smooth' });
    }, [status]);

    const handleScroll = (e) => {
      const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight;
      if (Math.abs(bottom) < 100) 
        setVisible(false);
      else
        setVisible(true);
    }

  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm}}>
    <Page>
      <Header clearMessages={clearMessages}/>
      <Messages onScroll={handleScroll} ref={Body}>
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            messages.map(({bot, body}, i)=> bot? 
            (<Bot body={body} key={i} username={username} sendMessage={sendMessage}/>)
            :
            (<User body={body} key={i}/>))
        )
        }
      </Messages>
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
        sendMessage({ 'name': username, 'body': msg });
        setBody('');
        }}
      />
      <FloatButton
            shape="circle"
            icon={<VerticalAlignBottomOutlined/>}
            style={{
                    position: 'relative',
                    right: '0',
                    opacity: visible? '0.5': '0'
            }}      
            onClick={()=>{Body.current.scrollTo({ top: Body.current.scrollHeight, behavior: 'smooth' });
                          console.log(username);}} 
      />
    </Page>
    </ConfigProvider>
  )
}

export default App
