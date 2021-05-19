import React, {useEffect, useState} from 'react'
import CompaniesDatabases from './CompaniesDatabases'
import {message} from 'antd'
import useDebounce from '../../../hooks/useDebounce'
import {companiesAPI} from '../../../api/companiesAPI'

/**
 * Container for database component.
 */
const CompaniesDatabasesContainer = ({formik}) => {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)

    const downloadCompanies = async (city, name) => {
        setLoading(true)

        try {
            const response = await companiesAPI.getCompanies(1, 10, name, true, city)
            setCompanies(response.data.content.map(company => ({...company, createdAt: new Date(company.createdAt)})))
        } catch (e) {
            message.error(e.toString())
        }

        setLoading(false)
    }

    useEffect(() => {
        downloadCompanies(formik.values.city)
    },  [])

    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
        if (debouncedSearchTerm) {
            downloadCompanies(formik.values.city, debouncedSearchTerm).then()
        }
    }, [debouncedSearchTerm])

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm)
    }

    return <CompaniesDatabases
        formik={formik}
        companies={companies}
        loading={loading}
        handleSearch={handleSearch}
    />
}

export default CompaniesDatabasesContainer
