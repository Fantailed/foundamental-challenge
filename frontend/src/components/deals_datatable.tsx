import React, { useState } from 'react';
import { DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { getCompanies, getDeals, patchDeal } from '../lib/api_requests';
import DBDataTable, { dateTimeEditor, foreignKeyEditor, moneyEditor, moneyFormatter, textEditor } from './dbdatatable';


export default function DealsDataTable() {
    const { data: dealData, isLoading, mutate } = getDeals();
    // TODO: Use global context or something to stay up-to-date
    const { data: companyData } = getCompanies();

    // Row Editing
    const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
        let { index, newData } = e;
        dealData[index] = newData;

        // API PATCH request
        patchDeal(newData);
        // Optimistically update state in client
        mutate(dealData);
    }

    // Global search
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const companyIdEditor = (options: any, placeholder = "Select a company") => {
        const choices = companyData.map((company: any) => {
            return { label: `${company.name} (${company.id})`, value: company.id }
        });
        return foreignKeyEditor(options, choices, placeholder);
    }

    return (
        <DBDataTable
            value={dealData}
            onRowEditComplete={onRowEditComplete}
            loading={isLoading}
            filters={filters}
            setFilters={setFilters}
        >
            <Column key='id' field='id' header='ID' />
            <Column key='date' field='date' header='Date' editor={(options) => dateTimeEditor(options)} />
            <Column key='funding_amount' field='funding_amount' header='Funding Amount' editor={(options) => moneyEditor(options)} body={(rowData: any) => moneyFormatter(rowData.funding_amount)} />
            <Column key='funding_round' field='funding_round' header='Founding Round' editor={(options) => textEditor(options)} />
            <Column key='company_id' field='company_id' header='Company (ID)' editor={(options) => companyIdEditor(options)} />
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        </DBDataTable>
    );
}
