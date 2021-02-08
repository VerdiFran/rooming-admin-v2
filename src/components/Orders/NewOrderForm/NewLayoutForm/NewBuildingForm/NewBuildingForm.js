import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {
    renderDatepicker,
    renderFileUploader,
    renderInput, renderSelector,
    renderTextarea
} from '../../../../common/FormControls/FormControls'
import {required} from '../../../../../utils/validators/validators'
import {Button, Drawer, Select, Space} from 'antd'
import {renderCascader} from '../../../../common/FormControls/FormControls'
import NewComplexFormContainer from './NewComplexForm/NewComplexFormContainer'

const NewBuildingForm = ({complexOptions, lId, handleSubmit, setComplexSelectChanges}) => {
    const [visible, setVisible] = useState(false)
    const [complexId, setComplexId] = useState(null)

    return (
        <>
            <span>или</span>
            <Button
                type="link"
                onClick={() => setVisible(true)}
            >новое здание</Button>
            <Drawer
                title="Добавление нового здания"
                width={500}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            handleSubmit()
                            setVisible(false)
                        }} type="primary">
                            Подтвердить
                        </Button>
                    </div>
                }
            >
                <form>
                    <Space direction="vertical">

                    </Space>
                </form>
            </Drawer>
        </>
    )
}

/*const NewBuildingReduxForm = reduxForm({
    form: 'newBuildingForm'
})(NewBuildingForm)*/

export default NewBuildingForm
