import React from 'react'
import { useLocation } from 'react-router-dom'
import Message from '../components/layout/Message'
import styles from './Projects.module.css'
import Container from '../components/layout/Container'
import LinkButton from '../components/layout/LinkButton'

const Projects = () => {

    const location = useLocation()
    let message = '';
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message msg={message} type="success" />}
            <Container customClass="start">
                <p>Projetos</p>
            </Container>
        </div>
    )
}

export default Projects