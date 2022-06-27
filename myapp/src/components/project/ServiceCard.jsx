import React from 'react'

import styles from './ProjectCard.module.css'

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>

        </div>
    )
}

export default ServiceCard