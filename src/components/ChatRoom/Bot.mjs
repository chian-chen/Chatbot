import {Row, Col, Button, Avatar} from 'antd';
import React from 'react';
import styled from 'styled-components';


const Mes = styled.p`
    background: #888888;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    width: max-content;
    max-width: 70%;
    font-size: 18px;
`;

const Act = styled.p`
    background: #888888;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    font-size: 18px;
`;

const Bot = ({body, sendMessage, username})=>{
    return Array.isArray(body)? 
    (
        <Row style={{background: '#999999', borderRadius: '5px', }}>
            <Col align="center" span={24} >
                <Act>Choose one to reply</Act>
            </Col>
            {
              body.map( (act)=>(
                <Col align="center" span={ body.length%2 === 0? 12:24}>
                    <Act>
                        <Button onClick={()=>sendMessage({name: username, body: act})} type="primary" block>
                            {act}
                        </Button>
                    </Act>
                </Col>
              ))
            } 
        </Row>
    ) 
    : 
    (
        <Row>
              <Col align="left" span={2}>
                <Avatar src="https://i.imgur.com/kkBGMFh.png" size='large'/>
              </Col>
              <Col align="left" span={22}>
                {(body.startsWith('https') && (body.endsWith('.jpg') || body.endsWith('.png')))? 
                (
                    <img src={body} alt="img" width="50%" style={{margin: '5px', padding: '5px'}}/>
                )
                :
                (
                    <Mes dangerouslySetInnerHTML={ {__html: body} }/>
                )}
                
              </Col>
        </Row>
    );
};

export default Bot;