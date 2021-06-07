import React from 'react'
import {Button, Drawer} from 'antd'
import {Form, Input} from 'formik-antd'
import styles from './NewComplexForm.module.scss'
import {PlusSquareOutlined} from '@ant-design/icons'
import DrawerFooter from '../../../../../common/FormControls/DrawerFooter'
import {FormikProvider} from 'formik'

const NewComplexForm = (props) => {
    const {
        formik,
        visible,
        onOpen,
        onClose
    } = props

    const {handleSubmit, handleChange, validateForm} = formik

    const onSubmit = () => {
        validateForm().then(errors => console.log(errors))
        handleSubmit()
    }

    return (
        <FormikProvider value={formik}>
            <Button
                type="dashed"
                className={styles.newComplexButton}
                onClick={onOpen}
            ><PlusSquareOutlined/>новый комплекс</Button>
            <Drawer
                title="Добавление нового комплекса"
                width={400}
                onClose={onClose}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={<DrawerFooter
                    onCancel={[onClose]}
                    onSubmit={[onSubmit]}
                />}
            >
                <Form layout="vertical">
                    <Form.Item
                        name="name"
                        label="Название комплекса"
                        required
                        hasFeedback
                    >
                        <Input
                            name="name"
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Описание комплекса"
                        required
                        hasFeedback
                    >
                        <Input.TextArea
                            name="description"
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </FormikProvider>
    )
}

export default NewComplexForm
