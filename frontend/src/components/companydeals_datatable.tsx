import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCompanyDeals } from '../lib/api_requests';


export default function CompanyDealsDataTable() {
    const columns = [
        { field: 'name', header: 'Company Name' },
        { field: 'funding_round', header: 'Funding Round' },
        { field: 'funding_amount', header: 'Funding Amount' },
        { field: 'date', header: 'Deal Date' },
    ];

    const { data, isLoading } = getCompanyDeals();

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} sortable/>;
    });

    return (
        <DataTable value={data} sortField="date" sortOrder={-1} scrollable scrollHeight="500px" loading={isLoading}>
            {dynamicColumns}
        </DataTable>
    );
}
