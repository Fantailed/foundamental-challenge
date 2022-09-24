import { DataTable, DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

import { getCompanies, patchCompany } from '../lib/api_requests';
import React, { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';


export default function CompaniesDataTable() {
    const { data: companyData, isLoading, mutate } = getCompanies();

    // Row Editing

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    function isoDateWithoutTimeZone(date: Date) {
        if (date == null) return date;
        var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
        var correctDate = new Date(timestamp);
        return correctDate.toISOString().slice(0, 19);
    }

    const dateTimeEditor = (options: any) => {
        return <Calendar
            id="time24"
            value={options.value? new Date(options.value): undefined}
            onChange={(e: any) => options.editorCallback(isoDateWithoutTimeZone(e.target.value))}
            showTime showSeconds
            dateFormat="yy-mm-dd"
        />
    }

    const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
        let { index, newData } = e;
        companyData[index] = newData;

        // API PATCH request
        patchCompany(newData);
        // Optimistically update state in client
        mutate(companyData);
    }

    // Pagination
    
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    // Search Function
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { value: null, matchMode: FilterMatchMode.IN },
        'founding-date': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
    }

    const dataTableHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Global Search" />
            </span>
        );
    }

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
            rows={10} rowsPerPageOptions={[10,20,50]}
            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
            autoLayout={true}
            size="small"
            header={dataTableHeader}
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
