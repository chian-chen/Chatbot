import {Row, Col} from 'antd';
import React from 'react';




const User = ({body})=>{

    return (
        <Row>
              <Col align="right" span={24}>
                <p className="App-message">
                    {body} 
                </p>
              </Col>
        </Row>
    );
};

export default User;