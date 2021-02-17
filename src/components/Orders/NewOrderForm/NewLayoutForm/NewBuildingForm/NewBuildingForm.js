import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {
    renderDatepicker,
    renderFileUploader,
    renderInput, renderSelector,
    renderTextarea
} from '../../../../common/FormControls/FormControls'
import {required} from '../../../../../utils/validators/validators'
import {Button, Drawer, Form, Select, Space, Input, AutoComplete} from 'antd'
import {renderCascader} from '../../../../common/FormControls/FormControls'
import NewComplexFormContainer from './NewComplexForm/NewComplexFormContainer'
import {Formik} from 'formik'

const NewBuildingForm = ({lId, cities, complexes, streets, getAddresses}) => {
    const [visible, setVisible] = useState(false)
    const [streetsByComplex, setStreetsByComplex] = useState([])

    const {Option} = Select

    const handleSearch = () => {

    }

    const getStreetsByComplex = (complexId) =>
        setStreetsByComplex(streets.filter(street => street.complexId === complexId)
            .map(street => ({value: street.streetName}))
            .reduce((acc, currStreet) => {
                return acc.some(street => street.value === currStreet.value) ? acc : [...acc, currStreet]
            }, []))

    return (
        <Formik
            initialValues={{
                complexId: null,
                complexName: '',
                street: ''
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values))
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
                                <Form.Item label="Комплекс">
                                    <Select
                                        style={{width: '200px'}}
                                        onChange={(value, option) => {
                                            setFieldValue('complexId', value)
                                            setFieldValue('complexName', option.children)
                                        }}
                                        onSelect={(value) => getStreetsByComplex(value)}
                                    >
                                        {
                                            complexes && complexes.map(complex =>
                                                <Option value={complex.value}>{complex.label}</Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <span>или</span>
                                <NewComplexFormContainer/>
                                <Form.Item label="Улица">
                                    <AutoComplete
                                        style={{width: '200px'}}
                                        options={streetsByComplex}
                                        onChange={(value => setFieldValue('street', value))}
                                    />
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
