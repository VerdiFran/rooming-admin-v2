import React from 'react'
import {DatePicker} from 'formik-antd'
import {Input, Button, Divider, Drawer, Form} from 'antd'
import NewLayoutFormContainer from './NewLayoutForm/NewLayoutFormContainer'
import {FieldArray, FormikProvider} from 'formik'
import {PlusSquareOutlined} from '@ant-design/icons'
import styles from './NewOrderForm.module.scss'
import DrawerFooter from '../../common/FormControls/DrawerFooter'

const NewOrderForm = ({visible, formik, onClose, handleSubmit}) => {
    return (
        <FormikProvider value={formik}>
            <Form
                layout="vertical"
                wrapperCol={{span: 24}}
                className={styles.form}
            >
                <Drawer
                    title="Создание нового заказа"
                    width={820}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <DrawerFooter
                            onCancel={[onClose]}
                            onSubmit={[handleSubmit, onClose]}
                        />
                    }
                >
                    <Form.Item label="Описание заказа">
                        <Input.TextArea
                            value={formik.values.orderDescription}
                            onChange={(e => formik.setFieldValue('orderDescription', e.currentTarget.value))}
                        />
                    </Form.Item>
                    <Form.Item label="Крайний срок">
                        <DatePicker
                            name="deadline"
                            id="order-deadline"
                            value={formik.values.deadline}
                            format="DD.MM.YYYY HH:mm"
                            placeholder="дд.мм.гггг чч:мм"
                            showTime
                            onChange={(date) => formik.setFieldValue('deadline', date)}
                        />
                    </Form.Item>
                    <Divider/>
                    <FieldArray name="layouts">
                        {({remove, push}) => (
                            <div>
                                {formik.values.layouts.length > 0 && formik.values.layouts.map((layout, index) => (
                                    <NewLayoutFormContainer
                                        layoutIndex={index}
                                        setFieldValue={formik.setFieldValue}
                                        remove={() => remove(index)}
                                    />
                                ))}
                                <Button
                                    icon={<PlusSquareOutlined/>}
                                    onClick={() => push({
                                        description: '',
                                        buildingId: null,
                                        building: {
                                            description: '',
                                            address: [],
                                            complexId: null,
                                            complex: {
                                                name: '',
                                                description: ''
                                            }
                                        },
                                        files: [],
                                        resources: []
                                    })
                                    }
                                >Добавить модель</Button>
                            </div>
                        )}
                    </FieldArray>
                </Drawer>
            </Form>
        </FormikProvider>
    )
}

export default NewOrderForm
