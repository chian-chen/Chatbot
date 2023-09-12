import {Row, Col} from 'antd';
import React from 'react';
import styled from 'styled-components';

const Mes = styled.p`
    background: #05374d99;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    width: max-content;
    /* font-size: 18px; */
`;

const User = ({body})=>{
    return (
        <Row>
              <Col align="right" span={24}>
                <Mes>
                    {body} 
                </Mes>
              </Col>
        </Row>
    );
};

export default User;


