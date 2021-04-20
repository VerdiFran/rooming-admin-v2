import React, {useState} from 'react'
import {Button, Drawer, Form, Input} from 'antd'
import styles from './NewComplexForm.module.scss'
import {PlusSquareOutlined} from '@ant-design/icons'
import DrawerFooter from '../../../../../common/FormControls/DrawerFooter'

const NewComplexForm = ({formik, addComplex}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button
                type="dashed"
                className={styles.newComplexButton}
                onClick={() => setVisible(true)}
            ><PlusSquareOutlined/>новый комплекс</Button>
            <Drawer
                title="Добавление нового комплекса"
                width={400}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={<DrawerFooter
                    onCancel={[() => setVisible(false)]}
                    onSubmit={[addComplex, () => setVisible(false)]}
                />}
            >
                <Form layout="vertical">
                    <Form.Item label="Название комплекса">
                    <Input
                        onChange={(e) =>
                            formik.setFieldValue(`name`, e.currentTarget.value)}
                    />
                </Form.Item>
                    <Form.Item label="Описание комплекса">
                        <Input.TextArea
                            onChange={(e) =>
                                formik.setFieldValue(`description`, e.currentTarget.value)}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default NewComplexForm
