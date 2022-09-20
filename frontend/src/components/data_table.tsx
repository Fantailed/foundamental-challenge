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
            { return (
                <tr>
                    <td>{row.name}</td>
                    <td>{row.funding_round}</td>
                    <td>{row.funding_amount}</td>
                    <td>{row.date}</td>
                    {/* {dataFmt.forEach(({k, v}) => <td>{row[v]}</td>)} */}
                </tr>
        )}
        )}
    </table>);
}
