import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../../assets/images/building (1).png'
import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <NavLink to="/home">
            <div className={styles.logoContainer}>
                <img src={logo} alt="logo" className={styles.img}/>
                <span>Rooming</span>
            </div>
        </NavLink>
    )
}

export default Logo
