import React from 'react'
import LoginCard from './LoginCard/LoginCard'
import styles from './Login.module.scss'
import {connect} from 'react-redux'
import {login} from '../../redux/reducers/authReducer'
import {Redirect} from 'react-router-dom'
import {getIsAuth} from '../../utils/selectors/selectors'


const Login = (props) => {
    const handleSubmit = (formData) => {
        const {login, password, rememberMe} = formData
        props.login(login, password, rememberMe)
    }

    if (props.isAuth) return <Redirect to='/home'/>

    return (
        <div className={styles.container}>
            <LoginCard onSubmit={handleSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
})

export default connect(mapStateToProps, {login})(Login)
