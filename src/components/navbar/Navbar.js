import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Navbar.scss'

const Navbar = (props) => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(localStorage.getItem('modelId'))
    const [chatbotName] = useState(localStorage.getItem('chatbotName'))
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
        const redirect = sessionStorage.getItem('disconnect')
        if(redirect === 'true'){
            sessionStorage.setItem('disconnect', false)
            setTimeout(() => {
                setRedirect(true)
            }, 100)
        }
    }, [])

    const disconnect = () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('modelId', '')
        localStorage.setItem('token', '')
        localStorage.setItem('type', '')
        sessionStorage.setItem('disconnect', true)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div className="containerNav">
            {redirect && <Redirect to="/"/>}
            <Link to="/" className={props.type === "landing" ? "linkNavbarActive" : "linkNavbar"} >Accueil</Link>
            <Link to="/utiliser-le-site-sortouch" className={props.type === "doc" ? "linkNavbarActive" : "linkNavbar"} >Docs</Link>
            <Link to="/blog" className={props.type === "blog" ? "linkNavbarActive" : "linkNavbar"} >Blog</Link>
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
                            <Link to="/models" className="linkNavChatbot" >Changer de modèle</Link>
                            <Link to="/mails" className="linkNavChatbot" >Boite de réception</Link>
                            <Link to="/editeur-chatbot" className="linkNavChatbot" >Éditeur</Link>
                        </div>
                        <button onClick={disconnect} className="disconnect" >Déconnexion</button>
                    </>
                    : userId ?
                        <>
                            <Link to="/models" className={props.type === "models" ? "linkNavbarActive" : "linkNavbar"} >Mes modèles</Link>
                            <Link to="/base-de-donnee" className={props.type === "data" ? "linkNavbarActive" : "linkNavbar"} >Données collectées</Link>
                            <button onClick={disconnect} className="disconnect" >Déconnexion</button>
                        </>
                        : null
            }
        </div>
    )
}

export default Navbar