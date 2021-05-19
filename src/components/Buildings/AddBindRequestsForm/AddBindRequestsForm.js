import DrawerFooter from '../../common/FormControls/DrawerFooter'
import {Drawer} from 'antd'
import React from 'react'
import CompaniesDatabasesContainer from '../CompaniesDatabases/CompaniesDatabasesContainer'

/**
 * Add new bind request component.
 */
const AddBindRequestsForm = ({visible, setVisible, formik}) => {
    const onClose = () => setVisible(false)

    return (
        <Drawer
            title="Отправка новых заявок"
            width={820}
            onClose={onClose}
            visible={visible}
            bodyStyle={{paddingBottom: 80}}
            footer={
                <DrawerFooter
                    onCancel={[onClose]}
                    onSubmit={[formik.handleSubmit, onClose]}
                />
            }
        >
            <CompaniesDatabasesContainer
                formik={formik}
            />
        </Drawer>
    )
}

export default AddBindRequestsForm