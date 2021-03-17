import {instance, instanceForDownloadFile} from './instances'
import download from 'js-file-download'

export const buildingsAPI = {
    getFinishedBuildings() {
        return instance.get('company/layouts')
    },
    downloadFile(layoutId)  {
        instanceForDownloadFile.get(`company/buildings/layouts/${layoutId}`)
            .then(response => {
                download(response.data, `model-${layoutId}.zip`);
            })
    }
}
