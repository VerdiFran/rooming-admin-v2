import React from 'react'
import styles from './Preloader.module.scss'
import preloaderImg from '../../../assets/images/preloader.svg'

const Preloader = () => {
    return (
        <div className={styles.preloaderContainer}>
            <img src={preloaderImg} alt='preloader'/>
        </div>
    )
}

export default Preloader
