import React, { useEffect, useState } from 'react'
import '../ListTable/style.less'
import { List, Skeleton, Pagination, Button, message } from 'antd';
import api from '../../../api';
import moment from 'moment'
import { withRouter } from 'react-router-dom'

const ListList = (props) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [update, setUpdate] = useState(1)

  const onChange = (pages) => {
    getList(pages)
  }
  const getList = (num) => {
    api.getArticle({
      num: num,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data
        setList(arr)
        setCurrent(num)
        setPageSize(count)
        setTotal(total)
      }
    })
  }
  function delFn(id) {
    api.delArticle({ id }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        // 重新刷页面，要么重新请求这个列表的数据   window.reload   调用getList(1)  增加变量的检测
        setUpdate(update + 1)
      }
    })
  }

  useEffect(() => {
    getList(current)
  }, [update])

  return (
    <div className='list_table' style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type='primary' onClick={() => props.history.push('/edit/' + item.id)}>编辑</Button>,
              <Button type='danger' onClick={() => delFn(item.id)}>删除</Button>
            ]}
          >
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a href="#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item>
        )}

      />
      <Pagination onChange={onChange} total={total} current={current} pageSize={pageSize} style={{ float: 'right', marginTop: '20px' }} />
    </div>
  )
}

export default withRouter(ListList)