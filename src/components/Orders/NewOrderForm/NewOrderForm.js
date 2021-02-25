import React, {useState} from 'react'
import {DatePicker} from 'formik-antd'
import {Input, Button, Divider, Space, Drawer, Form, TimePicker} from 'antd'
import NewLayoutFormContainer from './NewLayoutForm/NewLayoutFormContainer'
import {FieldArray, Formik, FormikProvider, useFormik} from 'formik'
import {PlusSquareOutlined} from '@ant-design/icons'
import {IdGenerator} from '../../../utils/generators/generators'

const NewOrderForm = ({visible, onClose, addNewOrder}) => {
    const formik = useFormik({
        initialValues: {
            orderDescription: '',
            deadline: null,
            layouts: [
                {
                    description: '',
                    buildingId: null,
                    building: {
                        description: '',
                        address: {
                            city: '',
                            street: '',
                            house: ''
                        },
                        complexId: null,
                        complex: {
                            name: '',
                            description: ''
                        }
                    }
                }
            ]
        },
        onSubmit: values => {
            addNewOrder({
                order: {
                    orderDescription: values.orderDescription,
                    deadline: values.deadline.toISOString(),
                    layouts: values.layouts.map(layout =>
                        layout.building.complexId && /new/.test(layout.building.complexId.toString()) && {
                            ...layout,
                            building: {
                                ...layout.building,
                                complexId: null
                            }
                        })
                }
            })
        }
    })

    return (
        <FormikProvider value={formik}>
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
                            <Button htmlType="submit" onClick={() => {
                                formik.handleSubmit()
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
                            {({insert, remove, push}) => (
                                <div>
                                    <Space direction="vertical" size="small">
                                        {formik.values.layouts.length > 0 &&
                                        formik.values.layouts.map((layout, index) => (
                                            <NewLayoutFormContainer
                                                layoutIndex={index}
                                                setFieldValue={formik.setFieldValue}
                                            />
                                        ))}
                                    </Space>
                                    <Button
                                        style={{marginTop: '10px'}}
                                        icon={<PlusSquareOutlined/>}
                                        onClick={() => push({
                                            description: '',
                                            buildingId: null,
                                            building: {
                                                description: '',
                                                address: {
                                                    city: '',
                                                    street: '',
                                                    house: ''
                                                },
                                                complexId: null,
                                                complex: {
                                                    name: '',
                                                    description: ''
                                                }
                                            }
                                        })
                                        }
                                    >Добавить модель</Button>
                                </div>
                            )}
                        </FieldArray>
                    </Space>
                </Drawer>
            </Form>
        </FormikProvider>
    )
}

export default NewOrderForm
