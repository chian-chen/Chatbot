import {Button, Popconfirm} from 'antd';
import React from 'react';
import styled from 'styled-components';



const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Head = styled.h1`
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
    color:aliceblue;
`;

const Header = ({clearMessages})=>{
    return (
       <Title>
            <Head>
                ChatBot
            </Head>
            <Popconfirm
                title="Clear all messages"
                description="The action can not be undone"
                onConfirm={clearMessages}
                okText="Yes"
                cancelText="No"
            >
                <Button type="primary" danger>
                    Clear
                </Button>
            </Popconfirm>
       </Title>
    );
};

export default Header;


