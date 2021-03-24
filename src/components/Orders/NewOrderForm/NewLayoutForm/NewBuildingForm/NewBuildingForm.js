import React, {useState} from 'react'
import {Button, Drawer, Form, Select, Space, Input, AutoComplete, Row} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons'
import NewComplexFormContainer from './NewComplexForm/NewComplexFormContainer'
import styles from './NewBuildingForm.module.scss'
import DrawerFooter from '../../../../common/FormControls/DrawerFooter'
import TextArea from 'antd/es/input/TextArea'

const NewBuildingForm = (props) => {
    const {layoutIndex, complexes, streets, formik, handleSubmit} = props

    const {Option} = Select

    const [visible, setVisible] = useState(false)
    const [streetsByComplex, setStreetsByComplex] = useState([])

    const getStreetsByComplex = (complexId) =>
        setStreetsByComplex(streets.filter(street => street.complexId === complexId)
            .map(street => ({value: street.streetName}))
            .reduce((acc, currStreet) => {
                return acc.some(street => street.value === currStreet.value) ? acc : [...acc, currStreet]
            }, []))

    return (
        <>
            <Button
                type="dashed"
                className={styles.newBuildingButton}
                onClick={() => setVisible(true)}
            ><PlusSquareOutlined/>новое здание</Button>
            <Drawer
                title="Добавление нового здания"
                width={440}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={<DrawerFooter
                    onCancel={[() => setVisible(false)]}
                    onSubmit={[handleSubmit, () => setVisible(false)]}
                />}
            >
                <Form layout="vertical" style={{width: '100%'}}>
                    <Space direction="horizontal" style={{width: '100%'}}>
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
                        <Form.Item>
                            <div className={styles.orNewComplexContainer}>
                                <span>или</span>
                                <NewComplexFormContainer layoutIndex={layoutIndex}/>
                            </div>
                        </Form.Item>
                    </Space>
                    <Space direction="horizontal" style={{width: '100%'}}>
                        <Form.Item label="Улица">
                            <AutoComplete
                                style={{width: '200px'}}
                                options={streetsByComplex}
                                onChange={(value => formik.setFieldValue(
                                    `layouts.${layoutIndex}.building.address.street`,
                                    value
                                ))}
                            />
                        </Form.Item>
                        <Form.Item label="Дом">
                            <Input
                                onChange={(e) => formik.setFieldValue(
                                    `layouts.${layoutIndex}.building.address.house`,
                                    e.currentTarget.value
                                )}
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item label="Описание здания">
                        <TextArea/>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default NewBuildingForm
