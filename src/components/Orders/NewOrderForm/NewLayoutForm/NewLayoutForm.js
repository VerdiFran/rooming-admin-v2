import React, {useEffect, useState} from 'react'
import {InboxOutlined, UserOutlined} from '@ant-design/icons'
import {required} from '../../../../utils/validators/validators'
import {Card, Input, Button, Drawer, Space, Upload, message, Descriptions, Form, AutoComplete, Cascader} from 'antd'
import {IdGenerator} from '../../../../utils/generators/generators'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'
import {Formik} from 'formik'

const NewLayoutForm = ({lId, cities, addresses, getAddresses, getCitiesByNamePrefix}) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions(Array.from(new Set(cities)).map(city => ({value: city})))
    }, [cities])

    const draggerProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture-card',
        onChange(info) {
            const {status} = info.file
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        }
    }

    return (
        <Card
            hoverable
            title={`Планировка ${lId}`}
            size="small"
        >
            <Formik
                initialValues={{
                    cityId: '',
                    addressId: '',
                    layoutDescription: '',
                    cityName: ''
                }}
                onSubmit={() => {}}
            >
                {({
                      setFieldValue,
                      values
                  }) => (
                    <Form>
                        <Space direction="vertical">
                            <Upload.Dragger
                                style={{width: '100%'}}
                                {...draggerProps}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">Щелкните или перетащите файл в эту область, чтобы
                                                               загрузить</p>
                                <p className="ant-upload-hint">
                                    Поддерживаются изображения планировок в формате jpeg, jpg или png. Можно загрузить
                                    одно или
                                    несколько изображений.
                                </p>
                            </Upload.Dragger>
                            <Space direction="horizontal" style={{marginRight: '10px'}} align="start">
                                <Form.Item label="Город">
                                    <AutoComplete
                                        style={{width: '300px'}}
                                        options={options}
                                        onChange={(value => {
                                            setFieldValue('cityName', value)
                                            getCitiesByNamePrefix(value)
                                        })}
                                        onSelect={(value) => getAddresses(value)}
                                    />
                                </Form.Item>
                                <Form.Item label="Адрес">
                                    <Cascader
                                        name={`layouts.${lId}.buildingAddress`}
                                        options={addresses}
                                        value={values.addressId}
                                        onChange={(value => setFieldValue('addressId', value))}
                                    />
                                </Form.Item>
                                <span>или</span>
                                <NewBuildingFormContainer/>
                                <Form.Item label="Описание планировки">
                                    <Input.TextArea
                                        name={`layouts.${lId}.layoutDescription`}
                                        value={values.layoutDescription}
                                        onChange={(value) =>
                                            setFieldValue('layoutDescription', value.currentTarget.value)}
                                    />
                                </Form.Item>
                            </Space>
                        </Space>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default NewLayoutForm
