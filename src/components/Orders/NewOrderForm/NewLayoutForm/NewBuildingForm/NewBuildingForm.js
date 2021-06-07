import React, {useEffect, useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {Select, Input, AutoComplete, Form} from 'formik-antd'
import {PlusSquareOutlined} from '@ant-design/icons'
import NewComplexFormContainer from './NewComplexForm/NewComplexFormContainer'
import styles from './NewBuildingForm.module.scss'
import DrawerFooter from '../../../../common/FormControls/DrawerFooter'
import {FormikProvider} from 'formik'

const NewBuildingForm = (props) => {
    const {
        buildingFormik,
        layoutIndex,
        complexes,
        streets,
        cityIsSelected/*,
        handleSubmit*/
    } = props

    const setFieldValue = buildingFormik.setFieldValue
    const values = buildingFormik.values
    const validateForm = buildingFormik.validateForm
    const errors = buildingFormik.errors
    const handleChange = buildingFormik.handleChange
    const handleSubmit = buildingFormik.handleSubmit

    const {Option} = Select

    const [visible, setVisible] = useState(false)
    const [streetsByComplex, setStreetsByComplex] = useState([])

    const [autoCompletedComplex, setAutoCompletedComplex] = useState(null)
    const [selectedComplex, setSelectedComplex] = useState(null)

    useEffect(() => {
        if (autoCompletedComplex) {
            const complex = complexes?.find(complex => complex.label === autoCompletedComplex)
            setSelectedComplex(complex?.value)
            setFieldValue(`complexId`, complex?.value)
            setFieldValue(`complexName`, complex?.label)
        } else {
            setSelectedComplex(null)
        }
    }, [autoCompletedComplex, complexes])

    const getStreetsByComplex = (complexId) =>
        setStreetsByComplex(streets.filter(street => street.complexId === complexId)
            .map(street => ({value: street.streetName}))
            .reduce((acc, currStreet) => {
                return acc.some(street => street.value === currStreet.value) ? acc : [...acc, currStreet]
            }, []))

    const onSubmit = () => {
        validateForm().then(error => console.log(error))
        handleSubmit()
    }

    return (
        <FormikProvider value={buildingFormik}>
            <Button
                type="dashed"
                disabled={!cityIsSelected}
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
                    onSubmit={[onSubmit]}
                />}
            >
                <Form layout="vertical" style={{width: '100%'}}>
                    <Space direction="horizontal" style={{width: '100%'}}>
                        <Form.Item
                            name="complex"
                            label="Комплекс"
                        >
                            <Select
                                name="complexId"
                                value={selectedComplex || values.complexName}
                                style={{width: '200px'}}
                                onChange={(value, option) => {
                                    setAutoCompletedComplex(null)
                                    setFieldValue(`complexId`, value)
                                    setFieldValue(`complexName`, option.children)
                                }}
                                onSelect={(value) => getStreetsByComplex(value)}
                            >
                                {
                                    complexes && complexes.map(complex =>
                                        <Option value={complex.value}>{complex.label}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name="newComplex">
                            <div className={styles.orNewComplexContainer}>
                                <span>или</span>
                                <NewComplexFormContainer
                                    layoutIndex={layoutIndex}
                                    setComplex={setAutoCompletedComplex}
                                />
                            </div>
                        </Form.Item>
                    </Space>
                    <Space direction="horizontal" style={{width: '100%'}}>
                        <Form.Item
                            name="street"
                            label="Улица"
                            required
                            validateStatus={errors.street && 'error'}
                            help={errors.street}
                        >
                            <AutoComplete
                                name="street"
                                style={{width: '200px'}}
                                options={streetsByComplex}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="house"
                            label="Дом"
                            required
                            hasFeedback
                            validateStatus={errors.house && 'error'}
                            help={errors.house}
                        >
                            <Input
                                name="house"
                                value={values.house}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item
                        name="buildingDescription"
                        label="Описание здания"
                        required
                        hasFeedback
                        validateStatus={errors.buildingDescription && 'error'}
                        help={errors.buildingDescription}
                    >
                        <Input.TextArea
                            name="buildingDescription"
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </FormikProvider>
    )
}

export default NewBuildingForm
