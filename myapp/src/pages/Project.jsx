import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Project.module.css'

import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import Message from '../components/layout/Message'

import ProjectForm from '../components/project/ProjectForm'

const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    const editPost = (project) => {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('Orçamento insuficiente!')
            setType('error')
            return (false)
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>{project.name ?
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
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
                                <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button onClick={toggleServiceForm} className={styles.btn}>
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && <div>formulário de serviço</div>

                            }
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Serviços disponiveis</p>
                    </Container>
                </Container>
            </div>
            : <Loading />} </div>
    )
}

export default Project