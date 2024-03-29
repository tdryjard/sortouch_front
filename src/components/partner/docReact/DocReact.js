import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './DocReact.scss'

const DocReact = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
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
        <div className="containerDocPartner">
            <title>Sortouch : installer chatbot sur React | partenaire</title>
            <div className="containerNav">
                <Link to="/" className="linkNavbar" >Menu</Link>
                <Link to="/installer-wordpress" className="linkNavbar" >Installer chatbot sur Wordpress</Link>
                <Link to="/installer-react" className="linkNavbar" >Installer chatbot sur ReactJs</Link>
                {window.innerWidth > 1280 && <button onClick={disconnect} className="disconnect" >Déconnexion</button>}
            </div>
            <div style={{ marginLeft: "0" }} className="contentDoc">
                <h1 className="titleDoc">Intégrer son chatbot sur un site ReactJs</h1>
                <img alt="react logo" src={require('./image/react.svg')} className="reactLogo" />
                <div style={{ width: "80%" }} className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Installer la librairie</h4>
                    <p className="codeText">$ npm install sortouch-react</p>
                    <h4 className="titleContainerSectionDoc">Importer la librairie dans son code</h4>
                    <img alt="import Sortouch" src={require('./image/import.png')} className="blockCode" />
                    <h4 className="titleContainerSectionDoc">Intégrer au code</h4>
                    <div className="integrationContainer">
                        <img alt="block code 1" src={require('./image/code1.png')} className="blockCode" />
                        <p className="textOnCode">user id généré</p>
                        <img alt="block code 2" src={require('./image/code2.png')} className="blockCode" />
                        <p className="textOnCode">model id généré</p>
                        <img alt="block code 3" src={require('./image/code3.png')} className="blockCode" />
                    </div>
                    <h4 className="titleContainerSectionDoc">Trouver le user id d'un compte généré</h4>
                    <img style={{ width: "120%" }} alt="trouver user id" src={require('./image/userId.png')} className="blockCode" />
                    <h4 className="titleContainerSectionDoc">Trouver le model id d'un compte généré</h4>
                    <img style={{ width: "120%" }} alt="trouver user id" src={require('./image/chatbotId.png')} className="blockCode" />
                    <h4 style={{ fontSize: "18px" }} className="titleContainerSectionDoc">Enfin, partagez le mot de passe l'email générés à votre client, à sa première connexion, de nouveaux identifiants lui seront demandés<br />Pour chaque abonnement mensuel souscrit par votre client sur Sortouch, 30% du montant prix de l'abonnement sera ajouté à votre versement mensuel</h4>
                </div>
            </div>
            {window.innerWidth < 1280 && <button style={{ marginBottom: "50px" }} onClick={disconnect} className="disconnect" >Déconnexion</button>}
        </div>
    )
}

export default DocReact