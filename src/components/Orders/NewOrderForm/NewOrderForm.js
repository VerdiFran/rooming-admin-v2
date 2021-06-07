import React, {useState} from 'react'
import {Input, DatePicker, Form} from 'formik-antd'
import {Button, Divider, Drawer} from 'antd'
import NewLayoutFormContainer from './NewLayoutForm/NewLayoutFormContainer'
import {FieldArray, FormikProvider} from 'formik'
import {PlusSquareOutlined} from '@ant-design/icons'
import styles from './NewOrderForm.module.scss'
import DrawerFooter from '../../common/FormControls/DrawerFooter'

const NewOrderForm = ({visible, formik, onClose}) => {
    const [drawerVisible, setDrawerVisible] = useState(!visible)

    setTimeout(() => {
        setDrawerVisible(visible)
    }, 50)

    const {validateForm, handleSubmit, handleChange} = formik

    const onSubmit = () => {
        validateForm().then(errors => console.log(errors))
        handleSubmit()
    }

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
                    visible={drawerVisible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <DrawerFooter
                            onCancel={[onClose]}
                            onSubmit={[onSubmit]}
                        />
                    }
                >
                    <Form.Item
                        name="orderDescription"
                        label="Описание заказа"
                        required
                        hasFeedback
                    >
                        <Input.TextArea
                            name="orderDescription"
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="deadline"
                        label="Крайний срок"
                        required
                        hasFeedback
                    >
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
                                            addressOption: [],
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
