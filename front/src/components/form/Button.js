import styles from './Button.module.css'
import { useFetch } from '../../hooks/useFetch'
import Loading from '../layout/Loading'


const Button = () => {
  const { isLoading } = useFetch()
  return (
    <>
      {isLoading ? 
        <button className={styles.btn_submit}>
          <Loading/>
        </button>  :
        <button className={styles.btn_submit}>
          Enviar
        </button>
      }      
    </>
  )
}

export default Button