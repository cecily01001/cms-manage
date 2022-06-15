import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Layout from '../pages/Home/Layout'
import App from '../pages/Home/App'
import Edit from '../pages/Home/Edit'
import Means from '../pages/Home/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/Home/List'
import ListTable from '../pages/Home/ListTable'
import ListList from '../pages/Home/ListList'

const AppRouter = () => {
    return (
        <HashRouter>
            <Switch>
                
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Layout>
                    <App />
                    {/* <Switch>
                        <Route exact path='/listtable' component={ListTable}></Route>
                        <Route path='/listlist' component={ListList}></Route>
                        <Route path='/edit' component={Edit}></Route>
                        <Route path='/means' component={Means}></Route>
                        <Route exact path="/" ></Route>
                    </Switch> */}
                </Layout>
            </Switch>
        </HashRouter>
    )
}
export default AppRouter