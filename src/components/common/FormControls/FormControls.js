import React from 'react'
import styles from '../../Login/LoginCard/AuthForm/AuthForm.module.scss'
import {Select, Form, Cascader, DatePicker, Tooltip, Checkbox, Input, Upload, message} from 'antd'
import {WarningFilled, InboxOutlined} from '@ant-design/icons'
import {change} from 'redux-form'

const hasError = (valid, touched) => !valid && touched

const {Option} = Select

export const renderInput = ({input, meta: {touched, error, valid}, label, ...fields}) => {
    return (
        <Form.Item
            label={label}
            validateStatus={hasError(valid, touched) && 'error'}
            help={hasError(valid, touched) && 'Поле обязательно для заполнения.'}
        >
            <Input {...input} {...fields}/>
            {/*{hasError(valid, touched) && <Tooltip title="Поле обязательно для заполнения.">
                <WarningFilled className={styles.errorIcon}/></Tooltip>}*/}
        </Form.Item>
    )
}

export const renderPasswordInput = ({input, meta: {touched, error, valid}, label, ...fields}) => {
    return (
        <Form.Item label={label}>
            <Input.Password {...input} {...fields}/>
            {/*{hasError(valid, touched) && <Tooltip title="Поле обязательно для заполнения.">
                <WarningFilled className={styles.errorIcon}/>
            </Tooltip>}*/}
        </Form.Item>
    )
}

export const MyCheckbox = ({input, label, ...fields}) => {
    return (
        <Form.Item>
            <Checkbox {...input} {...fields}>{label}</Checkbox>
        </Form.Item>
    )
}

export const renderTextarea = ({input, meta: {touched, error, valid}, label, ...fields}) => {
    return (
        <Form.Item label={label}>
            <Input.TextArea {...input} {...fields} autoSize={{minRows: 2, maxRows: 6}}/>
        </Form.Item>
    )
}

export const renderDatepicker = ({input, meta: {touched, error, valid}, label, ...fields}) => {
    return (
        <Form.Item label={label}>
            <DatePicker format="DD/MM/YYYY" {...input} {...fields}/>
        </Form.Item>
    )
}

export const renderFileUploader = ({input, meta: {touched, error, valid}, label, ...fields}) => {
    const {Dragger} = Upload

    const props = {
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
        <Form.Item label={label}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Щелкните или перетащите файл в эту область, чтобы загрузить</p>
                <p className="ant-upload-hint">
                    Поддерживаются изображения планировок в формате jpeg, jpg или png. Можно загрузить одно или
                    несколько изображений.
                </p>
            </Dragger>
        </Form.Item>
    )
}

export const renderCascader = ({input, meta: {touched, error, valid}, options, label, ...fields}) => {

    const displayRender = (label) => {
        return label[label.length - 1]
    }

    return (
        <Form.Item label={label}>
            <Cascader {...input} {...fields}
                      options={options}
                      changeOnSelect
            />
        </Form.Item>
    )
}

export const renderSelector = (props) => {

    const {input, meta: {touched, error, valid, form, dispatch}, options, label, onChange, ...fields} = props

    return (
        <Form.Item label={label}>
            <Select {...input} {...fields}>
                {
                    options.map(option => <Option value={option.value}>{option.label}</Option>)
                }
            </Select>
        </Form.Item>
    )
}
