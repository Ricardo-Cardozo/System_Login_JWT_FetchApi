import styles from './NavHeader.module.css'

const NavHeader = ({children}) => {
  return (
    <header className={styles.header}>
      {children}
    </header>
  )
}

export default NavHeader