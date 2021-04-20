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
        formik: {setFieldValue},
        citiesOptions,
        addresses,
        getAddresses,
        setSearchTerm,
        remove
    } = props

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    const [files, setFiles] = useState([])

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
                    <Upload.Dragger
                        style={{width: '100%'}}
                        name={`layouts.${layoutIndex}.files`}
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
                                setFieldValue(`layouts.${layoutIndex}.files`, [...files])
                            } else if (status === 'error') {
                                message.error(`${info.file.name} file upload failed.`)
                            }
                        }}
                        onPreview={handlePreview}
                    >
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
                            options={citiesOptions}
                            onChange={(value => {
                                setFieldValue(`layouts.${layoutIndex}.city`, value)
                                setSearchTerm(value)
                            })}
                            onSelect={(value) => getAddresses(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Адрес"
                        name={`layouts.${layoutIndex}.building.address`}
                        className={styles.formItem}
                    >
                        <Cascader
                            name={`layouts.${layoutIndex}.building.address`}
                            options={addresses}
                            displayRender={(label, selectedOptions) => {
                                if (selectedOptions[0]) {
                                    setCurrentComplexName(selectedOptions[0].label)
                                }
                                return label[1] ? `${currentComplexName} / ${label[1]} / ${label[2]}` : ''
                            }}
                            onChange={((value) => {
                                setFieldValue(`layouts.${layoutIndex}.buildingId`, value[2])
                                setFieldValue(`layouts.${layoutIndex}.building.complexId`, value[0])
                            })}
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
