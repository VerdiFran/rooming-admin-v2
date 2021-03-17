import React from 'react'
import {Menu} from 'antd'
import {MailOutlined, SettingOutlined} from '@ant-design/icons'
import styles from './SideMenuPanel.module.scss'
import {NavLink, Redirect} from 'react-router-dom'
import {getUserRoles} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {withPermission} from '../../hoc/withPermission'
import {ADMIN, EMPLOYEE} from '../../redux/userRoles'
import {connect} from 'react-redux'
import SideMenuPanelForAdmin from './SideMenuPanelForAdmin'

const SideMenuPanelForEmployee = ({userRole, subMenuStyle}) => {
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
                    <Menu.Item key="2"><NavLink to="/buildings">Готовые модели</NavLink></Menu.Item>
                    {/*<Menu.Item key="4">Настройки моделей</Menu.Item>*/}
                </SubMenu>
                {/*<SubMenu key="sub2" icon={<SettingOutlined/>} title="Профиль пользователя" style={subMenuStyle}>
                    <Menu.Item key="5">Настройки профиля</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined/>} title="Профиль компании" style={subMenuStyle}>
                    <Menu.Item key="9">Добавление администратора</Menu.Item>
                    <Menu.Item key="10">Настройки профиля</Menu.Item>
                </SubMenu>*/}
            </Menu>
        </div>
    )
}

export default SideMenuPanelForEmployee
