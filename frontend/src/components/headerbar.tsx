import styles from "./headerbar.module.css"


export interface HeaderProps {
    pageTitle: string
}

export default function HeaderBar({pageTitle}: HeaderProps) {
    return (
        <div className={styles.headerBar}>
            <h1>{pageTitle}</h1>
        </div>
    )
}
