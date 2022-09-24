import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function CompaniesDataTable() {
    const companyData = [
        {
            "founding_date": "2021-06-11T02:09:34",
            "name": "Mayer and Sons",
            "description": "Secured scalable standardization",
            "id": 1,
            "country": "Sweden"
        },
    ];
    const onRowEditComplete = () => { }

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'country', header: 'Country' },
        { field: 'founding_date', header: 'Founding Date' }
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <DataTable value={companyData} responsiveLayout="scroll">
            {dynamicColumns}
        </DataTable>
    );
}