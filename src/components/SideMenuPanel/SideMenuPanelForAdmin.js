import React from 'react'
import {Menu} from 'antd'
import {MailOutlined, SettingOutlined} from '@ant-design/icons'
import styles from './SideMenuPanel.module.scss'
import {NavLink, Redirect} from 'react-router-dom'
import {getUserRole} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {withPermission} from '../../hoc/withPermission'
import {ADMIN} from '../../redux/userRoles'
import {connect} from 'react-redux'

const SideMenuPanelForAdmin = ({userRole, subMenuStyle}) => {
    const {SubMenu} = Menu

    const rootSubmenuKeys = ['sub1', 'sub2']

    const [openKeys, setOpenKeys] = React.useState(['sub1'])

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    return (
        <div className={styles.menuPanel}>
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{backgroundColor: 'transparent'}}
            >
                <SubMenu key="sub1" icon={<MailOutlined/>} title="Модели" style={subMenuStyle}>
                    <Menu.Item key="1"><NavLink to="/orders">Заказы</NavLink></Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default SideMenuPanelForAdmin
