import React, { useEffect, useState } from 'react'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useLocation, withRouter} from 'react-router-dom'
const Aside = (props) => {
    //只要刷新页面那就直接使用
    const location=useLocation()
    const [defaultKey, setDefaultKey] = useState('')

    useEffect(()=>{
        let path=location.pathname
        let key=path.split('/')[1]
        setDefaultKey(key)
    },[location.pathname])
    const handleClick = e => {
        props.history.push('/'+e.key)
        setDefaultKey(e.key)
      };
    return (
        <Menu
        onClick={handleClick}
        style={{ width: 180 }}
        mode="inline"
        theme="light" // 黑色主题
        className='aside'
        selectedKeys={[defaultKey]}//默认的跳转页面
    >
      <Menu.Item key="listlist"><ReadOutlined /> 查看文章列表List</Menu.Item>
            <Menu.Item key="listtable"><ReadOutlined /> 查看文章列表Table</Menu.Item>
      <Menu.Item key="edit"><EditOutlined /> 文章编辑</Menu.Item>
      <Menu.Item key="means"><DatabaseOutlined /> 修改资料</Menu.Item>
      </Menu>
    );
}

export default withRouter(Aside)