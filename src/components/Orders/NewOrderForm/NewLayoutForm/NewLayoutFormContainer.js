import React, {useEffect, useState} from 'react'
import {getAddresses, getCities} from '../../../../utils/selectors/selectors'
import {connect} from 'react-redux'
import NewLayoutForm from './NewLayoutForm'
import {getAddressesByCityName, getCitiesByNamePrefix} from '../../../../redux/reducers/ordersReducer'
import {connect as formikConnect} from 'formik'
import useDebounce from '../../../../hooks/useDebounce'

const mapStateToProps = (state) => ({
    cities: getCities(state),
    addresses: getAddresses(state)
})

function NewLayoutFormContainer(props) {
    const {
        layoutIndex,
        cities,
        addresses,
        formik,
        getCitiesByNamePrefix,
        getAddressesByCityName,
        remove
    } = props

    const [citiesOptions, setCitiesOptions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (cities !== citiesOptions) {
            setCitiesOptions(Array.from(new Set(cities)).map(city => ({value: city})))
            setIsSearching(false)
        }
    }, [cities])

    const debouncedSearchTerm = useDebounce(searchTerm, 1000)

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            getCitiesByNamePrefix(searchTerm)
        }
    }, [debouncedSearchTerm])

    const [selectedCity, setSelectedCity] = useState('')
    const [cityAddresses, setCityAddresses] = useState([])

    const getAddressesByCurrentCity = () => getAddressesByCityName(selectedCity)

    useEffect(() => {
        if (selectedCity.length) {
            getAddressesByCurrentCity()
        } else {
            setCitiesOptions([])
            setCityAddresses([])
        }
    }, [selectedCity])

    useEffect(() => {
        if (selectedCity.length) {
            setCityAddresses(addresses[selectedCity])
        }
    }, [addresses])

    return <NewLayoutForm
        layoutIndex={layoutIndex}
        formik={formik}
        addresses={cityAddresses}
        citiesOptions={citiesOptions}
        selectedCity={selectedCity}
        getAddresses={getAddressesByCurrentCity}
        remove={remove}
        setSearchTerm={setSearchTerm}
        setSelectedCity={setSelectedCity}
    />
}

export default connect(
    mapStateToProps,
    {getAddressesByCityName, getCitiesByNamePrefix}
)(formikConnect(NewLayoutFormContainer))
