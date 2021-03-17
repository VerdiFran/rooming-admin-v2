import * as axios from 'axios'
import {Agent} from 'https'
import {instance} from './instances'

let token

export const authAPI = {
    async login(email, password, rememberMe = false) {
        const response = await instance.post('auth', {email, password, rememberMe})

        token = response.data.accessToken
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return response
    },
    me() {
        return instance.get('auth')
    }
}
