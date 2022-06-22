import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Project.module.css'

import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'

const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => resp.json()).then((data) => {
                setProject(data)
            })
                .catch(err => console.log(err))

        }, 500)
    }, [id])

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <div>{project.name ?
            <div className={styles.project_details}>
                <Container customClass="column">
                    <div className={styles.detais_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>
                            {!showProjectForm ? 'Mostrar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span>
                                    {project.category.name}</p>
                                <p>
                                    <span>Total de Orçamento:</span>
                                    R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span>
                                    R${project.cost}
                                </p>


                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>Detalhes do projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            : <Loading />} </div>
    )
}

export default Project