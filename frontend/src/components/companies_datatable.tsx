import React, { useState } from 'react';
import { DataTable, DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { getCompanies, patchCompany } from '../lib/api_requests';
import { dataTableGlobalSearchHeader, dateTimeEditor, paginatorLeft, paginatorRight, textEditor } from '../lib/datatable_utils';


export default function CompaniesDataTable() {
    const { data: companyData, isLoading, mutate } = getCompanies();

    // Row Editing
    const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
        let { index, newData } = e;
        companyData[index] = newData;

        // API PATCH request
        patchCompany(newData);
        // Optimistically update state in client
        mutate(companyData);
    }

    // Global search
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });


    return (
        <DataTable
            value={companyData}
            dataKey="id"
            editMode="row"
            onRowEditComplete={onRowEditComplete}
            responsiveLayout="scroll"
            loading={isLoading}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10} rowsPerPageOptions={[10, 20, 50]}
            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
            autoLayout={true}
            size="small"
            header={() => dataTableGlobalSearchHeader(filters, setFilters)}
            filters={filters}
            onFilter={(e: any) => setFilters(e.filters)}
        >
            <Column key='id' field='id' header='ID' />
            <Column key='name' field='name' header='Name' editor={(options) => textEditor(options)} />
            <Column key='description' field='description' header='Description' editor={(options) => textEditor(options)} />
            <Column key='country' field='country' header='Country' editor={(options) => textEditor(options)} />
            <Column key='founding_date' field='founding_date' header='Founding Date' editor={(options) => dateTimeEditor(options)} />
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        </DataTable>
    );
}
