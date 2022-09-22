import useSWR from "swr"
import { DataTableFormatSpec } from "../components/data_table"


const url = 'http://localhost:20002/api/company_deals'
const fetcher = (url: string) => fetch(url).then(res => res.json())

export const companyDealFormat: DataTableFormatSpec = [
    {'Company Name': 'name'},
    {'Funding Round': 'funding_round'},
    {'Funding Amount': 'funding_amount'},
    {'Deal Date': 'date'}
]

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
