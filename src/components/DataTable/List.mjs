import React from 'react';
import { List, Typography } from 'antd';


const App = (props) => {

    const titles = ['mes1', 'mes2', 'mes3', 'mes4',
                    'act1', 'act2', 'act3', 'act4',]
    
return (
    <List
      bordered
      dataSource={titles}
      renderItem={(title) => (
        <List.Item>
          <Typography.Text code>{title}</Typography.Text> {props.datas[title]}
        </List.Item>
      )}
    />
);
}

export default App;