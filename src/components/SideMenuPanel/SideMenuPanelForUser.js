import React from 'react'
import {Menu} from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import styles from './SideMenuPanel.module.scss'

const SideMenuPanelForUser = ({subMenuStyle}) => {
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
                <SubMenu key="sub1" title="Модели" style={subMenuStyle}>
                    <Menu.Item key="1">Модели компании</Menu.Item>
                    <Menu.Item key="2">Заказ модели</Menu.Item>
                    <Menu.Item key="3">Статистика по моделям</Menu.Item>
                    <Menu.Item key="4">Настройки моделей</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<SettingOutlined/>} title="Профиль пользователя" style={subMenuStyle}>
                    <Menu.Item key="5">Настройки профиля</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined/>} title="Профиль компании" style={subMenuStyle}>
                    <Menu.Item key="9">Добавление администратора</Menu.Item>
                    <Menu.Item key="10">Настройки профиля</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default SideMenuPanelForUser
