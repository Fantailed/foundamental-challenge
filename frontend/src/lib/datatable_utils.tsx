import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

// #region Editors

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
