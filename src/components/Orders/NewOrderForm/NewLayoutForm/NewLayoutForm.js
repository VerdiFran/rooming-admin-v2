import React, {useEffect, useState} from 'react'
import {InboxOutlined} from '@ant-design/icons'
import {Card, Input, Space, Upload, message, Form, AutoComplete, Cascader, Modal} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'
import useDebounce from '../../../../hooks/useDebounce'
import {FieldArray} from 'formik'

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
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    const [files, setFiles] = useState([])

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

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    const handleCancel = () => setPreviewVisible(false)

    const draggerProps = {
        name: 'file',
        multiple: true,
        listType: 'picture-card',
        accept: 'image/png',
        customRequest: ({onSuccess, onError, file}) => {
            try {
                const files = formik.values.layouts[layoutIndex].files
                setFieldValue(`layouts.${layoutIndex}.files`, [...files, file])
            } catch (e) {
                onError(e)
            }

            onSuccess(null, file)
        },
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
        },
        onPreview: handlePreview
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
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
                        // name={`layouts.${layoutIndex}.files`}
                        multiple="true"
                        listType='picture-card'
                        accept='image/png'
                        beforeUpload={(file, fileList) => {
                            setFiles([...fileList])
                        }}
                        customRequest={(reqOption) => {
                            const {onSuccess, onError, file} = reqOption
                            // const files = [...formik.values.layouts[layoutIndex].files]

                            try {
                                // setFiles([...files, file])
                            } catch (e) {
                                onError(e)
                            }

                            onSuccess(null, file)
                        }}
                        onChange={(info) => {
                            const {status} = info.file
                            if (status !== 'uploading') {
                                console.log(info.file, info.fileList)
                            }
                            if (status === 'done') {
                                message.success(`${info.file.name} file uploaded successfully.`)
                                formik.setFieldValue(`layouts.${layoutIndex}.files`, [...files])
                            } else if (status === 'error') {
                                message.error(`${info.file.name} file upload failed.`)
                            }
                        }}
                        onPreview={handlePreview}
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
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
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
                                    setFieldValue(`layouts.${layoutIndex}.building.complexId`, value[0])
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
