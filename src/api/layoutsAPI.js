import {instance, instanceForDownloadFile} from './instances'
import download from 'js-file-download'

export const layoutsAPI = {
    getBuildingsWithCompletedLayouts(page, pageSize) {
        return instance.get(`company/buildings?pageNumber=${page}&pageSize=${pageSize}`)
    },
}