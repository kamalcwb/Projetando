import React from 'react'
import styles from './Home.module.css'

import savings from '../img/pngwing.com.png'
import LinkButton from '../components/layout/LinkButton'

const Home = () => {
    return (
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>Projetando</span></h1>
            <p>Não perca tempo! Gerencie seus projetos agora mesmo.</p>
            <LinkButton to="/projects" text="Criar Meu Projeto" />
            <img src={savings} alt="Economize deu dinheiro"></img>
        </section>
    )
}

export default Home
