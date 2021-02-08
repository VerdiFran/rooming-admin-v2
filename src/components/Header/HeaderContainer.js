import React from 'react'
import logo from './../../assets/images/building.png'
import styles from './Header.module.scss'
import {purple} from '@ant-design/colors'
import {compose} from 'redux'
import Header from './Header'
import {connect} from 'react-redux'
import {getUserData} from '../../utils/selectors/selectors'

const mapStateToProps = (state) => ({

})

export default compose(

)(Header)
