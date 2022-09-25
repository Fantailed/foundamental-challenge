import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./layout.module.css"
import HeaderBar from "./headerbar";
import SideNavigation from "./sidenavigation";
import { route2pageName } from "../lib/pageconfig";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [ pageTitle, setPageTitle ] = useState(route2pageName(router.pathname));

    useEffect(() => {
        setPageTitle(route2pageName(router.pathname));
    }, [router.pathname]);

    return (
        <>
            {/* Sidebar */}
            <SideNavigation />

            {/* Header */}
            <HeaderBar pageTitle={pageTitle} />

            <main className={styles.main}>{children}</main>

            {/* Footer */}
        </>
    )
}
