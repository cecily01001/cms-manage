import React, { useEffect, useState } from 'react'
import './style.less'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, message, Upload } from 'antd';
import api from '../../../api';
import logoDefault from '../../../assets/images/defaultAvater.png'

const Means = (props) => {
  const [username1, setUsername1] = useState("");
  const [password1, setPassword1] = useState("")
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("avatar") || {logoDefault});
 

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    // localStorage.setItem('avatar', info.file.response.data.filePath)
    if (info.file.status === 'uploading') {
      setLoading(true);
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        console.log(imageUrl)
        setLoading(false)
        setImageUrl(imageUrl)       
        // 存储图片名称
        localStorage.setItem('avatar', info.file.response.data.filePath)

      }
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // 表单提交的事件
  const onFinish = (values) => {
    // 如果表单的username有值，并且不等于初始化时拿到的username，同时密码非空
    if (values.username && values.username !== sessionStorage.getItem('username') && values.password.trim() !== "") {
      // 做表单的提交...
      api.changeUserData({
        username: values.username,
        password: values.password
      }).then(res => {
        console.log(res)
        // 当你修改成功的时候，不要忘了重新登录
      })
    }
  }

  useEffect(() => {
    api.getUserData().then(res => {
      console.log(res)
      if (res.errCode === 0) {
        message.success(res.message);
        setUsername1(res.data.username);
        setPassword1(res.data.Password);
      }
    })
  }, [])

  return (
    <div className='means'>
      <Form
        style={{ width: '400px' }}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}

        autoComplete="off"
      >
        <Form.Item
          label="修改用户名"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>提交</Button>
        </Form.Item>

      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        action="/api/upload"
        headers={{ "cms-token": localStorage.getItem('cms-token') }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}

export default Means