import {instance, instanceForDownloadFile} from './commonAPI'
import download from 'js-file-download'

export const buildingsAPI = {
    getFinishedBuildings() {
        return instance.get('company/buildings')
    },
    downloadFile(layoutId)  {
        instanceForDownloadFile.get(`company/buildings/layouts/${layoutId}`)
            .then(response => {
                download(response.data, `model-${layoutId}.zip`);
            })
    }
}
