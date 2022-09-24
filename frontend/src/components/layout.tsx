import React from "react";

import HeaderBar from "./headerbar";
import SideNavigation from "./sidenavigation";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        {/* Sidebar */}
        <SideNavigation />
        
        {/* Header */}
        <HeaderBar pageTitle={"Page"} />

        <main>{children}</main>

        {/* Footer */}
        </>
    )
}
