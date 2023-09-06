import React from 'react';
import DataTable from '../DataTable/index.mjs';
import ChatRoom from '../ChatRoom/index.mjs'
import {ConfigProvider} from 'antd';
// import { CommentOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import { createBrowserRouter,
         RouterProvider
} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatRoom/>,
    errorElement: <ChatRoom />,
  },
  {
    path: "Data",
    element: <DataTable/>
  }
]);


const Theme = {
  "token": {
    "fontSize": 18,
    "borderRadius": 12,
    "colorBgBase": "#f7f2e7",
    "colorTextBase": "#010101",
    "sizeStep": 4,
    "sizeUnit": 4,
    "colorPrimary": "#567096",
    "colorInfo": "#567096"
  },
  "components": {
    "Button": {
      "algorithm": true,
      "colorText": "rgba(0, 0, 0, 0.45)"
    },
  }
};

function App() {
  return (
    <ConfigProvider 
    theme={Theme}>
      <RouterProvider router={router} />
      {/* <FloatButton.Group
        type='primary'
        trigger="click"
        style={{
          right: '8',
        }}
        icon={<SettingOutlined />}
      >
        <FloatButton icon={<DatabaseOutlined />} href='Data'/>
        <FloatButton icon={<CommentOutlined />} href='/'/>
      </FloatButton.Group> */}

    </ConfigProvider>
  );
}

export default App;
