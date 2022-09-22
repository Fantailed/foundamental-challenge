import useSWR from "swr"


const url = 'http://localhost:20002/api/company_deals'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function getCompanyDeals(): {
    data: any,
    isLoading: boolean,
    isError: boolean
} {
    const { data, error } = useSWR(url, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
