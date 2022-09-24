import React from "react";
import HeaderBar from "./headerbar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        {/* Header */}
        <HeaderBar pageTitle={"Page"} />

        {/* Sidebar */}

        <main>{children}</main>

        {/* Footer */}
        </>
    )
}
