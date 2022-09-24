import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import DataTable from '../components/data_table'
import { companyDealFormat, getCompanyDeals } from '../lib/company_deals'
import CompanyDealsDataTable from '../components/companydeals_datatable'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="My Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CompanyDealsDataTable />
    </>
  )
}

export default Home
