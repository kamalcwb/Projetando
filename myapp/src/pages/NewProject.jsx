import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewProject.module.css';
import ProjectForm from '../components/project/ProjectForm';

const NewProject = () => {

    const navigate = useNavigate()

    const createPost = (project) => {
        project.cost = 0;
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Vamos começar?</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject