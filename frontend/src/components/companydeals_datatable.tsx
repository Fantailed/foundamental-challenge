import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { getCompanyDeals } from '../lib/api_requests';
import { moneyFormatter } from './dbdatatable';


export default function CompanyDealsDataTable() {
    const columns = [
        { field: 'name', header: 'Company Name' },
        { field: 'funding_round', header: 'Funding Round' },
        { field: 'funding_amount', header: 'Funding Amount', body: (rowData: any) => moneyFormatter(rowData.funding_amount)},
        { field: 'date', header: 'Deal Date' },
    ];

    const { data, isLoading } = getCompanyDeals();

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable/>;
    });

    return (
        <DataTable value={data} sortField="date" sortOrder={-1} scrollable scrollHeight="500px" loading={isLoading}>
            {dynamicColumns}
        </DataTable>
    );
}
