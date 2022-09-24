import styles from "./headerbar.module.css"


export interface HeaderProps {
    pageTitle: string
}

export default function HeaderBar({pageTitle: title}: HeaderProps) {
    return (
        <div className={styles.headerBar}>
            <h1>{title}</h1>
        </div>
    )
}
