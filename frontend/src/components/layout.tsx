import React from "react";

import styles from "./layout.module.css"
import HeaderBar from "./headerbar";
import SideNavigation from "./sidenavigation";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        {/* Sidebar */}
        <SideNavigation />
        
        {/* Header */}
        <HeaderBar pageTitle={"Page"} />

        <main className={styles.main}>{children}</main>

        {/* Footer */}
        </>
    )
}
