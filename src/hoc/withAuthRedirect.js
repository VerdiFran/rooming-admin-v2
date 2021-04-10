import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { refreshSession } from '../redux/reducers/authReducer'
import Preloader from '../components/common/Preloader/Preloader'
import {getAccessToken, getIsAuth} from '../utils/selectors/selectors'

let mapStateToPropsForRedirect = (state) => ({
    isAuth: getIsAuth(state),
    accessToken: getAccessToken(state)
})

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        const [isChecked, setIsChecked] = useState(false)
        const [isAuth, setIsAuth] = useState(false)

        useEffect(() => {
            if (isChecked) {
                return
            }

            if (!props.isAuth) {
                props.refreshSession()
                    .then(() => {
                        setIsAuth(true)
                        setIsChecked(true)
                    })
                    .catch(() => {
                        setIsAuth(false)
                        setIsChecked(true)
                    })
            }
            else {
                const accessTokenInfo = jwtDecode(props.accessToken)
                const expiresIn = new Date(accessTokenInfo.exp * 1000)

                if (Date.now() > expiresIn) {
                    props.refreshSession()
                        .then(() => {
                            setIsAuth(true)
                            setIsChecked(true)
                        })
                        .catch(() => {
                            setIsAuth(false)
                            setIsChecked(true)
                        })
                }
                else {
                    setIsChecked(true)
                    setIsAuth(true)
                }
            }
        })

        if (!isChecked) return <Preloader />

        if (!isAuth) return <Redirect to="/login" />

        return <Component {...props} />
    }

    return connect(mapStateToPropsForRedirect, { refreshSession })(RedirectComponent)
}