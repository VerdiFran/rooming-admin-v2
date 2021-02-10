import React from 'react'
import LoginCard from './LoginCard/LoginCard'
import styles from './Login.module.scss'
import {connect} from 'react-redux'
import {login, toggleIsAuth} from '../../redux/reducers/authReducer'
import {Redirect} from 'react-router-dom'
import {getIsAuth} from '../../utils/selectors/selectors'

/**
 * Login page component
 * @returns {JSX.Element}
 * @constructor
 */

class Login extends React.Component {
    onSubmit = (formData) => {
        const {login, password, rememberMe} = formData

        this.props.login(login, password, rememberMe)
            .catch(error => {

            })
    }

    render() {
        const {isAuth} = this.props

        if (isAuth) return <Redirect to='/home'/>

        return (
            <div className={styles.container}>
                <LoginCard onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
})

export default connect(mapStateToProps, {login, toggleIsAuth})(Login)
