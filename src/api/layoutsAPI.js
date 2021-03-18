import {instance, instanceForDownloadFile} from './instances'
import download from 'js-file-download'

export const layoutsAPI = {
    getCompletedLayouts() {
        return instance.get('company/layouts')
    },
}
