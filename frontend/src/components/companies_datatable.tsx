import { DataTable, DataTableRowEditCompleteParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { getCompanies, patchCompany } from '../lib/api_requests';


export default function CompaniesDataTable() {
    const { data: companyData, isLoading, mutate } = getCompanies();

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
        let { index, newData } = e;
        companyData[index] = newData;

        // API PATCH request
        patchCompany(newData);
        // Optimistically update state in client
        mutate(companyData);
    }

    return (
        <DataTable
            value={companyData}
            dataKey="id"
            editMode="row"
            onRowEditComplete={onRowEditComplete}
            responsiveLayout="scroll"
            loading={isLoading}
        >
            <Column key='id' field='id' header='ID' />
            <Column key='name' field='name' header='Name' editor={(options) => textEditor(options)} />
            <Column key='description' field='description' header='Description' editor={(options) => textEditor(options)} />
            <Column key='country' field='country' header='Country' editor={(options) => textEditor(options)} />
            <Column key='founding_date' field='founding_date' header='Founding Date' editor={(options) => textEditor(options)} />
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        </DataTable>
    );
}
