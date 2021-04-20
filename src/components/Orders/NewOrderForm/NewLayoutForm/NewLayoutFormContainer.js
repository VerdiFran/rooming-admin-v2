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
    const [citiesOptions, setCitiesOptions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (props.cities !== citiesOptions) {
            setCitiesOptions(Array.from(new Set(props.cities)).map(city => ({value: city})))
            setIsSearching(false)
        }
    }, [props.cities])

    const debouncedSearchTerm = useDebounce(searchTerm, 1000)

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            props.getCitiesByNamePrefix(searchTerm)
        }
    }, [debouncedSearchTerm])

    return <NewLayoutForm
        layoutIndex={props.layoutIndex}
        addresses={props.addresses}
        citiesOptions={citiesOptions}
        getAddresses={props.getAddressesByCityName}
        remove={props.remove}
        setSearchTerm={setSearchTerm}
        {...props}
    />
}

export default connect(
    mapStateToProps,
    {getAddressesByCityName, getCitiesByNamePrefix}
)(formikConnect(NewLayoutFormContainer))
