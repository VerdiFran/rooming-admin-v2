import React, {useState} from 'react'
import {Button, Card, message, Modal, Space, Upload} from 'antd'
import {AutoComplete, Cascader, Form, Input} from 'formik-antd'
import {CloseOutlined} from '@ant-design/icons'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'
import styles from './NewLayoutForm.module.scss'
import DraggerContent from '../../../common/FormControls/DraggerContent'

const NewLayoutForm = (props) => {
    const {
        layoutIndex,
        formik: {setFieldValue, values},
        citiesOptions,
        addresses,
        getAddresses,
        setSearchTerm,
        remove,
        setSelectedCity
    } = props

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    const [currentComplexName, setCurrentComplexName] = useState('')

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    const handleCancel = () => setPreviewVisible(false)

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const files = [...values.layouts[layoutIndex].files]

    const draggerProps = {
        style: {width: '100%'},
        name: `layouts.${layoutIndex}.files`,
        multiple: true,
        accept: 'image/png',
        defaultFileList: files,
        fileList: files,
        beforeUpload: (file, fileList) => {
            setFieldValue(`layouts.${layoutIndex}.files`, [...files, ...fileList])
            return true
        },
        customRequest: (reqOption) => {
            const {onSuccess, onError, file} = reqOption
            try {
            } catch (e) {
                onError(e)
            }
            onSuccess(null, file)
        },
        onChange: (info) => {
            const {status} = info.file
            if (status === 'done') {
                message.success(`Файл ${info.file.name} загружен успешно.`)
            } else if (status === 'error') {
                message.error(`Произошла ошибка при загрузке ${info.file.name}.`)
            }
        },
        onRemove: (file) => {
            const fileIndex = files.indexOf(file)
            const newFileList = files.slice()
            newFileList.splice(fileIndex, 1)
            setFieldValue(`layouts.${layoutIndex}.files`, [...newFileList])
        },
        // onPreview: handlePreview
    }

    console.log(values.layouts[layoutIndex].city)

    return (
        <Card
            hoverable
            title={`Планировка ${layoutIndex + 1}`}
            size="small"
            style={{marginBottom: '10px'}}
            extra={<Button type="link" onClick={remove}><CloseOutlined/></Button>}
        >
            <Form layout="vertical">
                <div className={styles.draggerContainer}>
                    <Upload.Dragger {...draggerProps}>
                        <DraggerContent/>
                    </Upload.Dragger>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>
                <Space direction="horizontal" style={{width: '100%'}}>
                    <Form.Item
                        label="Город"
                        name={`layouts.${layoutIndex}.city`}
                        className={styles.formItem}
                    >
                        <AutoComplete
                            name={`layouts.${layoutIndex}.city`}
                            value={values.layouts[layoutIndex].city || ''}
                            options={citiesOptions}
                            onChange={(value => {
                                setFieldValue(`layouts.${layoutIndex}.city`, value)
                                setSearchTerm(value)

                                if (citiesOptions.some(option => option.value === value)) {
                                    setSelectedCity(value)
                                } else {
                                    setSelectedCity('')
                                }
                            })}
                            onSelect={(value) => {
                                setSelectedCity(value)
                            }}
                            onClick={(e => {
                                if (e.target.value) {
                                    setSearchTerm(e.target.value)
                                }
                            })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Адрес"
                        name={`layouts.${layoutIndex}.building.addressOption`}
                        className={styles.formItem}
                    >
                        <Cascader
                            name={`layouts.${layoutIndex}.building.addressOption`}
                            options={addresses}
                            placeholder="Комплекс / Улица / Дом"
                            displayRender={(label, selectedOptions) => {
                                if (selectedOptions[0]) {
                                    setCurrentComplexName(selectedOptions[0]?.label)
                                }

                                return label[1] ? `${currentComplexName} / ${label[1]} / ${label[2]}` : ''
                            }}
                            onChange={((value) => {
                                setFieldValue(`layouts.${layoutIndex}.buildingId`, value[2])
                                setFieldValue(`layouts.${layoutIndex}.building.complexId`, value[0])
                            })}
                            onClick={getAddresses}
                        />
                    </Form.Item>
                    <Form.Item name={`layouts.${layoutIndex}.building`}>
                        <div className={styles.orNewBuildingContainer}>
                            <span>или</span>
                            <NewBuildingFormContainer layoutIndex={layoutIndex}/>
                        </div>
                    </Form.Item>
                </Space>
                <Form.Item
                    label="Описание планировки"
                    name={`layouts.${layoutIndex}.description`}
                >
                    <Input.TextArea
                        name={`layouts.${layoutIndex}.description`}
                        onChange={(e) =>
                            setFieldValue(`layouts.${layoutIndex}.description`, e.currentTarget.value)}
                    />
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewLayoutForm
