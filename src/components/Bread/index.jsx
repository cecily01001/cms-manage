import React, { useEffect, useState } from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const Bread = () => {
    const [breadName,setBreadName]=useState('')
    const {pathname}=useLocation()
    useEffect(()=>{
        switch (pathname) {
            case "/listlist":
                setBreadName('查看文章列表List');
                break;
            case "/listtable":
                setBreadName('查看文章列表Table');
                break;
            case "/edit":
                setBreadName('文章编辑');
                break;
            case "/means":
                setBreadName('修改资料');
                break;
            default:
                break;
        }
    },[pathname])

    return (
        <Breadcrumb>
            <Breadcrumb.Item style={{height: '30px', lineHeight: '30px'}}>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Bread