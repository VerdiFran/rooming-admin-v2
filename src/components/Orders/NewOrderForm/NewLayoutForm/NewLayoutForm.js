import React, {useEffect, useState} from 'react'
import {Card, Input, Space, Upload, message, Form, AutoComplete, Cascader, Modal, Button} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'
import useDebounce from '../../../../hooks/useDebounce'
import styles from './NewLayoutForm.module.scss'
import DraggerContent from '../../../common/FormControls/DraggerContent'

const NewLayoutForm = (props) => {
    const {
        layoutIndex,
        formik: {setFieldValue},
        cities,
        addresses,
        getAddresses,
        getCitiesByNamePrefix,
        remove
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
    }, [cities])

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            getCitiesByNamePrefix(searchTerm)
        }
    }, [debouncedSearchTerm])

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
            extra={<Button
                type="link"
                onClick={() => {
                    remove(layoutIndex)
                }}
            ><CloseOutlined/></Button>}
        >
            <Form
                layout="vertical"
            >
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
                    <Form.Item label="Город" className={styles.formItem}>
                        <AutoComplete
                            name={`layouts.${layoutIndex}.city`}
                            options={citiesOptions}
                            onChange={(value => {
                                setFieldValue(`layouts.${layoutIndex}.building.address.city`, value)
                                setSearchTerm(value)
                            })}
                            onSelect={(value) => getAddresses(value)}
                        />
                    </Form.Item>
                    <Form.Item label="Адрес" className={styles.formItem}>
                        <Cascader
                            options={addresses}
                            /*value={[
                                values.layouts[layoutIndex].building.complexId,
                                values.layouts[layoutIndex].building.complex.name,
                                values.layouts[layoutIndex].buildingId
                            ]}*/
                            onChange={(value => {
                                setFieldValue(`layouts.${layoutIndex}.buildingId`, value[2])
                                setFieldValue(`layouts.${layoutIndex}.building.complexId`, value[0])
                            })}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.orNewBuildingContainer}>
                            <span>или</span>
                            <NewBuildingFormContainer layoutIndex={layoutIndex}/>
                        </div>
                    </Form.Item>
                </Space>
                <Form.Item label="Описание планировки">
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
