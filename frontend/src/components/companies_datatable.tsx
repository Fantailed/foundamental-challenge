import { DataTable, DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';

import { getCompanies, patchCompany } from '../lib/api_requests';


export default function CompaniesDataTable() {
    const { data: companyData, isLoading, mutate } = getCompanies();

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
    
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

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
