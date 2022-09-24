import Image from 'next/image'
import Link from 'next/link';

import styles from "./sidenavigation.module.css"

export default function SideNavigation() {
    return(
        <div className={styles.sidenav}>
            <div className={styles.appLogo}>
                <Image src="/vercel_white.svg" alt="App Logo" width={130} height={24} />
            </div>


            <Link href="/">Overview</Link>

            <hr />
            <p>DB Edit</p>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    );
}
