import styled from 'styled-components';
import { Input, message, FloatButton} from 'antd';
import { VerticalAlignBottomOutlined} from '@ant-design/icons';
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
    max-width: 600px;
    margin: 10px auto;
    padding: 20px;
    border-radius: 12px;
    background-color: #ffffff99;
    box-shadow: 0px 0px 16px rgb(199, 197, 197);
`;
const Messages = styled.div`
    width: 100%;
    height: 65%;
    color:aliceblue;
    /* background-color: #aaaaaa99; */
    border-radius: 10px;
    margin: 20px;
    padding: 10px;
    overflow: scroll;
`;


function App() {
    const { status, messages, sendMessage, clearMessages, username } = useChat();
    const [body, setBody] = useState('');
    const [visible, setVisible] = useState(true);
    const Body = useRef(null);


    const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg, duration: 1 }
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
    }, [status]);

    useEffect(() => {
      Body.current.scrollTo({ top: Body.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const handleScroll = (e) => {
      const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight;
      if (Math.abs(bottom) < 100) 
        setVisible(false);
      else
        setVisible(true);
    }

  return (
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
        enterButton="傳送"
        placeholder="在這裡和我說話..."
        onSearch={(msg) => {
        if (!msg || !username) {
            displayStatus({
                type: 'error',
                msg: '訊息欄空白，請輸入訊息！'
             });
            return; 
        }
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
                    opacity: visible? '0.5': '0',
            }}      
            onClick={()=>Body.current.scrollTo({ top: Body.current.scrollHeight, behavior: 'smooth' })} 
      />
    </Page>
  )
}

export default App
