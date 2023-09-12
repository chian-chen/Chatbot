import {Button, Popconfirm} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';


const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Head = styled.h1`
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
    color: #999999;
`;

const Header = ({clearMessages})=>{
    return (
       <Title>
            <Head>
                未聞其名
            </Head>
            <Popconfirm
                title="清除所有訊息"
                description="此動作無法回復"
                onConfirm={clearMessages}
                okText="Yes"
                cancelText="No"
            >
                <Button type="primary" danger icon={<DeleteOutlined/>}/>
            </Popconfirm>
       </Title>
    );
};

export default Header;


