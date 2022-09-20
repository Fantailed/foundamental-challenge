import internal from "stream";

type DataTableProps = {
    dataFmt: {
        [key: string]: string
    }[],
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
