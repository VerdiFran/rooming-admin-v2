import styles from './SessionsSelector.module.scss'
import React, {useEffect, useState} from 'react'
import {Input, List} from "antd";
import ActionButton from "../ActionButton/ActionButton";
import {SearchOutlined} from "@ant-design/icons";

/**
 * Component for selection of session.
 * @param handleOptionsUpdate Options update handler.
 * @param updatingTime Sleeping time before send request.
 * @param handleSelection Option selection handler.
 */
const SessionsSelector = ({handleOptionsUpdate, updatingTime, handleSelection}) => {

    const [options, setOptions] = useState([])
    const [namePart, setNamePart] = useState('')
    let currentNamePart = namePart

    const optionsUpdate = async () => {
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

    return <div className={styles.selectorContainer}>
        <Input
            value={namePart}
            placehoder="Имя сессии"
            addonAfter={<SearchOutlined/>}
            onChange={(event) => {
                currentNamePart = event.target.value
                setNamePart(event.target.value)
            }}
            style={{width: '95%'}}
        />
        <List
            dataSource={options}
            renderItem={item =>
                <List.Item actions={getActions(item)}>
                    <List.Item.Meta title={item.name}/>
                </List.Item>
            }
        />
    </div>
}

export default SessionsSelector