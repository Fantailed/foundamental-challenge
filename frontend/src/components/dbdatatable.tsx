import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable, DataTableFilterMeta, DataTableRowEditCompleteParams } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

//#region Formatters
export const moneyFormatter = (rowData: { funding_amount: number | bigint; }) => {
    console.log(rowData);
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(rowData.funding_amount);
}
//#endregion

// #region Editors

export const moneyEditor = (options: any) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="EUR" locale="de-DE" />
}

export const textEditor = (options: any) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
}

/*
    This is only needed because dates in the DB are without timezone specification.
    The calendar just assumes it to be local time (UTC+2), so when
    printing as ISO, which is UTC, it subtracts 2h, which we do not want,
    so we need to manually add 2h here.
    Probably better to have proper ISO dates in the DB, but not my problem rn.
*/
function isoDateWithoutTimeZone(date: Date) {
    if (date == null) return date;
    var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
    var correctDate = new Date(timestamp);
    return correctDate.toISOString().slice(0, 19);
}

export const dateTimeEditor = (options: any) => {
    return <Calendar
        id="time24"
        value={options.value ? new Date(options.value) : undefined}
        onChange={(e: any) => options.editorCallback(isoDateWithoutTimeZone(e.target.value))}
        showTime showSeconds
        dateFormat="yy-mm-dd"
    />
}

export const foreignKeyEditor = (options: any, choices: any[], placeholder: string = "Select an option") => {
    return (
        <Dropdown
            value={options.value} options={choices}
            optionLabel="label" optionValue="value"
            onChange={(e) => options.editorCallback(e.value)}
            placeholder={options.value ? options.value : placeholder}
            itemTemplate={(option) => {
                return <span className={`product-badge status-${String(option.value).toLowerCase()}`}>{option.label}</span>
            }} />
    );
}
// #endregion

// #region Global Search
export const onGlobalFilterChange = (event: any, filters: any, setFilters: React.Dispatch<React.SetStateAction<any>>) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
}

export const dataTableGlobalSearchHeader = (filters: any, setFilters: React.Dispatch<React.SetStateAction<any>>) => {
    const value = filters['global'] ? filters['global'].value : '';

    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e, filters, setFilters)} placeholder="Global Search" />
        </span>
    );
}

// #endregion

// #region Paginator
export const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
export const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
// #endregion

// #region DataTable
export default function DBDataTable({ value, onRowEditComplete, loading, filters, setFilters, children }: {
    value: any[] | undefined,
    onRowEditComplete: (e: DataTableRowEditCompleteParams) => void,
    loading: boolean | undefined,
    filters: DataTableFilterMeta | undefined,
    setFilters: React.Dispatch<React.SetStateAction<any>>,
    children: JSX.Element[]
}) {
    return (
        <DataTable
            value={value}
            dataKey="id"
            editMode="row"
            onRowEditComplete={onRowEditComplete}
            responsiveLayout="scroll"
            loading={loading}
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
            {children}
        </DataTable>
    );
}
// #endregion
