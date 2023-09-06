import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import styled from 'styled-components';

const App = ({ isModalVisible, setIsModalVisible, saveData })=> {

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <Modal
          title="Create a new data"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null} 
          width={600}
          >
          <MyForm saveData={saveData} setIsModalVisible={setIsModalVisible}/>
        </Modal>
    );
};


const MyForm = ({saveData, setIsModalVisible}) => {
  const [form] = Form.useForm();
  const datas = ['prompt', 'class', 'mes1', 'mes2', 'mes3', 'mes4', 'act1', 'act2', 'act3', 'act4'];
  const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

  const onFinish = (values) => {
    saveData(values);
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <StyledForm
    {...formLayout}
    form={form}
    layout="horizontal"
    onFinish={onFinish}
    >
      {datas.map((data)=> (
      <Form.Item label={data} name={data === 'class'? 'cls': data} key={data} rules={ data === 'prompt'? [
        {
          required: true,
          message: `Please input ${data}!`,
        }
        ]: ''}>
        <Input placeholder={`input ${data}`}/>
      </Form.Item>))}
      <Form.Item wrapperCol={{ align:'right' }}>
        <Button htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
    margin: 10px;
  }
`;

export default App;