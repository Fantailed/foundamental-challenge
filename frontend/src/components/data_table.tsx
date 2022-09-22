
export type DataTableFormatSpec = {[key: string]: string}[]

export type DataTableProps = {
    dataFmt: DataTableFormatSpec
    data: any[]
}

export default function DataTable({ dataFmt, data }: DataTableProps): JSX.Element {
    return (<table>
        <tr>
            {dataFmt.map(x => <th>{Object.keys(x)}</th>)}
        </tr>
        {data.map((row) => 
            <tr>{dataFmt.map(fmt => <td>{row[Object.values(fmt)[0]]}</td>)}</tr>
        )}
    </table>);
}
