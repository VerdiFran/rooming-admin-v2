import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {
    renderDatepicker,
    renderFileUploader, renderGroupAddressInput,
    renderInput,
    renderTextarea
} from '../../../common/FormControls/FormControls'
import {required} from '../../../../utils/validators/validators'
import {Card, Button, Drawer, Space} from 'antd'
import {IdGenerator} from '../../../../utils/generators/generators'
import NewBuildingFormContainer from './NewBuildingForm/NewBuildingFormContainer'

const NewLayoutForm = ({lId, buildingOptions, cities, handleSubmit}) => {
    const buildingOptionsIdIterator = IdGenerator()

    return (
        <Card
            hoverable
            title={`Планировка ${lId + 1}`}
            size="small"
            /*
                        extra={<Button style={{margin: 0, padding: 0, border: 'none', fontSize: '20px'}}><CloseSquareOutlined/></Button>}
            */
        >
            {/*<Space direction="vertical">
                <Field
                    component={renderFileUploader}
                    name={`layouts.${lId}.files`}
                    validate={[required]}
                />
                <Space direction="horizontal" style={{marginRight: '10px'}} align="start">
                    <Field
                        component={renderInput}
                        name={`layouts.${lId}.buildingCity`}
                        label="Город"
                        validate={[required]}
                        id={lId}
                        key={lId}
                    />
                    <Field
                        component="select"
                        name={`layouts.${lId}.buildingCity`}
                    >
                        <option/>
                        {
                            cities.map(city => <option value={city}>{city}</option>)
                        }
                    </Field>
                    <Field
                        component="select"
                        name={`layouts.${lId}.buildingAddress`}
                    >
                        <option/>
                        {
                            buildingOptions.map(option =>
                                option.children.map(child => <option value={child.value}>{`${option.label} / ${child.label}`}</option>)
                            )
                        }
                    </Field>
                </Space>
                <Space direction="horizontal">
                    <NewBuildingFormContainer lId={lId}/>
                </Space>
                <Field
                    component={renderTextarea}
                    label="Описание планировки"
                    name={`${lId}.layoutDescription`}
                />
            </Space>*/}
        </Card>
    )
}

//const NewLayoutReduxForm = reduxForm({form: 'newLayoutForm'})(NewLayoutForm)

export default NewLayoutForm
