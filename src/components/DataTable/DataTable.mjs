import React, { useState, useEffect } from 'react';
import { Table, ConfigProvider, theme, Button, message, Row, Col } from 'antd';
import Page from './Page.mjs';
import List from './List.mjs';
import Modal from './Modal.mjs';
import Upload from './Upload.mjs';
import useData from './useData.mjs';
import { DeleteOutlined, PlusCircleOutlined  } from '@ant-design/icons';


const App = ()=>{
    const {darkAlgorithm} = theme;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const {status, tableDatas, saveData, saveMany, deleteData, deleteMany} = useData();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if(status.msg){
            const { type, msg } = status;
            const content = { content: msg, duration: 2 };
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                    message.error(content);
                    break;
                default:
                    break;
            }
        }
    }, [status]);


    const columns = [
        {
            title: 'Class',
            dataIndex: 'cls',
            sorter: (a, b) => a['cls'] - b['cls'],
            filter: []
        },
        {
            title: 'Prompt',
            dataIndex: 'prompt',
        },
        {
            title: 'Delete',
            dataIndex: '',
            render: (_, record) => <Button icon={<DeleteOutlined />}  shape="circle" onClick={() => handleDelete(record.prompt)}/>,
        },
    ];


    const handleDelete = (prompt) => {
        console.log(prompt);
        deleteData(prompt);
    };
    const handleDeleteMany = () => {
        console.log(selectedRowKeys);
        const deleteDatas = tableDatas.filter((data) => selectedRowKeys.includes(data['key']));
        const deleteArray = deleteDatas.map((data) => data['prompt']);
        deleteMany(deleteArray);
        setSelectedRowKeys([]);
    }
    const handleAdd = () => {
        console.log(isModalVisible);
        setIsModalVisible(true);
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <Page>
        <ConfigProvider theme={{algorithm: darkAlgorithm}}>

          <Row>
            <Col span={12} align="left">
                <Button disabled={!hasSelected} icon={<DeleteOutlined />} danger style={{display: hasSelected? 'block': 'none',}} onClick={handleDeleteMany}>
                    Delete all {selectedRowKeys.length} items
                </Button>
            </Col>
            <Col span={12} align="right">
                <Button icon={<PlusCircleOutlined />} onClick={handleAdd} />
            </Col>
          </Row>
          <Table rowSelection={rowSelection} columns={columns} dataSource={tableDatas} 
          expandable={{
          expandedRowRender: (record) => (
            // <Card datas={record}/>
                <List datas={record}/>
            ),
            rowExpandable: (record) => record.prompt !== 'No Data',
          }}/>
          <Upload saveMany = {saveMany}/>
          <Modal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} saveData={saveData}/>
        </ConfigProvider>
        </Page>
      );
};


export default App;


