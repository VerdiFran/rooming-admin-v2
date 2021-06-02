import styles from './SessionsSelector.module.scss'
import React, {useEffect, useState} from 'react'
import {Button, Input, List, Space, Typography} from 'antd'
import ActionButton from '../ActionButton/ActionButton'
import {SearchOutlined} from '@ant-design/icons'

/**
 * Component for selection of session.
 * @param handleOptionsUpdate Options update handler.
 * @param updatingTime Sleeping time before send request.
 * @param handleSelection Option selection handler.
 */
const SessionsSelector = ({handleOptionsUpdate, updatingTime, handleSelection, handleAddSession}) => {
    const {Text} = Typography

    const [options, setOptions] = useState([])
    const [namePart, setNamePart] = useState('')
    let currentNamePart = namePart

    const [newSessionName, setNewSessionName] = useState('')

    const optionsUpdate = () => {
        if (currentNamePart !== namePart) {
            return
        }

        handleOptionsUpdate(5, namePart)
            .then(result => {
                setOptions(result)
            })
    }

    useEffect(() => {
        setTimeout(optionsUpdate, updatingTime)
    }, [namePart])

    const getActions = (record) => ([<ActionButton title={'Выбрать'} handleClick={() => handleSelection(record.id)}/>])

    return <Space className={styles.fullSpaceWidth} direction="vertical" size="small">
        {
            !namePart &&
            <Space className={styles.fullSpaceWidth} direction="vertical">
                <Text>Дайте имя новой сессии</Text>
                <Input
                    value={newSessionName}
                    placeholder="Имя сессии"
                    onChange={(event) => setNewSessionName(event.target.value) }
                />
                {
                    newSessionName &&
                    <Button
                        onClick={() => handleAddSession(newSessionName)}
                        className={styles.submitButton}
                        type="primary">Ок</Button>
                }
            </Space>
        }
        {
            !newSessionName &&
            <Space className={styles.fullSpaceWidth} direction="vertical">
                {
                    namePart && <Text>Выберете существующую сессию</Text>
                }
                {
                    !namePart && <Text>или выберете существующую сессию</Text>
                }
                <Input
                    value={namePart}
                    placeholder="Имя сессии"
                    addonAfter={<SearchOutlined/>}
                    onChange={(event) => {
                        currentNamePart = event.target.value
                        setNamePart(event.target.value)
                    }}
                />
                <List
                    dataSource={options}
                    renderItem={item =>
                        <List.Item actions={getActions(item)}>
                            <List.Item.Meta title={item.name}/>
                        </List.Item>
                    }
                />
            </Space>
        }
    </Space>
}

export default SessionsSelector