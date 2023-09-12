import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message, Row, Col, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import Page from './Page.mjs';
import List from './List.mjs';
import Modal from './Modal.mjs';
import Upload from './Upload.mjs';
import useData from './useData.mjs';
import { DeleteOutlined, PlusCircleOutlined, SearchOutlined  } from '@ant-design/icons';

const App = ()=>{
    const [password, setPassword] = useState('');

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const {status, tableDatas, saveData, saveMany, deleteData, deleteMany, isLogin, Login, deleteAll, saveAll} = useData();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [tableParams, setTableParams] = useState({pagination: {current: 1, pageSize: 10}});

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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

    const handleDelete = (prompt) => {
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
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,});
        setFilteredInfo(filters);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    // ======================================================================================
    // ====== Handle Search  ================================================================
    // ======================================================================================

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm({closeDropdown: false});
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

    const clsFilter = () => {
        let options = [];
        for(let i = 1; i < 6; i++){
            options.push({'text': ('1' + i),
                          'value': 10 + i});
        }
        for(let i = 1; i < 6; i++){
            options.push({'text': ('2' + i),
                          'value': 20 + i});
        }
        return options;
    };
    const columns = [
        {
            title: 'Class',
            dataIndex: 'cls',
            sorter: (a, b) => a['cls'] - b['cls'],
            filters: clsFilter(),
            filteredValue: filteredInfo.cls || null,
            onFilter: (value, record) => record.cls === value,
        },
        {
            title: 'Prompt',
            dataIndex: 'prompt',
            filteredValue: filteredInfo.prompt || null,
            ...getColumnSearchProps('prompt'),
        },
        {
            title: 'Delete',
            dataIndex: '',
            render: (_, record) => <Button icon={<DeleteOutlined />}  shape="circle" onClick={() => handleDelete(record.prompt)}/>,
        },
    ];

    
    return (
        isLogin? 
        (
        <Page>
          <Row style={{marginBottom: '5px'}}>
            <Col span={12} align="left">
                <Button disabled={!hasSelected} icon={<DeleteOutlined />} danger style={{display: hasSelected? 'block': 'none',}} onClick={handleDeleteMany}>
                    Delete all {selectedRowKeys.length} items
                </Button>
            </Col>
            <Col span={12} align="right">
                <Button icon={<PlusCircleOutlined />} onClick={handleAdd} />
            </Col>
          </Row>
          <Table 
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={tableDatas} 
          expandable={{
          expandedRowRender: (record) => (
                <List datas={record}/>
            ),
            rowExpandable: (record) => record.prompt !== '',
          }}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          />
          <Upload saveMany = {saveMany} saveAll={saveAll} deleteAll={deleteAll}/>
          <Modal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} saveData={saveData}/>
        </Page>
        )
        :
        (
        <Page>
            <Row>
                <Col span={12} offset={6}>
                <Input.Password
                placeholder="Enter your password"
                size="large"
                style={{ margin: 10}}
                onChange={(e) => setPassword(e.target.value)}
                />
                </Col>

                <Col span={12} offset={6}>
                <Button type="primary"
                        style={{ margin: 10}}
                        ghost
                        block
                        onClick={()=>Login(password)}
                    >Enter</Button>
                </Col>
            </Row>
        </Page>
        )
      );
};


export default App;


