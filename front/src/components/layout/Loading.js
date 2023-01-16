import styles from './Loading.module.css'

const Loading = ({asOverlay}) => {
  return (
    <div>
      <div className={styles.lds_dual_ring} alt="Loading"></div>
    </div>
  )
}

export default Loading