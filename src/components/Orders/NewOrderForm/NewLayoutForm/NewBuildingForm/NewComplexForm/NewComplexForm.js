import React, {useState} from 'react'
import {Button, Drawer, Form, Space, Input, AutoComplete} from 'antd'

const NewComplexForm = ({formik, layoutIndex, addComplex}) => {
    const [visible, setVisible] = useState(false)

    return (
        <Form>
            <Button type="link" onClick={() => setVisible(true)}>новый комплекс</Button>
            <Drawer
                title="Добавление нового комплекса"
                width={400}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            const complex = formik.values.layouts[layoutIndex].building.complex
                            addComplex({
                                complexName: complex.name,
                                complexDescription: complex.description
                            })
                            setVisible(false)
                        }} type="primary">
                            Подтвердить
                        </Button>
                    </div>
                }
            >
                <Form.Item label="Название комплекса">
                    <Input
                        onChange={(e) =>
                            formik.setFieldValue(`layouts.${layoutIndex}.building.complex.name`, e.currentTarget.value)}
                    />
                </Form.Item>
                <Form.Item label="Описание комплекса">
                    <Input.TextArea
                        onChange={(e) =>
                            formik.setFieldValue(`layouts.${layoutIndex}.building.complex.description`, e.currentTarget.value)}
                    />
                </Form.Item>
            </Drawer>
        </Form>
    )
}

export default NewComplexForm
