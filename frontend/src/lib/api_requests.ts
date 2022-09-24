import useSWR from "swr";

const API = 'http://localhost:20002/api'
const fetcher = (url: string) => fetch(url).then(res => res.json())

export function getCompanies() {
    const { data, error, mutate } = useSWR(API + '/companies', fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate: mutate
    }
}

interface CompanyPatch {
    id: number,
    name?: string
    description?: string
    country?: string
    founding_date?: string  // ISO Format without tz
}

export function patchCompany(patch: CompanyPatch) {
    fetch(API + '/companies', {
        method: 'PATCH',
        body: JSON.stringify(patch),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

export function getCompanyDeals() {
    const { data, error } = useSWR(API + '/company_deals', fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
