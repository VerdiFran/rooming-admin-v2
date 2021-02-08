import {buildingsAPI} from '../../api/buildingsAPI'

const SET_FINISHED_BUILDINGS = 'SET-FINISHED-BUILDINGS'

export type InitialStateType = {
    buildings: Array<any>,
    buildingComplexes: Array<any>
}

const initialState: InitialStateType = {
    /*buildings: [
        {
            id: 2,
            address: {
                id: 2,
                city: 'City 1',
                streetAndHouse: 'Street 1'
            },
            description: 'string',
            layouts: [
                {
                    id: 1,
                    description: 'layout 1'
                }
            ]
        },
        {
            id: 7,
            address: {
                id: 2,
                city: 'City 1',
                streetAndHouse: 'Street 88'
            },
            description: 'string',
            layouts: [
                {
                    id: 1,
                    description: 'layout 1'
                }
            ]
        },
    ],
    buildingComplexes: [
        {
            id: 1,
            address: {
                id: 1,
                city: 'City 1',
                streetAndHouse: 'Street 1'
            },
            name: 'Complex name',
            description: 'string',
            buildings: [
                {
                    id: 2,
                    address: {
                        id: 2,
                        city: 'City 1',
                        streetAndHouse: 'Street 1'
                    },
                    description: 'string',
                    layouts: [
                        {
                            id: 1,
                            description: 'layout 1'
                        },
                        {
                            id: 2,
                            description: 'layout 2'
                        },
                        {
                            id: 3,
                            description: 'layout 3'
                        },
                    ]
                }
            ]
        }
    ]*/
    buildings: [],
    buildingComplexes: []
}


const buildingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FINISHED_BUILDINGS:
            return {
                ...state,
                ...action.finishedBuildings
            }
        default:
            return state
    }
}

const setFinishedBuildings = (finishedBuildings: Array<any>) => ({type: SET_FINISHED_BUILDINGS, finishedBuildings})

export const getFinishedCompanyBuildings = () => async (dispatch: any) => {
    const response = await buildingsAPI.getFinishedBuildings()
    dispatch(setFinishedBuildings(response.data))
}

export default buildingsReducer
