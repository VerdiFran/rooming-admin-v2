import React from 'react'
import {Button} from 'antd'

type DrawerFooterProps = {
    onCancel: Array<() => void>,
    onSubmit: Array<() => void>
}

const DrawerFooter = (props: DrawerFooterProps) => {
    const {onCancel, onSubmit} = props
    
    return (
        <div style={{textAlign: 'right'}}>
            <Button
                onClick={() => {onCancel.forEach(action => action())}}
                style={{marginRight: 8}}
            >Отмена</Button>
            <Button
                htmlType="submit"
                onClick={() => {
                    onSubmit.forEach(action => action())
                }}
                type="primary"
            >Подтвердить</Button>
        </div>
    )
}

export default DrawerFooter
