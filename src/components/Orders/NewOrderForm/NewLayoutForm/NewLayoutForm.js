import React, {useEffect, useState} from 'react'
import {InboxOutlined} from '@ant-design/icons'
import {Card, Input, Space, Upload, message, Form, AutoComplete, Cascader} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'
import useDebounce from '../../../../hooks/useDebounce'

const NewLayoutForm = (props) => {
    const {
        layoutIndex,
        formik,
        cities,
        addresses,
        setFieldValue,
        getAddresses,
        getCitiesByNamePrefix
    } = props

    const [citiesOptions, setCitiesOptions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const debouncedSearchTerm = useDebounce(searchTerm, 1000)

    useEffect(() => {
        if (cities !== citiesOptions) {
            setCitiesOptions(Array.from(new Set(cities)).map(city => ({value: city})))
            setIsSearching(false)
        }

        if (debouncedSearchTerm) {
            setIsSearching(true)
            getCitiesByNamePrefix(searchTerm)
        }
    }, [cities, debouncedSearchTerm])

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
            title={`Планировка ${layoutIndex + 1}`}
            size="small"
        >
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
                    <Space direction="vertical" style={{marginRight: '10px'}} align="start">
                        <Form.Item label="Город">
                            <AutoComplete
                                name={`layouts.${layoutIndex}.city`}
                                style={{width: '300px'}}
                                options={citiesOptions}
                                onChange={(value => {
                                    setFieldValue(`layouts.${layoutIndex}.building.address.city`, value)
                                    setSearchTerm(value)
                                })}
                                onSelect={(value) => getAddresses(value)}
                            />
                        </Form.Item>
                        <Form.Item label="Адрес">
                            <Cascader
                                options={addresses}
                                /*value={[
                                    formik.values.layouts[layoutIndex].building.complexId,
                                    formik.values.layouts[layoutIndex].building.complex.name,
                                    formik.values.layouts[layoutIndex].buildingId
                                ]}*/
                                onChange={(value => {
                                    setFieldValue(`layouts.${layoutIndex}.buildingId`, value[2])
                                })}
                            />
                        </Form.Item>
                        <Space direction="horizontal" size="small">
                            <span>или</span>
                            <NewBuildingFormContainer
                                layoutIndex={layoutIndex}
                                setFieldValue={setFieldValue}
                            />
                        </Space>
                        <Form.Item label="Описание планировки">
                            <Input.TextArea
                                name={`layouts.${layoutIndex}.description`}
                                onChange={(value) =>
                                    setFieldValue(`layouts.${layoutIndex}.description`, value.currentTarget.value)}
                            />
                        </Form.Item>
                    </Space>
                </Space>
            </Form>
        </Card>
    )
}

export default NewLayoutForm
