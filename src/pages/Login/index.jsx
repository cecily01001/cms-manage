import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import './style.less'
import logoImg from '../../assets/images/logo.png'
import '../../assets/base.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link,withRouter } from 'react-router-dom';
import api from '../../api';

const Login = (props) => {
    const onFinish = (values) => {
        api.login({
            username: values.username,
            password: values.password
        }).then(res => {
            if (res.errCode === 0) {
                message.success(res.message)
                // 存储数据
                localStorage.setItem('avatar', res.data.avatar)
                localStorage.setItem('cms-token', res.data['cms-token'])
                localStorage.setItem('editable', res.data.editable)
                localStorage.setItem('player', res.data.player)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('password',values.password)
                // 跳转到根路径
                setTimeout(()=>{
                  props.history.push('/')
                }, 1500)
            } else {
                message.error(res.message)
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
                        <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="new-password" placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">还没账号？立即注册</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size='large'>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
}

export default withRouter(Login)