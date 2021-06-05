import React from 'react'
import {Form, Button, Input, Checkbox} from 'antd'
import 'antd/dist/antd.css'
import styles from './AuthForm.module.scss'
import QueueAnim from 'rc-queue-anim'
import {Formik} from 'formik'

/**
 * Authentication form with email and password
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */

const AuthForm = ({onSubmit}) => {

    const formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 20
        }
    }

    const buttonItemLayout = {
        wrapperCol: {
            span: 26,
            offset: 0,
        },
    }

    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
                rememberMe: false
            }}
            onSubmit={(values) => onSubmit(values)}
        >
            {
                ({
                     handleChange,
                     handleSubmit,
                     values
                 }) => (
                    <Form
                        {...formItemLayout}
                        formLayout="horizontal"
                        className={styles.authForm}
                    >
                        <QueueAnim delay={300}>
                            <div key="0">
                                <Form.Item label="Логин">
                                    <Input
                                        name="login"
                                        value={values.login}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </div>
                            <div key="1">
                                <Form.Item label="Пароль">
                                    <Input.Password
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </div>
                            <div key="2">
                                <Form.Item wrapperCol={{offset: 0, span: 26}}>
                                    <Checkbox
                                        name="rememberMe"
                                        value={values.rememberMe}
                                        onChange={handleChange}
                                    >Запомнить меня</Checkbox>
                                </Form.Item>
                            </div>
                            <div key="3">
                                <Form.Item {...buttonItemLayout}>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        className={styles.signInButton}
                                        onClick={handleSubmit}
                                    >Войти</Button>
                                </Form.Item>
                            </div>
                        </QueueAnim>
                    </Form>
                )
            }
        </Formik>
    )
}

export default AuthForm
