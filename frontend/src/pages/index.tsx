import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import DataTable from '../components/data_table'
import { companyDealFormat, getCompanyDeals } from '../lib/company_deals'


const Home: NextPage = () => {

  const { data, isLoading } = getCompanyDeals();

  return (
    <div className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="My Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Cool App Name
        </h1>

        <p className={styles.description}>Overview of Companies and Deals</p>
        {
          isLoading? <p className={styles.description}>Loading...</p>:
          !data? <p className={styles.description}>No deal data.</p> : 
          <DataTable dataFmt={companyDealFormat} data={data} />
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
