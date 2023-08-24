import {Row, Col, Button} from 'antd';
import React from 'react';


const Bot = ({body, sendMessage, username})=>{

    return Array.isArray(body)? 
    (
        <Row style={{background: '#999999', borderRadius: '5px', }}>
            <Col align="center" span={24}>
                <p className="Action">Choose one to reply</p>
            </Col>
            {
              body.map( (act)=>(
                <Col align="center" span={12}>
                    <p className="Action">
                        <Button onClick={()=>sendMessage({name: username, body: act})} type="primary" block>
                            {act}
                        </Button>
                    </p>
                </Col>
              ))
            } 
        </Row>
    ) 
    : 
    (
        <Row>
              <Col align="left" span={24}>
                {(body.startsWith('https') && (body.endsWith('.jpg') || body.endsWith('.png')))? 
                (<img src={body} alt="img" width="50%" style={{margin: '5px', padding: '5px'}}/>)
                :
                (
                <p className="App-message" >{body} </p>
                )}
                
              </Col>
        </Row>
    );
};

export default Bot;