import {instance, instanceForDownloadFile} from './instances'
import {message} from 'antd'

let token

export const authAPI = {
    async login(email, password, rememberMe = false) {
        try {
            const response = await instance.post('auth', {email, password, rememberMe})

            token = response.data.accessToken
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            instanceForDownloadFile.defaults.headers.common['Authorization'] = `Bearer ${token}`

            return response
        } catch (error) {
            message.error('Неправильный логин или пароль')
        }
    },
    me() {
        return instance.get('auth')
    },
    async refresh() {
        const response = await instance.post('auth/refresh')

        token = response.data.accessToken
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        instanceForDownloadFile.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return response
    },
    /**
     * Logout request
     * @returns {Promise<*>}
     */
    async logout() {
        const response = await instance.post('auth/logout')

        instance.defaults.headers.common['Authorization'] = ''
        instanceForDownloadFile.defaults.headers.common['Authorization'] = ''

        return response
    }
}
