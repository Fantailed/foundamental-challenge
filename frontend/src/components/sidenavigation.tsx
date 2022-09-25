import Image from 'next/image'
import Link from 'next/link';

import styles from "./sidenavigation.module.css"
import { Divider } from 'primereact/divider';
import { useRouter } from 'next/router';

export default function SideNavigation() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return(
        <div className={styles.sidenav}>
            <div className={styles.appLogo}>
                <Image src="/vercel_white.svg" alt="App Logo" width={130} height={24} />
            </div>

            <Link href="/">
                <a className={currentRoute === '/'? styles.active: undefined}>Overview</a>
            </Link>

            {/* ------------------------------------------------------------ */}
            <Divider align="center" style={{ width: '90%', marginLeft: '5%' }}/>

            <p>DATABASE</p>

            <Link href="/db/companies">
                <a className={currentRoute === '/db/companies'? styles.active: undefined}>Companies</a>
            </Link>

            <Link href="/db/deals">
                <a className={currentRoute === '/db/deals'? styles.active: undefined}>Deals</a>
            </Link>
        </div>
    );
}
