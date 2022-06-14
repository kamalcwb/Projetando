import React from 'react';
import styles from './NewProject.module.css';
import ProjectForm from '../components/project/ProjectForm';

const NewProject = () => {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Vamos começar?</p>
            <ProjectForm btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject