import styles from './Close.module.css'
import { createPortal } from "react-dom";

const Close = ({onClick}) => {

  const content = <span className={styles.close} onClick={onClick}>&times;</span>

  return createPortal(content, document.getElementById('close'))
  
}

export default Close