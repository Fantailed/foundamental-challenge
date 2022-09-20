
export async function getCompanyDeals() {
    const res = await fetch('localhost:20002/api/company_deals');
    return res.json();
}
