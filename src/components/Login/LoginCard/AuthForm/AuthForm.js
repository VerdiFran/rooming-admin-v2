import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Alert, Button} from 'antd'
import 'antd/dist/antd.css'
import styles from './AuthForm.module.scss'
import {required} from '../../../../utils/validators/validators'
import {MyCheckbox, renderInput, renderPasswordInput} from '../../../common/FormControls/FormControls'
import QueueAnim from 'rc-queue-anim'
import {purple} from '@ant-design/colors'

/**
 * Authentication form with email and password
 * @param error
 * @param handleSubmit
 * @returns {JSX.Element}
 * @constructor
 */

const AuthForm = ({error, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.authForm}>
            <QueueAnim delay={300}>
                <div key="0" className={styles.validatedField}>
                    <Field
                        placeholder="Email"
                        component={renderInput}
                        name="email"
                        validate={[required]}
                        style={inputStyle}
                        type="email"
                    />
                </div>
                <div key="1" className={styles.validatedField}>
                    <Field
                        placeholder="Пароль"
                        component={renderPasswordInput}
                        name="password"
                        type="password"
                        validate={[required]}
                        style={inputStyle}
                    />
                </div>
                {/*<div key="2" className={styles.validatedField}>
                    <Field
                        component={(props) => <MyCheckbox label="запомнить меня" {...props}/>}
                        name="rememberMe"
                        type="checkbox"
                        style={checkboxStyle}
                    />
                </div>*/}
                {error && <Alert
                    message={error}
                    type="error"
                    showIcon
                />}
                <div key="3">
                    <Button onClick={handleSubmit} type="primary" style={btnStyle}>Войти</Button>
                </div>
            </QueueAnim>
        </form>
    )
}

const inputStyle = {
    border: 'none',
}

const btnStyle = {
    /*backgroundColor: purple[2],
    borderColor: purple[3],*/
    marginTop: '20px'
}

const AuthReduxForm = reduxForm({form: 'loginForm'})(AuthForm)

export default AuthReduxForm
