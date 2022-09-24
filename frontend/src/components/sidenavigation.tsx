import Image from 'next/image'
import Link from 'next/link';

import styles from "./sidenavigation.module.css"
import { route2pageName } from '../lib/pageconfig';

export default function SideNavigation() {
    return(
        <div className={styles.sidenav}>
            <div className={styles.appLogo}>
                <Image src="/vercel_white.svg" alt="App Logo" width={130} height={24} />
            </div>

            <Link href="/">{route2pageName('/')}</Link>

            <hr />

            <p>Database</p>
            <Link href="/db/companies">Companies</Link>
            <Link href="/db/deals">Deals</Link>
        </div>
    );
}
