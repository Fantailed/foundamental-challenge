import useSWR from "swr"
import { DataTableData, DataTableFormatSpec } from "../components/data_table"


export interface CompanyDealData extends DataTableData {
    id: number,
    date: string,
    funding_amount: number,
    funding_round: string,
    name: string
}


const url = 'http://localhost:20002/api/company_deals'
const fetcher = (url: string) => fetch(url).then(res => res.json())

export function getCompanyDeals(): {
    data: CompanyDealData[],
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

export const companyDealFormat: DataTableFormatSpec = [
    ['Company Name', 'name'],
    ['Funding Round', 'funding_round'],
    ['Funding Amount', 'funding_amount'],
    ['Deal Date', 'date']
]
