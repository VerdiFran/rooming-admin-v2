import React, {useEffect} from 'react'
import {connect, Provider} from 'react-redux'
import store from './redux/store'
import Login from './components/Login/Login'
import {compose} from 'redux'
import {Redirect, BrowserRouter, Route, withRouter, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import {initializeApp} from './redux/reducers/appReducer'
import {getInitialized, getIsAuth, getLogoutIsFinished} from './utils/selectors/selectors'
import HeaderContainer from './components/Header/HeaderContainer'
import {Layout} from 'antd'
import OrdersContainer from './components/Orders/OrdersContainer'
import SideMenuPanelContainer from './components/SideMenuPanel/SideMenuPanelContainer'
import BuildingsContainer from './components/Buildings/BuildingsContainer'
import CompaniesContainer from './components/Companies/CompaniesContainer'
import CompanyAddRequestsContainer from './components/CompanyAddRequests/CompanyAddRequestsContainer'
import './App.less'
import Preloader from './components/common/Preloader/Preloader'
import SessionsContainer from "./components/Sessions/SessionsContainer";
import BindRequestsContainer from './components/BindRequests/BindRequestsContainer'
import BoundUsersContainer from './components/BoundUsers/BoundUsersContainer'

const App = (props) => {
    const {
        initialized,
        isAuth,
        logoutIsFinished,
        location,
        initializeApp
    } = props

    useEffect(() => {
        initializeApp()
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    if (logoutIsFinished) {
        return <>
            <Preloader/>
            <Redirect to="/login"/>
        </>
    }

    if (!isAuth) {
        return <Login/>
    }

    const {Sider, Content} = Layout

    return (
        <Layout className="app-wrapper">
            <HeaderContainer/>
            <Layout>
                <Sider style={{backgroundColor: 'transparent'}}>
                    <SideMenuPanelContainer location={location}/>
                </Sider>
                <Content style={{paddingTop: '10px'}}>
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
                        <Route
                            path="/companies"
                            render={() => <CompaniesContainer/>}
                        />
                        <Route
                            path="/add-requests"
                            render={() => <CompanyAddRequestsContainer/>}
                        />
                        <Route
                            path="/sessions"
                            render={() => <SessionsContainer/>}
                        />
                        <Route
                            path="/bind-requests"
                            render={() => <BindRequestsContainer/>}
                        />
                        <Route
                            path="/bound-users"
                            render={() => <BoundUsersContainer/>}
                        />
                        <Redirect from="/" to="/home"/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    initialized: getInitialized(state),
    isAuth: getIsAuth(state),
    logoutIsFinished: getLogoutIsFinished(state)
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App)

/**
 * Wrapper for App component
 * @returns {JSX.Element}
 */
let MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
