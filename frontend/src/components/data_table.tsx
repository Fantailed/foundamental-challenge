
export type DataTableFormatSpec = [hdr_name: string, key: string][]

export interface DataTableData {
    id: number | string
}
export interface DataTableProps {
    dataFmt: DataTableFormatSpec,
    data: DataTableData[],
}

export default function DataTable({ dataFmt, data }: DataTableProps): JSX.Element {
    return (<table>
        <thead key="thead"><tr key="hdr_row">
            {/* Read table header text from data format */}
            {dataFmt.map(x => <th key={`th-${x[0]}`}>{x[0]}</th>)}
        </tr></thead>
        <tbody key="tbody">
            {/* Populate data from keys as specified in data format */}
            {data.map((row) => 
                <tr key={row.id}>{dataFmt.map(fmt => <td key={`${row.id}-${fmt[1]}`}>{(row as any)[fmt[1]]}</td>)}</tr>
            )}
        </tbody>
    </table>);
}
