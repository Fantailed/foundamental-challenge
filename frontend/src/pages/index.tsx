import type { NextPage } from 'next'
import Head from 'next/head'

import CompanyDealsDataTable from '../components/companydeals_datatable'
import { Card } from 'primereact/card'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="My Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card>
        <CompanyDealsDataTable />
      </Card>
    </>
  )
}

export default Home
