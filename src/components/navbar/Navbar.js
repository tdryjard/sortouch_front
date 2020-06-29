import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = (props) => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(sessionStorage.getItem('modelId'))
    const [chatbotName] = useState(sessionStorage.getItem('chatbotName'))

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    const disconnect = () => {
        sessionStorage.setItem('userId', '')
        sessionStorage.setItem('modelId', '')
        localStorage.setItem('userId', '')
        localStorage.setItem('modelId', '')
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div className="containerNav">
            <Link to="/" className={props.type === "landing" ? "linkNavbarActive" : "linkNavbar"} >Accueil</Link>
            <Link to="/utiliser-le-site-sortouch" className={props.type === "doc" ? "linkNavbarActive" : "linkNavbar"} >Docs</Link>
            <Link to="/tarifs" className={props.type === "tarifs" ? "linkNavbarActive" : "linkNavbar"} >Tarifs</Link>
            {!userId && window.innerWidth > 1280 ?
                <div className="contentConnect">
                    <Link to="/connexion" className="connexionNavbar">Connexion</Link>
                    <Link to="/inscription" className="subNavbar">Essayer gratuitement</Link>
                </div>
                : userId && modelId ?
                    <>
                        <Link to="/base-de-donnee" className={props.type === "data" ? "linkNavbarActive" : "linkNavbar"} >Données collectées</Link>
                        <div className="containerChatbotNav" >
                            <p className="nameChatbotNav">{chatbotName}</p>
                            <Link to="/models" className="linkNavChatbot" >Changer de chatbot</Link>
                            <Link to="/mails" className="linkNavChatbot" >Boite de réception</Link>
                            <Link to="/choisir-editeur" className="linkNavChatbot" >Éditeur</Link>
                        </div>
                        <button onClick={disconnect} className="disconnect" >Déconnexion</button>
                    </>
                    : userId ?
                        <>
                            <Link to="/models" className={props.type === "models" ? "linkNavbarActive" : "linkNavbar"} >Mes chatbots</Link>
                            <Link to="/base-de-donnee" className={props.type === "data" ? "linkNavbarActive" : "linkNavbar"} >Données collectées</Link>
                            <button onClick={disconnect} className="disconnect" >Déconnexion</button>
                        </>
                        : null
            }
        </div>
    )
}

export default Navbar