import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {
    renderDatepicker,
    renderFileUploader,
    renderInput, renderSelector,
    renderTextarea
} from '../../../../common/FormControls/FormControls'
import {required} from '../../../../../utils/validators/validators'
import {Button, Drawer, Form, Select, Space, Input} from 'antd'
import {renderCascader} from '../../../../common/FormControls/FormControls'
import NewComplexFormContainer from './NewComplexForm/NewComplexFormContainer'
import {Formik} from 'formik'

const NewBuildingForm = ({complexOptions, lId, handleSubmit, setComplexSelectChanges}) => {
    const [visible, setVisible] = useState(false)
    const [complexId, setComplexId] = useState(null)

    return (
        <Formik
            initialValues={{}}
            onSubmit={() => {
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
                        <Button
                            type="link"
                            onClick={() => setVisible(true)}
                        >новое здание</Button>
                        <Drawer
                            title="Добавление нового здания"
                            width={500}
                            onClose={() => setVisible(false)}
                            visible={visible}
                            bodyStyle={{paddingBottom: 80}}
                            footer={
                                <div style={{textAlign: 'right'}}>
                                    <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                                        Отмена
                                    </Button>
                                    <Button onClick={() => {
                                        handleSubmit()
                                        setVisible(false)
                                    }} type="primary">
                                        Подтвердить
                                    </Button>
                                </div>
                            }
                        >
                            <Space direction="vertical">
                                <Form.Item label="Город">
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="Комплекс">
                                    <Input/>
                                </Form.Item>
                                <span>или</span>
                                <NewComplexFormContainer/>
                                <Form.Item label="Улица">
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="Дом">
                                    <Input/>
                                </Form.Item>
                            </Space>
                        </Drawer>
                    </Form>
                )
            }
        </Formik>
    )
}

export default NewBuildingForm
