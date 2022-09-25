import React, { useState } from 'react';
import { DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { getCompanies, patchCompany } from '../lib/api_requests';
import DBDataTable, { dateTimeEditor, textEditor } from './dbdatatable';


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
        <DBDataTable
            value={companyData}
            onRowEditComplete={onRowEditComplete}
            loading={isLoading}
            filters={filters}
            setFilters={setFilters}
        >
            <Column key='id' field='id' header='ID' />
            <Column key='name' field='name' header='Name' editor={(options) => textEditor(options)} />
            <Column key='description' field='description' header='Description' editor={(options) => textEditor(options)} />
            <Column key='country' field='country' header='Country' editor={(options) => textEditor(options)} />
            <Column key='founding_date' field='founding_date' header='Founding Date' editor={(options) => dateTimeEditor(options)} />
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        </DBDataTable>
    );
}
