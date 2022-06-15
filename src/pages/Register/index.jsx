import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import './style.less'
import logoImg from '../../assets/images/logo.png'
import '../../assets/base.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import api from '../../api';
const Register = (props) => {
  const onFinish = (values) => {
    api.register({
      username:values.username,
      password:values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        setTimeout(()=>props.history.push('/login'),1500)
      }else{
        message.error(res.message);
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login'>
      <div className='login_box'>
        <img src={logoImg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请再次输入密码' />
          </Form.Item>
          <Form.Item>
            <Link to="/login">已有账号？立即登录</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
}

export default withRouter(Register)