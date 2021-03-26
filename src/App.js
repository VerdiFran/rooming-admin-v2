import React from 'react'
import {connect, Provider} from 'react-redux'
import store from './redux/store'
import Login from './components/Login/Login'
import {compose} from 'redux'
import {Redirect, BrowserRouter, Route, withRouter, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import {initializeApp} from './redux/reducers/appReducer'
import {getInitialized, getIsAuth, getUserRoles} from './utils/selectors/selectors'
import HeaderContainer from './components/Header/HeaderContainer'
import {Button, Layout, PageHeader} from 'antd'
import OrdersContainer from './components/Orders/OrdersContainer'
import SideMenuPanelContainer from './components/SideMenuPanel/SideMenuPanelContainer'
import BuildingsContainer from './components/Buildings/BuildingsContainer'
import './App.less'

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        /*if (!this.props.initialized) {
            return <Preloader/>
        }*/

        const {Sider, Content} = Layout

        return (
            <Layout className="app-wrapper">
                {this.props.isAuth && <HeaderContainer/>}
                <Layout>
                    {this.props.isAuth &&
                    <Sider style={{backgroundColor: 'transparent'}}>
                        <SideMenuPanelContainer/>
                    </Sider>}
                    <Content>
                        {this.props.isAuth && <PageHeader
                            title="Title"
                            onBack={() => window.history.back()}
                        />}
                        <Switch>
                            <Route
                                path="/home"
                                render={() => <Home/>}
                            />
                            <Route
                                path="/login"
                                render={() => <Login/>}
                            />
                            <Route
                                path="/orders"
                                render={() => <OrdersContainer/>}
                            />
                            <Route
                                path="/buildings"
                                render={() => <BuildingsContainer/>}
                            />
                            <Redirect from="/" to="/home"/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => ({
    initialized: getInitialized(state),
    userRole: getUserRoles(state),
    isAuth: getIsAuth(state)
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App)

let MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
