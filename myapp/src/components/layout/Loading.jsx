import React from 'react'
import styles from './Loading.module.css'
import img from '../../img/loading.svg'

const Loading = () => {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={img} alt='Loading' />
        </div>
    )
}

export default Loading