import styles from './Backdrop.module.css'
import { createPortal } from "react-dom";

const Backdrop = ({onClick}) => {
 
  const content = <div className={styles.backdrop} onClick={onClick}></div>
  
  return createPortal(content, document.getElementById('backdrop'))
  
}

export default Backdrop