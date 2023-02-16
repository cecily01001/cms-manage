import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import moment from 'moment'
import E from 'wangeditor'
import api from '../../../api';
import { useParams, withRouter, useLocation } from 'react-router-dom'

let editor = null
const Edit = (props) => {
  const [content, setContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [form] = Form.useForm();
  const params = useParams()
  const location=useLocation()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // setIsModalVisible(false);
    form
      .validateFields()
      .then(values => {
        let { title, subTitle } = values

        if (params.id) {
          api.updateArticle({ title, subTitle, content }).then(res => {
            if (res.errCode === 0) {
              message.success(res.message)
              console.log(res)
              props.history.push('/listlist')
            }
            else {
              message.error(res.message)
            }
            setIsModalVisible(false)
          })
        } else {
          // 添加文章的请求
          api.addArticle({ title, subTitle, content }).then(res => {
            console.log(res)
            props.history.push('/listlist')
          })
          setIsModalVisible(false)
        }

      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    //实例化
    editor = new E('#myeditor');
    //书写editor的onChange函数
    editor.config.onchange = (newHtml) => {
      // SVGTextContentElement(newHtml)
      setContent(newHtml)
    }

    editor.config.placeholder = ''
    if (params.id) {
      api.searchArticle({
        id: params.id
      }).then(res => {
        if (res.errCode === 0) {
          let { title, subTitle } = res.data
          editor.txt.html(res.data.content)
          setSubTitle(res.data.subTitle)
          setTitle(res.data.title)
        }
      })
    }

    //创建
    editor.create()

    return () => {
      editor.destroy()
    }
  }, [location.pathname])

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={
          <Button key="1" type="primary" onClick={showModal}>
            提交文章
          </Button>}
      >
      </PageHeader>
      <div id="myeditor" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
      {/* 设置提交后弹出的对话框 */}
      <Modal zIndex={99999} title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
          form={form}
          initialValues={{ title: title, subTitle: subTitle }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请填写标题!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subTitle"
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>

    </div>
  )
}

export default withRouter(Edit)