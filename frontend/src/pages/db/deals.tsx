import type { NextPage } from "next"
import { Card } from "primereact/card";
import DealsDataTable from "../../components/deals_datatable";

const Deals: NextPage = () => {
    return (<>
        <Card className='infocard' title='Caution!'>
            <p> Modifications on this page are persisted in the database! </p>
        </Card>

        <Card>
            <DealsDataTable />
        </Card>
    </>);
}

export default Deals
