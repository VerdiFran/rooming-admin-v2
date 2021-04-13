import {instance, instanceForDownloadFile} from './instances'
import download from 'js-file-download'

export const buildingsAPI = {
    /**
     * Returns buildings with completed layouts.
     * @param page Page number.
     * @param pageSize Page size.
     */
    getBuildingsWithCompletedLayouts(page: number, pageSize: number) {
        return instance.get(`company/buildings?pageNumber=${page}&pageSize=${pageSize}`)
    },

    /**
     * Downloads file with layout model.
     * @param buildingId Id of building that contains required layout.
     * @param layoutId Id of required layout.
     */
    downloadFile(buildingId: number, layoutId: number)  {
        instanceForDownloadFile.get(`company/buildings/${buildingId}/layouts/${layoutId}/model`)
            .then((response: any) => {
                download(response.data, `model-${layoutId}.zip`);
            })
    }
}
