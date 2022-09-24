import useSWR from "swr";

const API = 'http://localhost:20002/api'
const fetcher = (url: string) => fetch(url).then(res => res.json())

export function getCompanies() {
    const { data, error } = useSWR(API + '/companies', fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function getCompanyDeals() {
    const { data, error } = useSWR(API + '/company_deals', fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
