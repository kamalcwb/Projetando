import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { parse, v4 as uuidv4 } from 'uuid'


import styles from './Project.module.css'

import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import Message from '../components/layout/Message'
import ServiceForm from '../components/form/ServiceForm'
import ServiceCard from '../components/project/ServiceCard'

import ProjectForm from '../components/project/ProjectForm'

const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
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
                setServices(data.services)
            })
                .catch(err => console.log(err))

        }, 500)
    }, [id])

    function createService(project) {
        setMessage('')
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lasteServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lasteServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado')
            setType('error')
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => { })
            .catch((err) => console.log(err))
    }

    const removeService = () => { }

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
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {
                            services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    hey={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {
                            services.length === 0 && <p>Cadastre seu primeiro serviço.</p>
                        }
                    </Container>
                </Container>
            </div>
            : <Loading />} </div>
    )
}

export default Project