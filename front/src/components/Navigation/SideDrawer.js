import styles from './SideDrawer.module.css'
import { createPortal } from "react-dom";

const SideDrawer = ({children, onClick}) => {
  const content = (
    <aside>
      <div className={styles.sideDrawer} onClick={onClick}>
        {children}
      </div>
    </aside>    
  )

  return createPortal(content, document.getElementById('side-drawer'))
  
}

export default SideDrawer