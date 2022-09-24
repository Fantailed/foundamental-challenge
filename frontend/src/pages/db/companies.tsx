import type { NextPage } from "next"
import { Card } from 'primereact/card';

import CompaniesDataTable from "../../components/companies_datatable";

const Companies: NextPage = () => {
    return (<>
        <Card title='Caution!'>
            <p> Modifications on this page are persisted in the database! </p>
        </Card>

        <Card>
            <CompaniesDataTable />
        </Card>
    </>);
}

export default Companies
