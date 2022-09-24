import { DataTable, DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { EditorProps } from 'primereact';
import { getCompanies } from '../lib/api_requests';


export default function CompaniesDataTable() {
    const { data: companyData, isLoading } = getCompanies()
    
    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    
    const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
        let _companyData = [...companyData];
        let { newData, index } = e;

        console.log(e);

        _companyData[index] = newData;

        // setCompanyData(_companyData);
    }

    // const columns = [
    //     { field: 'id', header: 'ID' },
    //     { field: 'name', header: 'Name' },
    //     { field: 'description', header: 'Description' },
    //     { field: 'country', header: 'Country' },
    //     { field: 'founding_date', header: 'Founding Date' }
    // ];

    return (
        <DataTable value={companyData} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
            <Column key='name' field='name' header='Name' editor={(options) => textEditor(options)} />
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        </DataTable>
    );
}
