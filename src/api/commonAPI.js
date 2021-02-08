import * as axios from 'axios'
import {Agent} from "https"

export const instance = axios.create({
    baseURL: 'https://192.168.0.2:5001/api',
    httpsAgent: new Agent({
        rejectUnauthorized: false
    })
})

export const instanceForDownloadFile = axios.create({
    baseURL: 'https://192.168.0.2:5001/api',
    httpsAgent: new Agent({
        rejectUnauthorized: false
    }),
    responseType: 'blob'
})
