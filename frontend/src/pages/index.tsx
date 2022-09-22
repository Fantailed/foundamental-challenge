import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import DataTable from '../components/data_table'
import { useEffect, useState } from 'react'
import { getCompanyDeals } from '../lib/company_deals'

const apiUrl = 'http://localhost:20002/api/company_deals'

const Home: NextPage = () => {

  const { data, isLoading } = getCompanyDeals();

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No deal data.</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="My Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Companies & Deals
        </h1>

        <DataTable dataFmt={[
          {'Company Name': 'name'},
          {'Funding Round': 'funding_round'},
          {'Funding Amount': 'funding_amount'},
          {'Deal Date': 'date'}]} data={data} />
      </main>
    </div>
  )
}

export default Home
