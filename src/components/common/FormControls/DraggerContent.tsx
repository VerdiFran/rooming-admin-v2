import React from 'react'
import {InboxOutlined} from '@ant-design/icons'

const DraggerContent = () => {
    return (
        <>
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Щелкните или перетащите файл в эту область, чтобы
                                           загрузить</p>
            <p
                className="ant-upload-hint"
                style={{margin: '10px'}}
            >
                Поддерживаются изображения планировок в формате jpeg, jpg или png.
                Можно загрузить одно или несколько изображений.
            </p>
        </>
    )
}

export default DraggerContent
