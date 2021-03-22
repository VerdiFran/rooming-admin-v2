import React, {useState} from 'react'
import {Button, Drawer, Form, Select, Space, Input, AutoComplete} from 'antd'
import {PlusOutlined, PlusSquareOutlined} from '@ant-design/icons'
import NewComplexFormContainer from './NewComplexForm/NewComplexFormContainer'
import styles from './NewBuildingForm.module.scss'

const NewBuildingForm = (props) => {
    const {layoutIndex, complexes, streets, formik, handleSubmit} = props

    const [visible, setVisible] = useState(false)
    const [streetsByComplex, setStreetsByComplex] = useState([])

    const {Option} = Select

    const getStreetsByComplex = (complexId) =>
        setStreetsByComplex(streets.filter(street => street.complexId === complexId)
            .map(street => ({value: street.streetName}))
            .reduce((acc, currStreet) => {
                return acc.some(street => street.value === currStreet.value) ? acc : [...acc, currStreet]
            }, []))

    return (
        <Form>
            <Button
                type="dashed"
                className={styles.newBuildingButton}
                onClick={() => setVisible(true)}
            ><PlusSquareOutlined/>новое здание</Button>
            <Drawer
                title="Добавление нового здания"
                width={500}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button
                            onClick={() => setVisible(false)}
                            style={{marginRight: 8}}
                        >Отмена</Button>
                        <Button onClick={() => {
                            handleSubmit({
                                city: formik.values.layouts[layoutIndex].building.address.city,
                                street: formik.values.layouts[layoutIndex].building.address.street,
                                house: formik.values.layouts[layoutIndex].building.address.house,
                                complexId: formik.values.layouts[layoutIndex].building.complexId,
                                complexName: formik.values.layouts[layoutIndex].building.complex.name
                            })
                            setVisible(false)
                        }} type="primary">
                            Подтвердить
                        </Button>
                    </div>
                }
            >
                <Space direction="vertical">
                    <Form.Item label="Комплекс">
                        <Select
                            style={{width: '200px'}}
                            onChange={(value, option) => {
                                formik.setFieldValue(`layouts.${layoutIndex}.building.complexId`, value)
                                formik.setFieldValue(`layouts.${layoutIndex}.building.complex.name`, option.children)
                            }}
                            onSelect={(value) => getStreetsByComplex(value)}
                        >
                            {
                                complexes && complexes.map(complex =>
                                    <Option value={complex.value}>{complex.label}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Space direction="horizontal" size="small">
                        <span>или</span>
                        <NewComplexFormContainer layoutIndex={layoutIndex}/>
                    </Space>
                    <Form.Item label="Улица">
                        <AutoComplete
                            style={{width: '200px'}}
                            options={streetsByComplex}
                            onChange={(value => formik.setFieldValue(`layouts.${layoutIndex}.building.address.street`, value))}
                        />
                    </Form.Item>
                    <Form.Item label="Дом">
                        <Input
                            onChange={(e) =>
                                formik.setFieldValue(`layouts.${layoutIndex}.building.address.house`, e.currentTarget.value)}
                        />
                    </Form.Item>
                </Space>
            </Drawer>
        </Form>
    )
}

export default NewBuildingForm
