import styles from './Message.module.css'

const Message = ({children, type}) => {
  return (
    <div className={`${styles.message} ${styles[type]}`}>{children}</div> 
  )
}

export default Message