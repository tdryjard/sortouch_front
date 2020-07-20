import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BurgerMenu.scss'

const BurgerMenu = (props) => {
    const [menuActive, setMenuActive] = useState(false)
    const [sectionIntegrationActive, setSectionIntegrationActive] = useState(false)
    const [changeMenu, setChangeMenu] = useState(false)
    const [userId, setUserId] = useState()
    const [modelId] = useState(localStorage.getItem('modelId'))

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }

    }, [])

    return (
        <div className="contentBurgerMenu">
            {!menuActive &&
                <>
                    <img onClick={() => { setMenuActive(true) }} alt="menu" className="burgerIcon" src={require('./image/menu_icon.png')} />
                </>}
            {(menuActive && !changeMenu) ?
                <div className="containerMenuBurgerOpen">
                    <img onClick={() => { setMenuActive(false) }} alt="menu" className="crossIconDoc" src={require('./image/cross.png')} />
                    <button className="openBurgerSiteDoc" onClick={() => {return(setChangeMenu(!changeMenu))}}>Menu du site</button>
                    <div className="contentNameSectionMenu">
                        <Link to="/utiliser-le-site-sortouch"  className={props.link === "sortouch" ? "linkMenuDocEditorOn" : "linkMenuDocEditor"}>Guide Sortouch</Link>
                    </div>

                    <div className="contentNameSectionMenu">
                        <Link to="/editeur-doc" className={props.link === "editor" ? "linkMenuDocEditorOn" : "linkMenuDocEditor"}>Éditeur de secrétaire</Link>
                    </div>
                    <div className="contentNameSectionMenu">
                        <Link to="/editeur-web-doc" className={props.link === "editor-web" ? "linkMenuDocEditorOn" : "linkMenuDocEditor"}>Éditeur de page web</Link>
                    </div>
                    <div className="contentNameSectionMenu">
                        <p onClick={() => { setSectionIntegrationActive(!sectionIntegrationActive) }} className="titleSectionMenu">Intégration sur votre site</p>
                        {!sectionIntegrationActive ? <img onClick={() => { setSectionIntegrationActive(true) }} className="imgSectionMenuDoc" src={require('../image/plus.png')} /> :
                            <img onClick={() => { setSectionIntegrationActive(false) }} className="imgSectionMenuDoc" src={require('../image/moins.png')} />}
                    </div>
                    <div className={sectionIntegrationActive || props.sectionSelect === "install" ? "siteMenuDocOn" : "siteMenuDocOff"}>
                        <Link to="/installer-react" className={props.link === "docReact" ? "linkMenuDocOn" : "linkMenuDoc"}>ReactJs</Link>
                        <Link to="/installer-wordpress" className={props.link === "docWordpress" ? "linkMenuDocOn" : "linkMenuDoc"}>WordPress</Link>
                    </div>
                </div>
                : (menuActive && changeMenu) &&
                <div className="containerMenuBurgerOpen">
                    <img onClick={() => { setMenuActive(false) }} alt="menu" className="crossIconDoc" src={require('./image/cross.png')} />
                    <button className="openBurgerSiteDoc" onClick={() => {return(setChangeMenu(!changeMenu))}}>Menu Docs</button>
                    <Link to="/" className={props.type === "landing" ? "linkBurgerActive" : "linkBurger"} >Accueil</Link>
                    <Link to="/utiliser-le-site-sortouch" className={props.type === "editor-doc" ? "linkBurgerActive" : "linkBurger"} >Tutos</Link>
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
                    {modelId && <Link to="/editeur" className={props.type === "editeur" ? "linkBurgerActive" : "linkBurger"} >Éditeur</Link>}
                </div>}
        </div>
    )
}

export default BurgerMenu