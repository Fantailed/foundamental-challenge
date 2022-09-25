import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { getCompanyDeals } from '../lib/api_requests';
import { dataTableGlobalSearchHeader, moneyFormatter, paginatorLeft, paginatorRight } from './dbdatatable';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';


export default function CompanyDealsDataTable() {
    const columns = [
        { field: 'name', header: 'Company Name' },
        { field: 'funding_round', header: 'Funding Round' },
        { field: 'funding_amount', header: 'Funding Amount', body: (rowData: any) => moneyFormatter(rowData.funding_amount)},
        { field: 'date', header: 'Deal Date' },
    ];

    const { data, isLoading } = getCompanyDeals();

    // Global search
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable/>;
    });

    return (
        <DataTable
            value={data} sortField="date" sortOrder={-1}
            header={() => dataTableGlobalSearchHeader(filters, setFilters)}
            filters={filters} onFilter={(e: any) => setFilters(e.filters)}
            responsiveLayout="scroll"
            loading={isLoading}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10} rowsPerPageOptions={[10, 20, 50]}
            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
            autoLayout={true}
            size="small"
        >
            {dynamicColumns}
        </DataTable>
    );
}
