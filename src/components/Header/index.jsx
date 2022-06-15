import React, { useEffect, useState } from 'react'
import logopng from '../../assets/images/col_logo.png'
import './style.less'
import { Menu, Dropdown, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import defaultAvater from '../../assets/images/defaultAvater.png'
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {
    const logout = () => {
        message.success('退出成功，即将返回登录页面')
        localStorage.clear()
        setTimeout(() => {
            props.history.push('/login')
        }, 1500)
    }
    const menu = (
        <Menu>
            <Menu.Item key={1}>
                修改资料
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2}>
                <Link to="/login" onClick={logout} >退出登录</Link>
            </Menu.Item>

        </Menu>
    );
    
    const [avater, setAvater] = useState(defaultAvater)
    const [username, setUsername] = useState('游客')

    useEffect(() => {
        let username1 = localStorage.getItem('username')
        let ava1 = localStorage.getItem('avatar')
        if (username1) {
            setUsername(username1)
        }
        if (ava1) {
            setAvater('http://47.93.114.103:6688/' + ava1)
        }
    }, [])

    return (
        <div>
            <header>
                <img src={logopng} alt="" />
                <div className='right'>
                    <img src={avater} className="avatar" alt='' />
                    <Dropdown overlay={menu}>

                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {username}<CaretDownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </header>
        </div>
    )
}

export default withRouter(Header)