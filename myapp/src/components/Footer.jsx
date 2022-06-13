import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
                <li>
                    <FaWhatsapp />
                </li>
            </ul>
            <p className={styles.copy_right}><span>Projetando</span>&copy; 2022</p>
        </footer>
    )
}

export default Footer