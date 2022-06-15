import React, { useEffect, useState } from 'react'
import './style.less'
import { Space, Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom'
import api from '../../../api';
import moment from 'moment'
import { Pagination } from 'antd';

const ListTable = () => {
  //表格数据
  const [arr, setArr] = useState([
    {
      dataIndex: '1',
      mytitle: 'John Brown',
      date: 'New York No. 1 Lake Park',
    }
  ])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  //表格样式
  const columns = [
    {
      dataIndex: 'mytitle',
      key: 'mytitle',
      width: '60%',
      render: text =>
        <div>{text}</div>
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: text => (
        <div>{text}</div>
      )
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button type='primary' onClick={() => console.log(text.key)}>编辑</Button>
            <Button type='danger' onClick={() => console.log(text.key)}>删除</Button>
          </Space>
        )
      }
    },
  ];

  //创建单个的文章对象
  function MyTitle(props) {
    return (
      <div>
        <a to="/" className='table_title' href={"http://codesohigh.com:8765/article/" + props.id} target="_blank">{props.title}</a>
        <p style={{ color: '#999' }}>{props.subTitle}</p>
      </div>
    )
  }

  // 提取请求的代码
  const getArticleList = (current, pageSize) => {
    api.getArticle({
      num: current,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        let { arr,num, count, total } = res.data;
        setPagination({ current: num, pageSize: count, total })
        /* 
            1. 要给每个数组项加key，让key=id
            2. 需要有一套标签结构，赋予一个属性
        */
        // 声明一个空数组
        let myarr = []
        arr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }
          myarr.push(obj)
        })
        setArr(myarr)
      }
    })
  }
  const pageChange = (arg) => {
    getArticleList(arg.current, arg.pageSize);
    console.log(arg)
  }

  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize)
  }, [])


  return (
    <div className='list_table'>
      <Table columns={columns} dataSource={arr} showHeader={false} onChange={pageChange} pagination={pagination} />
    </div>
  )
}

export default ListTable