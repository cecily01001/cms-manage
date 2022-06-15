import React, { useState } from 'react'
import '../../../assets/base.less'
import { Layout } from 'antd';
import logopng from '../../../assets/images/col_logo.png'
import './style.less'
import Header from '../../../components/Header';
import Aside from '../../../components/Aside';
import Bread from '../../../components/Bread';
import { Route, Switch } from 'react-router-dom'
import ListTable from '../ListTable';
import ListList from '../ListList';
import Edit from '../Edit';
import Means from '../Means';


const App = () => {

  return (
    <Layout id='app'>
      <Header/>
      <Layout>
        <div className='container'>
          <Aside />
          <div className='container_box'>
            <Bread />
            <div className='container_content'>
              <Switch >
                <Route exact path='/listtable' component={ListTable}></Route>
                <Route path='/listlist' component={ListList}></Route>
                <Route path='/edit/:id' component={Edit}></Route>
                <Route path='/edit' component={Edit}></Route>
                <Route path='/means' component={Means}></Route>
                <Route exact path="/" ></Route>
              </Switch>
            </div>
          </div>
        </div>
      </Layout>
      <footer>Cecily</footer>
    </Layout>
  )
}

export default App