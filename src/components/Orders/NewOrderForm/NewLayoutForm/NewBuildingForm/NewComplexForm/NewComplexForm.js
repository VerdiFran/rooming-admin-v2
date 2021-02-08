import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {
    renderDatepicker,
    renderFileUploader,
    renderInput,
    renderTextarea
} from '../../../../../common/FormControls/FormControls'
import {required} from '../../../../../../utils/validators/validators'
import {Button, Drawer, Space} from 'antd'
import {renderCascader} from '../../../../../common/FormControls/FormControls'
import styles from './NewComplexForm.module.scss'
import NewComplexFormContainer from './NewComplexFormContainer'

const NewComplexForm = ({lId, handleSubmit}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button type="link" onClick={() => setVisible(true)}>новый комплекс</Button>
            <Drawer
                title="Добавление нового комплекса"
                width={400}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            setVisible(false)
                            handleSubmit()
                        }} type="primary">
                            Подтвердить
                        </Button>
                    </div>
                }
            >
                <form className={styles.form}>

                </form>
            </Drawer>
        </>
    )
}

// const NewComplexReduxForm = reduxForm({form: 'newComplexForm'})(NewComplexForm)

export default NewComplexForm
