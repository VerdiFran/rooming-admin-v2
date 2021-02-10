import React, {useState} from 'react'
import {InboxOutlined, UserOutlined} from '@ant-design/icons'
import {
    renderDatepicker,
    renderFileUploader, renderGroupAddressInput,
    renderInput,
    renderTextarea
} from '../../../common/FormControls/FormControls'
import {required} from '../../../../utils/validators/validators'
import {Card, Button, Drawer, Space, Upload, message, Input, Descriptions, Form} from 'antd'
import {IdGenerator} from '../../../../utils/generators/generators'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'
import {Formik} from 'formik'

const NewLayoutForm = ({lId, buildingOptions, cities, handleSubmit}) => {
    const buildingOptionsIdIterator = IdGenerator()

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
            title={`Планировка ${lId + 1}`}
            size="small"
        >
            <Formik
                initialValues={{}}
                onSubmit={{}}
            >
                {({
                      handleChange,
                      handleBlur,
                      setFieldValue,
                      handleSubmit,
                      values
                  }) => (
                    <Form>
                        <Space direction="vertical">
                            <Upload.Dragger
                                name={`layouts.${lId}.files`}
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
                                <Form.Item label="">
                                    <Input
                                        name={`layouts.${lId}.buildingCity`}
                                    />
                                </Form.Item>
                                <Form.Item label="">
                                    <Input
                                        name={`layouts.${lId}.buildingAddress`}
                                    />
                                </Form.Item>
                                <span>или</span>
                                <NewBuildingFormContainer/>
                                <Form.Item label="Описание планировки">
                                    <Input
                                        name={`layouts.${lId}.layoutDescription`}
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
