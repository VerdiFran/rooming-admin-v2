import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {renderDatepicker, renderFileUploader, renderInput, renderTextarea} from '../../common/FormControls/FormControls'
import {required} from '../../../utils/validators/validators'
import {DatePicker} from 'formik-antd'
import {Input, Button, Divider, Space, Drawer, Typography, Descriptions, Form} from 'antd'
import NewLayoutReduxForm from './NewLayoutForm/NewLayoutForm'
import NewLayoutFormContainer from './NewLayoutForm/NewLayoutFormContainer'
import {IdGenerator} from '../../../utils/generators/generators'
import {useFormik, useFormikContext, FormikProvider, Formik} from 'formik'
import {PlusSquareOutlined} from '@ant-design/icons'

const NewOrderForm = ({formValues, visible, showDrawer, onClose, handleSubmit, handleChange}) => {
    const [layoutsCount, setLayoutsCount] = useState(1)

    const {setFieldValue} = useFormikContext

    const getLayoutForms = (count) => {
        const layouts = []

        for (let index = 0; index < count; index++) {
            layouts[index] = <NewLayoutFormContainer/>
        }

        return layouts
    }

    return (
        <Formik
            onSubmit={values => alert(JSON.stringify(values, null, 2))}
            initialValues={{
                description: '',
                deadline: new Date()
            }}
        >
            {
                ({
                     handleChange,
                     handleBlur,
                     setFieldValue,
                     handleSubmit,
                     values
                 }) => (
                    <Form>
                        <Drawer
                            title="Создание нового заказа"
                            width={820}
                            onClose={onClose}
                            visible={visible}
                            bodyStyle={{paddingBottom: 80}}
                            footer={
                                <div style={{textAlign: 'right'}}>
                                    <Button onClick={onClose} style={{marginRight: 8}}>
                                        Отмена
                                    </Button>
                                    <Button onClick={() => {
                                        handleSubmit()
                                        onClose()
                                    }} type="primary">
                                        Подтвердить
                                    </Button>
                                </div>
                            }
                        >
                            <Space direction="vertical" size="small" style={{width: '100%'}}>
                                <Form.Item label="Описание заказа">
                                    <Input.TextArea
                                        name="description"
                                        id="order-description"
                                        value={values.description}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Крайний срок">
                                    <DatePicker
                                        name="deadline"
                                        id="order-deadline"
                                        value={values.date}
                                        format="DD.MM.YYYY"
                                        placeholder="дд.мм.гггг"
                                        onChange={(date, dateString) => setFieldValue('deadline', dateString)}
                                    />
                                </Form.Item>
                                <Divider/>
                                {getLayoutForms(layoutsCount)}
                                <Button
                                    icon={<PlusSquareOutlined/>}
                                    onClick={() => setLayoutsCount(layoutsCount + 1)}
                                >Добавить модель</Button>
                            </Space>
                        </Drawer>
                    </Form>
                )}
        </Formik>
    )
}

export default NewOrderForm
