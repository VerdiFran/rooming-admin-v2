import React from 'react'
import {Form, Alert, Button, Input, Checkbox} from 'antd'
import 'antd/dist/antd.css'
import styles from './AuthForm.module.scss'
import {required} from '../../../../utils/validators/validators'
import {MyCheckbox, renderInput, renderPasswordInput} from '../../../common/FormControls/FormControls'
import QueueAnim from 'rc-queue-anim'
import {purple} from '@ant-design/colors'
import {Formik} from 'formik'

/**
 * Authentication form with email and password
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */

const AuthForm = ({onSubmit}) => {
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
                     handleBlur,
                     setFieldValue,
                     handleSubmit,
                     values
                 }) => (
                    <Form className={styles.authForm}>
                        <QueueAnim delay={300}>
                            <div key="0" className={styles.validatedField}>
                                <Form.Item label="Логин">
                                    <Input
                                        name="login"
                                        value={values.login}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </div>
                            <div key="1" className={styles.validatedField}>
                                <Form.Item label="Пароль">
                                    <Input.Password
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </div>
                            <div key="2" className={styles.validatedField}>
                                <Form.Item>
                                    <Checkbox
                                        name="rememberMe"
                                        value={values.rememberMe}
                                        checked
                                        onChange={handleChange}
                                    >Запомнить меня</Checkbox>
                                </Form.Item>
                            </div>
                            <div key="3">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className={styles.signInButton}
                                    onClick={handleSubmit}
                                >Войти</Button>
                            </div>
                        </QueueAnim>
                    </Form>
                )
            }
        </Formik>
    )
}

export default AuthForm
