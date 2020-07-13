import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './MenuBurger.scss'

const MenuBurger = (props) => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(sessionStorage.getItem('modelId'))
    const [active, setActive] = useState(false)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
        const redirect = sessionStorage.getItem('disconnect')
        if (redirect === 'true') {
            sessionStorage.setItem('disconnect', false)
            setTimeout(() => {
                setRedirect(true)
            }, 100)
        }
    }, [])

    const disconnect = () => {
        sessionStorage.setItem('userId', '')
        sessionStorage.setItem('modelId', '')
        localStorage.setItem('userId', '')
        localStorage.setItem('modelId', '')
        sessionStorage.setItem('disconnect', true)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div>
            {redirect && <Redirect to="/" />}
            {!active ?
                <img src={require('./image/menu_icon.png')} className="menuBurger" alt="menu" onClick={() => { setActive(true) }} />
                :
                <div className="containerMenuBurger">
                    <img onClick={() => { setActive(false) }} alt="menu" className="crossIconBurger" src={require('./image/cross.png')} />
                    <Link to="/" style={{ marginTop: "50px" }} className={props.type === "landing" ? "linkBurgerActive" : "linkBurger"} >Accueil</Link>
                    <Link to="/utiliser-le-site-sortouch" className={props.type === "editor-doc" ? "linkBurgerActive" : "linkBurger"} >Docs</Link>
                    <Link to="/tarifs" className={props.type === "tarif" ? "linkBurgerActive" : "linkBurger"} >Tarifs</Link>
                    {!userId && !modelId ?
                        <div className="contentConnect">
                            <Link to="/connexion" className="connexionNavbar">Connexion</Link>
                            <Link to="/inscription" className="subNavbar">Essayer gratuitement</Link>
                        </div>
                        :
                        <>
                            <Link to="/models" className={props.type === "models" ? "linkBurgerActive" : "linkBurger"} >Mes chatbot</Link>
                            <Link to="/base-de-donnee" className={props.type === "data" ? "linkBurgerActive" : "linkBurger"} >Données collectées</Link>
                        </>
                    }
                    {modelId && <Link to="/mails" className={props.type === "mails" ? "linkBurgerActive" : "linkBurger"} >Boite de réception</Link>}
                    {modelId && <Link to="/choisir-editeur" className={props.type === "editeur" ? "linkBurgerActive" : "linkBurger"} >Éditeur</Link>}
                    {userId && <button onClick={disconnect} className="disconnect" >Déconnexion</button>}
                </div>
            }
        </div>
    )
}

export default MenuBurger