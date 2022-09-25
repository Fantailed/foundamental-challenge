import useSWR from "swr";

const API = 'http://localhost:20002/api'
const fetcher = (url: string) => fetch(url).then(res => res.json())

//#region Generics
function apiGet(resource: string) {
    const { data, error, mutate } = useSWR(API + resource, fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate: mutate
    };
}

function apiPatch<Type>(resource: string, patch: Type): void {
    fetch(API + resource, {
        method: 'PATCH',
        body: JSON.stringify(patch),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
//#endregion


export function getCompanies() {
    return apiGet('/companies');
}

interface CompanyPatch {
    id: number,
    name?: string,
    description?: string,
    country?: string,
    founding_date?: string,  // ISO Format without tz
}

export function patchCompany(patch: CompanyPatch) {
    apiPatch('/companies', patch);
}


export function getDeals() {
    return apiGet('/deals');
}

interface DealPatch {
    id: number,
    date?: string,  // ISO Format without tz
    funding_amount?: number,
    funding_round?: string,
    company_id?: number,
}

export function patchDeal(patch: DealPatch) {
    apiPatch('/deals', patch);
}


export function getCompanyDeals() {
    return apiGet('/company_deals');
}
