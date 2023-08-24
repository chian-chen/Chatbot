import React from 'react';
import DataTable from '../DataTable/index.mjs';
import ChatRoom from '../ChatRoom/index.mjs'
import {ConfigProvider, FloatButton} from 'antd';
import { CommentOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import { createBrowserRouter,
         RouterProvider
} from 'react-router-dom';

// <MessageOutlined />
// <SettingOutlined />
// <SearchOutlined />

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

const CustomerTheme = {
  token: {
    colorPrimary: '#2E62A6',
    borderRadius: 6,
  },
  components: {
    Button: {
      colorPrimary: '#2E7AA6',
      algorithm: true,
    },
  },
};


function App() {
  return (
    <ConfigProvider 
    theme={CustomerTheme}>
      <RouterProvider router={router} />
      <FloatButton.Group
        type='primary'
        trigger="click"
        style={{
          right: '8',
        }}
        icon={<SettingOutlined />}
      >
        <FloatButton icon={<DatabaseOutlined />} href='Data'/>
        <FloatButton icon={<CommentOutlined />} href='/'/>
      </FloatButton.Group>

    </ConfigProvider>
  );
}

export default App;
