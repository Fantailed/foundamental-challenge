import React from "react";
import { useRouter } from "next/router";

import styles from "./layout.module.css"
import HeaderBar from "./headerbar";
import SideNavigation from "./sidenavigation";
import { route2pageName } from "../lib/pageconfig";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        {/* Sidebar */}
        <SideNavigation />
        
        {/* Header */}
        <HeaderBar pageTitle={route2pageName(useRouter().pathname)} />

        <main className={styles.main}>{children}</main>

        {/* Footer */}
        </>
    )
}
