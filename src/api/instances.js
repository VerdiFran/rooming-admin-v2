import * as axios from 'axios'
import {Agent} from "https"

export const instance = axios.create({
    baseURL: 'http://' + (process.env.REACT_APP_SERVER_HOST || window.location.hostname) + ':' +
        process.env.REACT_APP_SERVER_PORT + '/api',
    withCredentials: true,
    httpsAgent: new Agent({
        rejectUnauthorized: false
    })
})

export const instanceForDownloadFile = axios.create({
    baseURL: 'http://' + (process.env.REACT_APP_SERVER_HOST || window.location.hostname) + ':' +
        process.env.REACT_APP_SERVER_PORT + '/api',
    httpsAgent: new Agent({
        rejectUnauthorized: false
    }),
    responseType: 'blob'
})

export const instanceForCitiesDB = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
    headers: {
        'x-rapidapi-key': '7653ff45ebmsh20cbf8fe3083e55p1e93e6jsnf72b29966f77',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
})
