import {instanceForCitiesDB} from './commonAPI'

export const citiesDbAPI = {
    getCitiesByNamePrefix(prefix) {
        return instanceForCitiesDB.get(`cities?languageCode=ru&countryIds=Q159&limit=10&sort=-population&namePrefix=${prefix}`)
    }
}