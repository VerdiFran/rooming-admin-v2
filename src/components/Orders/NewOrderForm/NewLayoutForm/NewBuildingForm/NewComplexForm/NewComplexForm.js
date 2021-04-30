import React, {useState} from 'react'
import {Button, Drawer} from 'antd'
import {Form, Input} from 'formik-antd'
import styles from './NewComplexForm.module.scss'
import {PlusSquareOutlined} from '@ant-design/icons'
import DrawerFooter from '../../../../../common/FormControls/DrawerFooter'

const NewComplexForm = ({formik: {values, setFieldValue}, addComplex}) => {
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
                    <Form.Item
                        name="name"
                        label="Название комплекса"
                    >
                        <Input
                            name="name"
                            value={values.name}
                            onChange={(e) =>
                                setFieldValue(`name`, e.currentTarget.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Описание комплекса"
                    >
                        <Input.TextArea
                            name="description"
                            value={values.description}
                            onChange={(e) =>
                                setFieldValue(`description`, e.currentTarget.value)}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default NewComplexForm
